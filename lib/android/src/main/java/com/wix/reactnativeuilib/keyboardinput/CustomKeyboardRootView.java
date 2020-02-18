package com.wix.reactnativeuilib.keyboardinput;

import android.content.Context;
import android.view.View;
import android.widget.FrameLayout;

import androidx.annotation.NonNull;

import com.wix.reactnativeuilib.keyboardinput.utils.Logger;

import static com.wix.reactnativeuilib.keyboardinput.GlobalDefs.TAG;

public class CustomKeyboardRootView extends FrameLayout {

    private final CustomKeyboardLayout mLayout;

    public CustomKeyboardRootView(@NonNull Context context, CustomKeyboardLayout layout) {
        super(context);
        mLayout = layout;

        setWillNotDraw(false);
    }

    @Override
    public void onViewAdded(View child) {
        if (getChildCount() == 1) {
            Logger.d(TAG, "New custom keyboard content");
            mLayout.onKeyboardHasCustomContent();
        }
        super.onViewAdded(child);
    }
}
