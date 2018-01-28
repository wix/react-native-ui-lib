package com.wix.reactnativeuilib.textinput;

import android.support.annotation.Nullable;
import android.view.View;
import android.view.ViewGroup;

import com.facebook.react.views.textinput.ReactEditText;

class ViewUtils {

    @Nullable
    static ReactEditText getEditTextInView(View view) {
        if (view == null) {
            return null;
        }

        if (view instanceof ReactEditText) {
            return (ReactEditText) view;
        }

        if (view instanceof ViewGroup) {
            final ViewGroup viewGroup = (ViewGroup) view;

            for (int i = 0; i < viewGroup.getChildCount(); i++) {
                final View child = viewGroup.getChildAt(i);
                final View childView = getEditTextInView(child);

                if (childView != null) {
                    return (ReactEditText) childView;
                }
            }
        }
        return null;
    }
}
