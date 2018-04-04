package com.wix.reactnativeuilib.wheelpicker;

import android.content.Context;
import android.util.AttributeSet;
import android.view.ContextThemeWrapper;
import android.widget.NumberPicker;

import com.wix.reactnativeuilib.R;

import java.util.jar.Attributes;

/**
 * Created by eladbo on 02/04/2018.
 */

public class ThemedNumberPicker extends NumberPicker {

    public ThemedNumberPicker(Context context) {
        this(context, null);
    }
    public ThemedNumberPicker(Context context, AttributeSet attrs) {
        // wrap the current context in the style we defined before
        super(new ContextThemeWrapper(context, R.style.NumberPickerTextColorStyle), attrs);
    }
}
