package com.wix.reactnativeuilib.keyboardinput.utils;

import com.facebook.react.uimanager.UIManagerModule;
import com.wix.reactnativeuilib.keyboardinput.ReactContextHolder;

public class RuntimeUtils {

    // TODO Switch to GuardedRunnable when upgrading RN's minimal ver
    private static final Runnable sUIUpdateClosure = new Runnable() {
        @Override
        public void run() {
            ReactContextHolder.getContext().getNativeModule(UIManagerModule.class).onBatchComplete();
        }
    };

    public static void runOnUIThread(Runnable runnable) {
        ReactContextHolder.getContext().runOnUiQueueThread(runnable);
    }

    public static void dispatchUIUpdates(final Runnable userRunnable) {
        runOnUIThread(new Runnable() {
            @Override
            public void run() {
                userRunnable.run();
                ReactContextHolder.getContext().runOnNativeModulesQueueThread(sUIUpdateClosure);
            }
        });
    }
}
