module.exports = {
  dependency: {
    platforms: {
      android: {
        sourceDir: './lib/android/',
        packageImportPath: `import com.wix.reactnativeuilib.highlighterview.HighlighterViewPackage;
import com.wix.reactnativeuilib.keyboardinput.KeyboardInputPackage;
import com.wix.reactnativeuilib.textinput.TextInputDelKeyHandlerPackage;`,
        packageInstance: `new HighlighterViewPackage(),
      new TextInputDelKeyHandlerPackage(),
      new KeyboardInputPackage(getApplication())`
      }
    }
  }
};
