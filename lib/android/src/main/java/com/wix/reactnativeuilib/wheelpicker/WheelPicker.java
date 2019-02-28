package com.wix.reactnativeuilib.wheelpicker;

import android.content.Context;
import android.view.ContextThemeWrapper;
import android.widget.NumberPicker;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.events.RCTEventEmitter;
import com.wix.reactnativeuilib.R;

/**
 * Created by eladbo on 01/04/2018.
 */

public class WheelPicker extends NumberPicker{

    public WheelPicker(final Context context) {
        super(new ContextThemeWrapper(context, R.style.NumberPickerTextColorStyle));
        this.setDescendantFocusability(NumberPicker.FOCUS_BLOCK_DESCENDANTS);
        this.setOnValueChangedListener(new OnValueChangeListener() {
            @Override
            public void onValueChange(NumberPicker picker, int oldVal, int newVal) {
                WritableMap event = Arguments.createMap();
                event.putInt("itemIndex", newVal);
                ReactContext reactContext = (ReactContext) context;
                reactContext.getJSModule(RCTEventEmitter.class).receiveEvent(
                        getId(),
                        "topChange",
                        event);
            }
        });
    }

}
