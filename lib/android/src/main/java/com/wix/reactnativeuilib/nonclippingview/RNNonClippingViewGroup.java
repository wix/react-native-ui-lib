package com.wix.reactnativeuilib.nonclippingview;

import android.content.Context;
import android.view.ViewGroup;
import android.util.Log;
import com.facebook.react.views.view.ReactViewGroup;

public class RNNonClippingViewGroup extends ReactViewGroup {

    public RNNonClippingViewGroup(Context context) {
        super(context);
    }

    @Override
    protected void onLayout(boolean changed, int left, int top, int right, int bottom) {
        super.onLayout(changed, left, top, right, bottom);

        try {
            //TODO: check if it makes more sense to clip "this" instead of the parent so it is more understandable which view is the "non clipping" one
            ((ViewGroup) getParent()).setClipChildren(false);
        } catch (Exception e) {
             Log.e("RNNonClippingViewGroup", "error hiding the loading image", e);
        }
    }

}