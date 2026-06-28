namespace AxumGeez.Core;

public sealed record FidelEntry(
    string BaseKey,
    string BaseFidel,
    string[] Forms,
    string[] Keys,
    string[] Aliases);
