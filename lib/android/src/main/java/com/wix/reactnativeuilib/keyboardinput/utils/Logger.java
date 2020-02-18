package com.wix.reactnativeuilib.keyboardinput.utils;

import android.util.Log;

public class Logger {

    private static boolean sIsEnabled;

    public static void enable() {
        sIsEnabled = true;
    }

    public static void disable() {
        sIsEnabled = false;
    }

    public static void v(String tag, String message) {
        if (sIsEnabled) {
            Log.v(tag, message);
        }
    }

    public static void d(String tag, String message) {
        if (sIsEnabled) {
            Log.d(tag, message);
        }
    }

    public static void i(String tag, String message) {
        if (sIsEnabled) {
            Log.i(tag, message);
        }
    }

    public static void e(String tag, String message) {
        if (sIsEnabled) {
            Log.e(tag, message);
        }
    }
}
