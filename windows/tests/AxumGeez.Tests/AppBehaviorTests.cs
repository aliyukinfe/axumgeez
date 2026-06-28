using System.Text.Json;
using AxumGeez.App;
using AxumGeez.Input;
using Xunit;

namespace AxumGeez.Tests;

public sealed class AppBehaviorTests
{
    [Fact]
    public void Settings_Persist_OnOff_And_FontSelection()
    {
        var settings = new AppSettings
        {
            IsEnabled = false,
            SelectedFont = AppFont.Brana,
            StartWithWindows = true
        };

        var json = JsonSerializer.Serialize(settings);
        var restored = JsonSerializer.Deserialize<AppSettings>(json);

        Assert.NotNull(restored);
        Assert.False(restored!.IsEnabled);
        Assert.Equal(AppFont.Brana, restored.SelectedFont);
        Assert.True(restored.StartWithWindows);
    }

    [Fact]
    public void TrayMenuState_Reports_On_Mode_And_Font()
    {
        var state = new TrayMenuState(true, InputMode.Amharic, AppFont.Brana, false);

        Assert.Equal("Axum Geez: ON", state.PowerText);
        Assert.Equal("Mode: አማ", state.ModeText);
        Assert.Equal("Font: Brana", state.FontText);
    }

    [Fact]
    public void TrayMenuState_Reports_Off_And_English()
    {
        var state = new TrayMenuState(false, InputMode.English, AppFont.Default, true);

        Assert.Equal("Axum Geez: OFF", state.PowerText);
        Assert.Equal("Mode: EN", state.ModeText);
        Assert.Equal("Font: Default", state.FontText);
        Assert.True(state.StartWithWindows);
    }

    [Theory]
    [InlineData("Brana")]
    [InlineData("Default")]
    [InlineData("Axum Royal")]
    [InlineData("Axum Modern")]
    [InlineData("System")]
    public void Font_Options_Are_Normalized(string option)
    {
        Assert.Equal(option, AppFont.Normalize(option));
    }
}
