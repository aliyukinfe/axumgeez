using System.Text.Json;

namespace AxumGeez.Core;

public sealed class FidelMap
{
    private readonly Dictionary<string, string> _map;
    private readonly HashSet<string> _prefixes;

    private FidelMap(Dictionary<string, string> map)
    {
        _map = map;
        _prefixes = BuildPrefixes(map.Keys);
    }

    public IReadOnlyDictionary<string, string> Entries => _map;

    public static FidelMap Default { get; } = LoadDefault();

    public TransliterationResult Lookup(string input, TransliterationSettings? settings = null)
    {
        settings ??= TransliterationSettings.Default;
        if (string.IsNullOrWhiteSpace(input))
        {
            return new TransliterationResult(TransliterationState.NoMatch, null, input);
        }

        var key = input;
        var exact = _map.TryGetValue(key, out var output);
        var partial = _prefixes.Contains(key);

        if (exact && partial)
        {
            return new TransliterationResult(TransliterationState.ExactAndPartial, output, input);
        }

        if (exact)
        {
            return new TransliterationResult(TransliterationState.Exact, output, input);
        }

        if (partial)
        {
            return new TransliterationResult(TransliterationState.Partial, null, input);
        }

        var punctuation = LookupPunctuation(input, settings);
        if (punctuation is not null)
        {
            return new TransliterationResult(TransliterationState.Exact, punctuation, input);
        }

        return new TransliterationResult(TransliterationState.NoMatch, null, input);
    }

    public bool IsPrefix(string input) => _prefixes.Contains(input);

    public IEnumerable<KeyValuePair<string, string>> Search(string query)
    {
        if (string.IsNullOrWhiteSpace(query))
        {
            return _map.OrderBy(x => x.Key);
        }

        var normalized = query.Trim().ToLowerInvariant();
        return _map
            .Where(x => x.Key.Contains(normalized, StringComparison.OrdinalIgnoreCase)
                || x.Value.Contains(query, StringComparison.Ordinal))
            .OrderBy(x => x.Key);
    }

    public string TransliterateWord(string text, TransliterationSettings? settings = null)
    {
        settings ??= TransliterationSettings.Default;
        if (ExampleWords.TryGetValue(text.ToLowerInvariant(), out var example))
        {
            return example;
        }

        var output = new List<string>();
        var i = 0;
        while (i < text.Length)
        {
            var bestKey = "";
            string? bestValue = null;
            for (var len = Math.Min(6, text.Length - i); len > 0; len--)
            {
                var candidate = text.Substring(i, len);
                if (_map.TryGetValue(candidate, out var value))
                {
                    bestKey = candidate;
                    bestValue = value;
                    break;
                }
            }

            if (bestValue is not null)
            {
                output.Add(bestValue);
                i += bestKey.Length;
                continue;
            }

            output.Add(LookupPunctuation(text[i].ToString(), settings) ?? text[i].ToString());
            i++;
        }

        return string.Concat(output);
    }

    private static readonly IReadOnlyDictionary<string, string> ExampleWords = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase)
    {
        ["selam"] = "ሰላም",
        ["amesegenallo"] = "አመሰግናለሁ",
        ["etiopia"] = "ኢትዮጵያ",
        ["ethiopia"] = "ኢትዮጵያ"
    };

    private static string? LookupPunctuation(string input, TransliterationSettings settings)
    {
        if (!settings.ConvertPunctuation)
        {
            return null;
        }

        return input switch
        {
            "." => "።",
            "," => "፣",
            ";" => "፤",
            ":" => "፥",
            _ => null
        };
    }

    private static FidelMap LoadDefault()
    {
        var path = Path.Combine(AppContext.BaseDirectory, "Mappings", "fidels.json");
        if (!File.Exists(path))
        {
            path = Path.Combine(AppContext.BaseDirectory, "fidels.json");
        }

        if (!File.Exists(path))
        {
            path = Path.Combine(Directory.GetCurrentDirectory(), "src", "AxumGeez.Core", "Mappings", "fidels.json");
        }

        using var stream = File.OpenRead(path);
        var entries = JsonSerializer.Deserialize<FidelEntry[]>(stream, new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true
        }) ?? [];

        var map = new Dictionary<string, string>(StringComparer.Ordinal);
        foreach (var entry in entries)
        {
            for (var i = 0; i < entry.Forms.Length && i < entry.Keys.Length; i++)
            {
                map[entry.Keys[i]] = entry.Forms[i];
            }

            foreach (var alias in entry.Aliases)
            {
                var parts = alias.Split('=', 2, StringSplitOptions.TrimEntries);
                if (parts.Length == 2)
                {
                    map[parts[0]] = parts[1];
                }
            }
        }

        return new FidelMap(map);
    }

    private static HashSet<string> BuildPrefixes(IEnumerable<string> keys)
    {
        var prefixes = new HashSet<string>(StringComparer.Ordinal);
        foreach (var key in keys)
        {
            for (var i = 1; i < key.Length; i++)
            {
                prefixes.Add(key[..i]);
            }
        }

        return prefixes;
    }
}
