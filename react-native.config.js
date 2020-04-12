module.exports = {
  dependency: {
    platforms: {
      ios: {
        project: './lib/ios/'
      },
      android: {
        sourceDir: './lib/android/',
        packageImportPath: `import com.wix.reactnativeuilib.highlighterview.HighlighterViewPackage;
import com.wix.reactnativeuilib.keyboardinput.KeyboardInputPackage;
import com.wix.reactnativeuilib.textinput.TextInputDelKeyHandlerPackage;
import com.wix.reactnativeuilib.wheelpicker.WheelPickerPackage;`,
        packageInstance: `new HighlighterViewPackage(),
      new WheelPickerPackage(),
      new TextInputDelKeyHandlerPackage(),
      new KeyboardInputPackage(getApplication())`
      }
    }
  }
};
