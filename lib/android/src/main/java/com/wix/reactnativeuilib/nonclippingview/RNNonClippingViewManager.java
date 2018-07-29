package com.wix.reactnativeuilib.nonclippingview;

import android.support.annotation.Nullable;

import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableNativeMap;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.annotations.ReactProp;

public class RNNonClippingViewManager extends ViewGroupManager<RNNonClippingViewGroup> {
    public static final String REACT_CLASS = "RNNonClippingView";

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    public RNNonClippingViewGroup createViewInstance(ThemedReactContext context) {
        return new RNNonClippingViewGroup(context);
    }
}
