package com.wix.reactnativeuilib.keyboardinput;

import com.facebook.react.uimanager.LayoutShadowNode;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;

public class CustomKeyboardRootViewManager extends ViewGroupManager<CustomKeyboardRootView> {

    public CustomKeyboardLayout.Box mLayout;

    public CustomKeyboardRootViewManager(CustomKeyboardLayout.Box layout) {
        mLayout = layout;
    }

    @Override
    public String getName() {
        return "CustomKeyboardViewNativeTemp";
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
