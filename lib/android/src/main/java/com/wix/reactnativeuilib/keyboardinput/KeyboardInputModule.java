package com.wix.reactnativeuilib.keyboardinput;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class KeyboardInputModule extends ReactContextBaseJavaModule {

    private static final String REACT_CLASS = "CustomKeyboardInputTemp";

    private final CustomKeyboardLayout.Box mLayout;

    public KeyboardInputModule(ReactApplicationContext reactContext, CustomKeyboardLayout.Box layout) {
        super(reactContext);

        mLayout = layout;
    }

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @ReactMethod
    public void reset(Promise promise) {
        CustomKeyboardLayout layoutInst = mLayout.getInstance();
        if (layoutInst != null) {
            layoutInst.forceReset(promise);
        }
    }

    @ReactMethod
    public void clearFocusedView() {
        CustomKeyboardLayout layoutInst = mLayout.getInstance();
        if (layoutInst != null) {
            layoutInst.clearFocusedView();
        }
    }
}
