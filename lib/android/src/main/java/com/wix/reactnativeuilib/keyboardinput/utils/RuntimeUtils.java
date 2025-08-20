package com.wix.reactnativeuilib.keyboardinput.utils;

import com.facebook.react.uimanager.UIManagerModule;
import com.wix.reactnativeuilib.keyboardinput.ReactContextHolder;

public class RuntimeUtils {

    // TODO Switch to GuardedRunnable when upgrading RN's minimal ver
    private static final Runnable sUIUpdateClosure = new Runnable() {
        @Override
        public void run() {
            UIManagerModule uiManager = ReactContextHolder.getContext().getNativeModule(UIManagerModule.class);
            if (uiManager != null) {
                uiManager.onBatchComplete();
            }
        }
    };

    public static void runOnUIThread(Runnable runnable) {
        if (ReactContextHolder.getContext() != null) {
            ReactContextHolder.getContext().runOnUiQueueThread(runnable);
        }
    }

    public static void dispatchUIUpdates(final Runnable userRunnable) {
        runOnUIThread(new Runnable() {
            @Override
            public void run() {
                userRunnable.run();
                if (ReactContextHolder.getContext() != null) {
                    ReactContextHolder.getContext().runOnNativeModulesQueueThread(sUIUpdateClosure);
                }
            }
        });
    }
}
