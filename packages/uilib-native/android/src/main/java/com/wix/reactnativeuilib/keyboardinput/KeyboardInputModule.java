package com.wix.reactnativeuilib.keyboardinput;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class KeyboardInputModule extends ReactContextBaseJavaModule {

    private static final String REACT_CLASS = "CustomKeyboardInputTemp";

    private final CustomKeyboardLayout mLayout;

    public KeyboardInputModule(ReactApplicationContext reactContext, CustomKeyboardLayout layout) {
        super(reactContext);

        mLayout = layout;
    }

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @ReactMethod
    public void reset(Promise promise) {
        mLayout.forceReset(promise);
    }

    @ReactMethod
    public void clearFocusedView() {
        mLayout.clearFocusedView();
    }
}
