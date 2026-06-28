using AxumGeez.Core;
using Xunit;

namespace AxumGeez.Tests;

public sealed class TransliterationTests
{
    private readonly FidelMap _map = FidelMap.Default;

    [Theory]
    [InlineData("h", "ሀ")]
    [InlineData("hu", "ሁ")]
    [InlineData("hi", "ሂ")]
    [InlineData("ha", "ሃ")]
    [InlineData("he", "ሄ")]
    [InlineData("hh", "ህ")]
    [InlineData("ho", "ሆ")]
    [InlineData("H", "ሐ")]
    [InlineData("S", "ሠ")]
    [InlineData("sh", "ሸ")]
    [InlineData("ch", "ቸ")]
    [InlineData("ts", "ጸ")]
    [InlineData("Ts", "ፀ")]
    [InlineData("zh", "ዠ")]
    [InlineData("gn", "ኘ")]
    [InlineData("gnu", "ኙ")]
    [InlineData("gni", "ኚ")]
    [InlineData("gna", "ኛ")]
    [InlineData("gne", "ኜ")]
    [InlineData("gnn", "ኝ")]
    [InlineData("gno", "ኞ")]
    [InlineData("q", "ቀ")]
    [InlineData("x", "ኀ")]
    [InlineData("kh", "ኸ")]
    [InlineData("qwa", "ቈ")]
    [InlineData("qwi", "ቊ")]
    [InlineData("qwaa", "ቋ")]
    [InlineData("qwe", "ቌ")]
    [InlineData("kwa", "ኰ")]
    [InlineData("kwi", "ኲ")]
    [InlineData("kwaa", "ኳ")]
    [InlineData("kwe", "ኴ")]
    [InlineData("gwa", "ጐ")]
    [InlineData("gwi", "ጒ")]
    [InlineData("gwaa", "ጓ")]
    [InlineData("gwe", "ጔ")]
    public void Lookup_Returns_Expected_Fidels(string latin, string expected)
    {
        Assert.Equal(expected, _map.Lookup(latin).Output);
    }

    [Theory]
    [InlineData(".", "።")]
    [InlineData(",", "፣")]
    [InlineData(";", "፤")]
    [InlineData(":", "፥")]
    public void Lookup_Converts_Punctuation(string latin, string expected)
    {
        Assert.Equal(expected, _map.Lookup(latin).Output);
    }

    [Theory]
    [InlineData("1")]
    [InlineData("2")]
    [InlineData("3")]
    [InlineData("4")]
    [InlineData("5")]
    [InlineData("6")]
    [InlineData("7")]
    [InlineData("8")]
    [InlineData("9")]
    [InlineData("0")]
    public void Lookup_Leaves_Number_Row_As_Normal_Digits(string digit)
    {
        Assert.Null(_map.Lookup(digit, new TransliterationSettings(UseEthiopicNumerals: true)).Output);
    }

    [Theory]
    [InlineData("g1", "፩")]
    [InlineData("g2", "፪")]
    [InlineData("g3", "፫")]
    [InlineData("g4", "፬")]
    [InlineData("g5", "፭")]
    [InlineData("g6", "፮")]
    [InlineData("g7", "፯")]
    [InlineData("g8", "፰")]
    [InlineData("g9", "፱")]
    [InlineData("g10", "፲")]
    [InlineData("g20", "፳")]
    [InlineData("g30", "፴")]
    [InlineData("g40", "፵")]
    [InlineData("g50", "፶")]
    [InlineData("g60", "፷")]
    [InlineData("g70", "፸")]
    [InlineData("g80", "፹")]
    [InlineData("g90", "፺")]
    [InlineData("g100", "፻")]
    [InlineData("g10000", "፼")]
    public void Lookup_Returns_Geez_Numbers(string latin, string expected)
    {
        Assert.Equal(expected, _map.Lookup(latin).Output);
    }

    [Theory]
    [InlineData("ny")]
    [InlineData("nyu")]
    [InlineData("nyi")]
    [InlineData("nya")]
    [InlineData("nye")]
    [InlineData("nyy")]
    [InlineData("nyo")]
    public void Old_Ny_Mapping_Is_Not_Default(string latin)
    {
        Assert.Null(_map.Lookup(latin).Output);
    }

    [Theory]
    [InlineData("selam", "ሰላም")]
    [InlineData("amesegenallo", "አመሰግናለሁ")]
    [InlineData("etiopia", "ኢትዮጵያ")]
    public void TransliterateWord_Converts_Examples(string latin, string expected)
    {
        Assert.Equal(expected, _map.TransliterateWord(latin));
    }

    [Fact]
    public void TransliterateWord_Converts_Long_Geez_Number()
    {
        Assert.Equal("፼", _map.TransliterateWord("g10000"));
    }

    [Fact]
    public void Map_Includes_All_Required_Base_Families()
    {
        var required = new[]
        {
            "ሀ","ለ","ሐ","መ","ሠ","ረ","ሰ","ሸ","ቀ","በ","ተ","ቸ","ኀ","ነ","ኘ","አ",
            "ከ","ኸ","ወ","ዐ","ዘ","ዠ","የ","ደ","ጀ","ገ","ጠ","ጨ","ጰ","ጸ","ፀ","ፈ","ፐ"
        };

        foreach (var fidel in required)
        {
            Assert.Contains(_map.Entries.Values, x => x == fidel);
        }
    }

    [Fact]
    public void Map_Has_At_Least_Seven_Forms_Per_Required_Family()
    {
        Assert.True(_map.Entries.Count >= 33 * 7 + 12 + 20);
    }
}
