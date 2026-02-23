package com.wix.reactnativeuilib.keyboardinput;

import com.facebook.react.uimanager.LayoutShadowNode;
import com.facebook.react.uimanager.NativeViewHierarchyOptimizer;

public class CustomKeyboardRootViewShadow extends LayoutShadowNode {

    private final CustomKeyboardLayout mLayout;

    CustomKeyboardRootViewShadow(CustomKeyboardLayout layout) {
        setStyleHeight(0);

        mLayout = layout;
        mLayout.setShadowNode(this);
    }

    @Override
    public void onBeforeLayout(NativeViewHierarchyOptimizer nativeViewHierarchyOptimizer) {
        mLayout.setShadowNode(this);
    }

    public void setHeight(int heightPx) {
        setStyleHeight(heightPx);
    }

    public float getHeight() {
        return getStyleHeight().value;
    }
}
