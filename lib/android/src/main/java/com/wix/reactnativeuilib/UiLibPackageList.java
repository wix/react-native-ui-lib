package com.wix.reactnativeuilib;

import android.app.Application;
import com.facebook.react.ReactPackage;

import com.wix.reactnativeuilib.highlighterview.HighlighterViewPackage;
import com.wix.reactnativeuilib.keyboardinput.KeyboardInputPackage;
import com.wix.reactnativeuilib.textinput.TextInputDelKeyHandlerPackage;
import com.wix.reactnativeuilib.wheelpicker.WheelPickerPackage;

import java.util.Arrays;
import java.util.List;

public class UiLibPackageList {

    private final Application application;

    public UiLibPackageList(Application application) {
        this.application = application;
    }

    public List<ReactPackage> getPackageList() {
        return Arrays.asList(
                new HighlighterViewPackage(),
                new WheelPickerPackage(),
                new TextInputDelKeyHandlerPackage(),
                new KeyboardInputPackage(application)
        );
    }
}
