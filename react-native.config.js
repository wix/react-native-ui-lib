module.exports = {
  dependency: {
    platforms: {
      android: {
        sourceDir: './lib/android/',
        packageImportPath: `
  import com.wix.reactnativeuilib.highlighterview.HighlighterViewPackage;
  import com.wix.reactnativeuilib.keyboardinput.KeyboardInputPackage;
  import com.wix.reactnativeuilib.textinput.TextInputDelKeyHandlerPackage;
  import com.wix.reactnativeuilib.wheelpicker.WheelPickerPackage;`
      }
    }
  }
};
