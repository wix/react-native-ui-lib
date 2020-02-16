package com.wix.reactnativeuilib.keyboardinput;

import android.view.ViewTreeObserver;

import com.facebook.react.ReactRootView;
import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.ReactContext;
import com.wix.reactnativeuilib.keyboardinput.utils.ViewUtils;

import java.util.HashSet;
import java.util.Set;

import static com.wix.reactnativeuilib.keyboardinput.utils.ViewUtils.getWindow;

public class ReactScreenMonitor implements LifecycleEventListener {

    public interface Listener {
        void onNewReactScreen(ReactRootView reactRootView);
    }

    private final ViewTreeObserver.OnGlobalLayoutListener mWindowLayoutListener = new ViewTreeObserver.OnGlobalLayoutListener() {
        @Override
        public void onGlobalLayout() {
            final ReactRootView reactRootView = ViewUtils.getReactRootView();
            if (mLastReactRootView != reactRootView) {
                mLastReactRootView = reactRootView;
                notifyNewScreen();
            }
        }
    };

    private ReactRootView mLastReactRootView;
    private Set<Listener> mExternalListeners = new HashSet<>();

    private boolean mHasWindowLayoutListener;

    public ReactScreenMonitor(ReactContext reactContext) {
        reactContext.addLifecycleEventListener(this);
    }

    public void addListener(Listener listener) {
        mExternalListeners.add(listener);
    }

    @Override
    public void onHostResume() {
        if (mHasWindowLayoutListener) {
            removeWindowLayoutListener();
        }
        mHasWindowLayoutListener = true;
        registerWindowLayoutListener();
    }

    @Override
    public void onHostDestroy() {
        removeWindowLayoutListener();
        mHasWindowLayoutListener = false;
    }

    @Override
    public void onHostPause() {
    }

    private void registerWindowLayoutListener() {
        getWindow().getDecorView().getViewTreeObserver().addOnGlobalLayoutListener(mWindowLayoutListener);
    }

    private void removeWindowLayoutListener() {
        if (getWindow() == null) {
            // No window => no activity => nothing to clear.
            return;
        }
        getWindow().getDecorView().getViewTreeObserver().removeOnGlobalLayoutListener(mWindowLayoutListener);
    }

    private void notifyNewScreen() {
        for (Listener listener : mExternalListeners) {
            listener.onNewReactScreen(mLastReactRootView);
        }
    }
}
