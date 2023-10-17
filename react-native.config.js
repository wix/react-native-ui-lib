module.exports = {
  dependency: {
    platforms: {
      /* TODO: Once we upgrade to RN69 we should try using podspecPath again, for now I copied ReactNativeUiLib.podspec file to the root - it seems to work
      I copied it, because we need it for both the main uilib and the uilib-native package */
      // ios: {
      //   podspecPath: './lib/ReactNativeUiLib.podspec'
      // },
      android: {
        sourceDir: './lib/android/',
        packageImportPath: `import com.wix.reactnativeuilib.dynamicfont.DynamicFontPackage;
import com.wix.reactnativeuilib.highlighterview.HighlighterViewPackage;
import com.wix.reactnativeuilib.keyboardinput.KeyboardInputPackage;
import com.wix.reactnativeuilib.textinput.TextInputDelKeyHandlerPackage;`,
        packageInstance: `new DynamicFontPackage(),
      new HighlighterViewPackage(),
      new TextInputDelKeyHandlerPackage(),
      new KeyboardInputPackage(getApplication())`
      }
    }
  }
};
