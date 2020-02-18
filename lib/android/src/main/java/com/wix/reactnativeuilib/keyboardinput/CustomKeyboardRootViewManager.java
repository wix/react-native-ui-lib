package com.wix.reactnativeuilib.keyboardinput;

import com.facebook.react.uimanager.LayoutShadowNode;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;

public class CustomKeyboardRootViewManager extends ViewGroupManager<CustomKeyboardRootView> {

    private final CustomKeyboardLayout mLayout;

    public CustomKeyboardRootViewManager(CustomKeyboardLayout layout) {
        mLayout = layout;
    }

    @Override
    public String getName() {
        return "CustomKeyboardViewNative";
    }

    @Override
    public CustomKeyboardRootView createViewInstance(ThemedReactContext reactContext) {
        return new CustomKeyboardRootView(reactContext, mLayout);
    }

    @Override
    public LayoutShadowNode createShadowNodeInstance() {
        return new CustomKeyboardRootViewShadow(mLayout);
    }
}
