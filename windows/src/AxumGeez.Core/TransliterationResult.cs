namespace AxumGeez.Core;

public enum TransliterationState
{
    NoMatch,
    Partial,
    Exact,
    ExactAndPartial
}

public sealed record TransliterationResult(
    TransliterationState State,
    string? Output,
    string Input);
