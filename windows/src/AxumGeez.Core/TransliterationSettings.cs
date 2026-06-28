namespace AxumGeez.Core;

public sealed record TransliterationSettings(
    bool ConvertPunctuation = true,
    bool UseEthiopicNumerals = false)
{
    public static TransliterationSettings Default { get; } = new();
}
