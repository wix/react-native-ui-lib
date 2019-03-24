package com.wix.reactnativeuilib.wheelpicker;

import android.graphics.Color;
import android.graphics.Paint;
import android.graphics.Typeface;
import android.graphics.drawable.ColorDrawable;
import android.support.annotation.NonNull;
import android.util.Log;
import android.view.View;
import android.widget.EditText;
import android.widget.NumberPicker;

import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.wix.reactnativeuilib.utils.LogForwarder;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.Map;

import javax.annotation.Nullable;

/**
 * Created by eladbo on 01/04/2018.
 */

public class WheelPickerManager extends SimpleViewManager<WheelPicker> {
    @SuppressWarnings("SpellCheckingInspection")
    private static final String TAG = "WheelPickerMngr(native)";
    @SuppressWarnings("WeakerAccess")
    public static final String REACT_CLASS = "WheelPicker";
    private int initialIndex;
    private LogForwarder logForwarder;

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    public WheelPicker createViewInstance(ThemedReactContext context) {
        logForwarder = new LogForwarder(context);
        return new WheelPicker(context); //If your CustomView has more constructor parameters pass it from here.
    }

    @SuppressWarnings("unused")
    @ReactProp(name = "initialIndex")
    public void setInitialIndex(@SuppressWarnings("unused") WheelPicker wheelPicker, @Nullable Integer initialIndex) {
        this.initialIndex = (initialIndex == null) ? 0 : initialIndex;
    }

    @SuppressWarnings("unused")
    @ReactProp(name = "data")
    public void setData(WheelPicker wheelPicker, @Nullable ReadableArray data) {
        wheelPicker.setDisplayedValues(null);
        wheelPicker.setWrapSelectorWheel(false);

        if (data != null) {
            ArrayList dataList = data.toArrayList();
            final String[] arrayString = (String[]) dataList.toArray(new String[0]);
            wheelPicker.setMinValue(0);
            wheelPicker.setMaxValue(arrayString.length - 1);
            wheelPicker.setDisplayedValues(arrayString);
            wheelPicker.setValue(this.initialIndex);
        }
    }

    @SuppressWarnings("unused")
    @ReactProp(name = "color")
    public void setColor(WheelPicker wheelPicker, @Nullable String colorAsString) {
        if (colorAsString != null) {
            int color = getColorFromString(colorAsString);
            try {
                setDividerColor(wheelPicker, color);
            } catch (Exception e) {
                String message = "at least one component in the wheel picker did not receive the correct color";
                Log.w(TAG, message, e);
                logForwarder.w(TAG, message + e.getMessage());
            }
        }
    }

    private void setDividerColor(WheelPicker wheelPicker, int color) throws NoSuchFieldException, IllegalAccessException, IllegalArgumentException {
        //noinspection JavaReflectionMemberAccess
        Field selectionDividerField = NumberPicker.class.getDeclaredField("mSelectionDivider");
        selectionDividerField.setAccessible(true);
        ColorDrawable colorDrawable = new ColorDrawable(color);
        selectionDividerField.set(wheelPicker, colorDrawable);
    }

    @SuppressWarnings("unused")
    @ReactProp(name = "fontSize")
    public void setFontSize(WheelPicker wheelPicker, @Nullable Integer fontSize) {
        if (fontSize != null) {
            try {
                setTextSize(wheelPicker, fontSize);
            } catch (Exception e) {
                String message = "at least one component in the wheel picker did not receive the correct font size";
                Log.w(TAG, message, e);
                logForwarder.w(TAG, message + e.getMessage());
            }
        }
    }

    private void setTextSize(WheelPicker wheelPicker, int fontSize) throws NoSuchFieldException, IllegalAccessException, IllegalArgumentException {
        setDrawableTextSize(wheelPicker, fontSize);
        setEditTextSize(wheelPicker, fontSize);
    }

    private void setDrawableTextSize(WheelPicker wheelPicker, int fontSize) throws NoSuchFieldException, IllegalAccessException, IllegalArgumentException {
        //noinspection JavaReflectionMemberAccess
        Field selectorWheelPaintField = NumberPicker.class.getDeclaredField("mSelectorWheelPaint");
        selectorWheelPaintField.setAccessible(true);
        float fontSizeInSp = fontSize * wheelPicker.getResources().getDisplayMetrics().scaledDensity;
        ((Paint)selectorWheelPaintField.get(wheelPicker)).setTextSize(fontSizeInSp);
    }

    private void setEditTextSize(WheelPicker wheelPicker, int fontSize) {
        final int count = wheelPicker.getChildCount();
        for(int i = 0 ; i < count ; ++i){
            View child = wheelPicker.getChildAt(i);
            if(child instanceof EditText) {
                ((EditText) child).setTextSize(fontSize);
            }
        }
    }

    @SuppressWarnings("unused")
    public
    @ReactProp(name = "fontFamily") void setFontSize(WheelPicker wheelPicker, @Nullable String fontFamily) {
        if (fontFamily != null) {
            try {
                Typeface typeface = Typeface.create(fontFamily, Typeface.NORMAL);
                setDrawableTypeface(wheelPicker, typeface);
                setEditTextTypeFace(wheelPicker, typeface);
            } catch (Exception e) {
                String message = "at least one component in the wheel picker did not receive the correct font family";
                Log.w(TAG, message, e);
                logForwarder.w(TAG, message + e.getMessage());
            }
        }
    }

    private void setDrawableTypeface(WheelPicker wheelPicker, @Nullable Typeface typeface) throws NoSuchFieldException, IllegalAccessException, IllegalArgumentException {
        //noinspection JavaReflectionMemberAccess
        Field selectorWheelPaintField = NumberPicker.class.getDeclaredField("mSelectorWheelPaint");
        selectorWheelPaintField.setAccessible(true);
        ((Paint)selectorWheelPaintField.get(wheelPicker)).setTypeface(typeface);
    }

    private void setEditTextTypeFace(WheelPicker wheelPicker, @Nullable Typeface typeface) {
        final int count = wheelPicker.getChildCount();
        for(int i = 0 ; i < count ; ++i){
            View child = wheelPicker.getChildAt(i);
            if(child instanceof EditText) {
                ((EditText) child).getPaint().setTypeface(typeface);
            }
        }
    }

    @SuppressWarnings("unused")
    @ReactProp(name = "labelColor")
    public void setLabelColor(WheelPicker wheelPicker, @Nullable String colorAsString) {
        if (colorAsString != null) {
            int color = getColorFromString(colorAsString);
            try {
                setTextColor(wheelPicker, color);
            } catch (Exception e) {
                String message = "at least one component in the wheel picker did not receive the correct color";
                Log.w(TAG, message, e);
                logForwarder.w(TAG, message + e.getMessage());
            }
        }
    }

    private void setTextColor(WheelPicker wheelPicker, int color) throws NoSuchFieldException, IllegalAccessException, IllegalArgumentException {
        setDrawableColor(wheelPicker, color);
        setEditTextColor(wheelPicker, color);
    }

    private void setDrawableColor(WheelPicker wheelPicker, int color) throws NoSuchFieldException, IllegalAccessException, IllegalArgumentException {
        //noinspection JavaReflectionMemberAccess
        Field selectorWheelPaintField = NumberPicker.class.getDeclaredField("mSelectorWheelPaint");
        selectorWheelPaintField.setAccessible(true);
        ((Paint)selectorWheelPaintField.get(wheelPicker)).setColor(color);
    }

    private void setEditTextColor(WheelPicker wheelPicker, int color) {
        final int count = wheelPicker.getChildCount();
        for(int i = 0 ; i < count ; ++i){
            View child = wheelPicker.getChildAt(i);
            if(child instanceof EditText) {
                ((EditText) child).setTextColor(color);
            }
        }
    }

    @SuppressWarnings("unused")
    @ReactProp(name = "itemHeight")
    public void setItemHeight(WheelPicker wheelPicker, @Nullable Integer itemHeight) {
        if (itemHeight != null) {
            try {
                //noinspection JavaReflectionMemberAccess
                Field selectionDividersDistanceField = NumberPicker.class.getDeclaredField("mSelectionDividersDistance");
                selectionDividersDistanceField.setAccessible(true);
                int itemHeightInSp = (int) (itemHeight * wheelPicker.getResources().getDisplayMetrics().scaledDensity);
                selectionDividersDistanceField.set(wheelPicker, itemHeightInSp);
            } catch (Exception e) {
                String message = "item height was not set in the wheel picker";
                Log.w(TAG, message, e);
                logForwarder.w(TAG, message + e.getMessage());
            }
        }
    }

    public Map getExportedCustomBubblingEventTypeConstants() {
        return MapBuilder.builder()
                .put(
                        "topChange",
                        MapBuilder.of(
                                "phasedRegistrationNames",
                                MapBuilder.of("bubbled", "onChange")))
                .build();
    }

    private int getColorFromString(@NonNull String colorAsString) {
        if (colorAsString.length() == 4) { // #XXX
            colorAsString = colorAsString.replaceAll("#([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])", "#$1$1$2$2$3$3");
        }

        return Color.parseColor(colorAsString);
    }
}
