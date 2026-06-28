using System.Windows;
using System.Windows.Controls;
using AxumGeez.Core;

namespace AxumGeez.App;

public partial class HelpWindow : Window
{
    private readonly FidelMap _map = FidelMap.Default;

    public HelpWindow(string selectedFont)
    {
        InitializeComponent();
        LayoutGrid.FontFamily = AppFont.Resolve(selectedFont);
        Refresh("");
    }

    private void SearchChanged(object sender, TextChangedEventArgs e) => Refresh(SearchBox.Text);

    private void Refresh(string query)
    {
        var rows = _map.Search(query)
            .Select(x => new MappingRow(x.Key, x.Value))
            .ToList();

        rows.AddRange(PunctuationRows
            .Where(x => string.IsNullOrWhiteSpace(query)
                || x.Key.Contains(query, StringComparison.OrdinalIgnoreCase)
                || x.Value.Contains(query, StringComparison.Ordinal)));

        LayoutGrid.ItemsSource = rows
            .OrderBy(x => x.Key, StringComparer.OrdinalIgnoreCase)
            .ToList();
    }

    private static readonly MappingRow[] PunctuationRows =
    [
        new(".", "።"),
        new(",", "፣"),
        new(";", "፤"),
        new(":", "፥")
    ];

    private sealed record MappingRow(string Key, string Value);
}
