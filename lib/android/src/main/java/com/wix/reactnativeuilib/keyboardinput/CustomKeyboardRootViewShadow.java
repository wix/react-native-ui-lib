package com.wix.reactnativeuilib.keyboardinput;

import com.facebook.react.uimanager.LayoutShadowNode;
import com.facebook.react.uimanager.NativeViewHierarchyOptimizer;

public class CustomKeyboardRootViewShadow extends LayoutShadowNode {

    private final CustomKeyboardLayout.Box mLayout;

    CustomKeyboardRootViewShadow(CustomKeyboardLayout.Box layout) {
        setStyleHeight(0);

        mLayout = layout;

        CustomKeyboardLayout layoutInst = layout.getInstance();
        if (layoutInst != null) {
            layoutInst.setShadowNode(this);
        }
    }

    @Override
    public void onBeforeLayout(NativeViewHierarchyOptimizer nativeViewHierarchyOptimizer) {
        CustomKeyboardLayout layoutInst = mLayout.getInstance();
        if (layoutInst != null) {
            layoutInst.setShadowNode(this);
        }
    }

    public void setHeight(int heightPx) {
        setStyleHeight(heightPx);
    }

    public float getHeight() {
        return getStyleHeight().value;
    }
}
