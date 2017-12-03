package com.wix.reactnativeuilib.textinput;

import android.view.View;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.uimanager.NativeViewHierarchyManager;
import com.facebook.react.uimanager.UIBlock;
import com.facebook.react.uimanager.UIManagerModule;
import com.facebook.react.views.textinput.ReactEditText;

public class TextInputDelKeyHandlerModule extends ReactContextBaseJavaModule {

    private final static String REACT_CLASS = "TextInputDelKeyHandler";

    TextInputDelKeyHandlerModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @ReactMethod
    public void register(final Integer textInputTag) {
        final ReactApplicationContext reactContext = this.getReactApplicationContext();
        final UIManagerModule uiManager = reactContext.getNativeModule(UIManagerModule.class);

        uiManager.addUIBlock(new UIBlock() {
            public void execute(NativeViewHierarchyManager viewHierarchyManager) {
                final View view = viewHierarchyManager.resolveView(textInputTag);
                final ReactEditText editText = ViewUtils.getEditTextInView(view);

                if (editText != null) {
                    final KeyListenerProxy keyListenerProxy = new KeyListenerProxy(reactContext, editText.getKeyListener());
                    editText.setKeyListener(keyListenerProxy);
                }
            }
        });
    }
}
