package com.wix.reactnativeuilib.keyboardinput;

import com.facebook.react.bridge.ReactApplicationContext;

public class ReactContextHolder {

    private static ReactApplicationContext sContext;

    public static void setContext(ReactApplicationContext context) {
        sContext = context;
    }

    public static ReactApplicationContext getContext() {
        return sContext;
    }
}
