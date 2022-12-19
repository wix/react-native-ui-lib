module.exports = {
  dependency: {
    platforms: {
      // TODO: Once we upgrade to RN69 we should try using podspecPath again, for now I moved ReactNativeUiLib.podspec file to the root - it seems to work
      // ios: {
      //   podspecPath: './lib/ReactNativeUiLib.podspec'
      // },
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
