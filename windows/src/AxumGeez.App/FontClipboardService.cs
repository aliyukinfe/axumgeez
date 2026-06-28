using System.IO;
using System.Text;
using System.Windows;
using System.Windows.Documents;
using System.Windows.Media;

namespace AxumGeez.App;

public static class FontClipboardService
{
    public const string PreviewText = "አክሱም ግዕዝ\nሰላም ኢትዮጵያ\nፊደል መጻፊያ";

    public static void CopyAxumRoyalPreview()
    {
        var document = new FlowDocument(new Paragraph(new Run(PreviewText)))
        {
            FontFamily = AppFont.Resolve(AppFont.AxumRoyal),
            FontSize = 18,
            Foreground = new SolidColorBrush(System.Windows.Media.Color.FromRgb(57, 55, 53))
        };

        var range = new TextRange(document.ContentStart, document.ContentEnd);
        using var rtf = new MemoryStream();
        range.Save(rtf, System.Windows.DataFormats.Rtf);

        var data = new System.Windows.DataObject();
        data.SetData(System.Windows.DataFormats.UnicodeText, PreviewText);
        data.SetData(System.Windows.DataFormats.Rtf, Encoding.ASCII.GetString(rtf.ToArray()));
        System.Windows.Clipboard.SetDataObject(data, true);
    }
}
