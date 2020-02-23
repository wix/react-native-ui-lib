package com.wix.reactnativeuilib.keyboardinput;

import android.content.Context;
import android.view.View;
import android.view.WindowManager;
import android.view.inputmethod.InputMethodManager;
import android.widget.EditText;

import com.facebook.react.ReactRootView;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.lang.ref.WeakReference;

import static com.wix.reactnativeuilib.keyboardinput.AppContextHolder.getCurrentActivity;
import static com.wix.reactnativeuilib.keyboardinput.utils.RuntimeUtils.dispatchUIUpdates;
import static com.wix.reactnativeuilib.keyboardinput.utils.RuntimeUtils.runOnUIThread;
import static com.wix.reactnativeuilib.keyboardinput.utils.ViewUtils.getWindow;

public class CustomKeyboardLayout implements ReactSoftKeyboardMonitor.Listener, ReactScreenMonitor.Listener {
    private boolean mFirstKeyboardShow = true;
    private final InputMethodManager mInputMethodManager;
    private final ReactSoftKeyboardMonitor mKeyboardMonitor;
    private WeakReference<CustomKeyboardRootViewShadow> mShadowNode = new WeakReference<>(null);

    public CustomKeyboardLayout(ReactContext reactContext, ReactSoftKeyboardMonitor keyboardMonitor, ReactScreenMonitor screenMonitor) {
        mKeyboardMonitor = keyboardMonitor;
        mInputMethodManager = (InputMethodManager) reactContext.getSystemService(Context.INPUT_METHOD_SERVICE);

        mKeyboardMonitor.setListener(this);
        screenMonitor.addListener(this);
    }

    @Override
    public void onSoftKeyboardVisible(boolean distinct) {
        if (distinct) {
            clearKeyboardOverlayMode();
        }
        hideCustomKeyboardContent();
    }

    @Override
    public void onSoftKeyboardHidden() {
        if (getShadowNodeHeight() == 0) {
            mFirstKeyboardShow = true;
        }
    }

    @Override
    public void onNewReactScreen(ReactRootView reactRootView) {
        clearKeyboardOverlayMode();
        if (reactRootView != null) {
            sendCustomKeyboardResignedEvent();
        }
    }

    public void setShadowNode(CustomKeyboardRootViewShadow node) {
        mShadowNode = new WeakReference<>(node);
    }

    public void onKeyboardHasCustomContent() {
        runOnUIThread(new Runnable() {
            @Override
            public void run() {
                showCustomKeyboardContent();
                setKeyboardOverlayMode();
                hideSoftKeyboardIfNeeded();
            }
        });
    }

    public void forceReset(final Promise promise) {
        runOnUIThread(new Runnable() {
            @Override
            public void run() {
                final View focusedView = getCurrentActivity().getCurrentFocus();
                if (focusedView instanceof EditText) {
                    showSoftKeyboard();
                } else {
                    hideCustomKeyboardContent();
                    clearKeyboardOverlayMode();
                }
                promise.resolve(null);
            }
        });
    }

    public void clearFocusedView() {
        runOnUIThread(new Runnable() {
            @Override
            public void run() {
                final View focusedView = getCurrentActivity().getCurrentFocus();
                if (focusedView != null) {
                    focusedView.clearFocus();
                }
            }
        });
    }

    private void showCustomKeyboardContent() {
        setCustomKeyboardHeight(getHeightForCustomContent());
    }

    private void hideCustomKeyboardContent() {
        setCustomKeyboardHeight(0);
        runOnUIThread(new Runnable() {
            @Override
            public void run() {
                sendCustomKeyboardResignedEvent();
            }
        });
    }

    private void syncCustomKeyboardHeightAfterUIUpdate(final int height) {
        dispatchUIUpdates(new Runnable() {
            @Override
            public void run() {
                setShadowNodeHeight(height);
            }
        });
    }

    private void setCustomKeyboardHeight(int height) {
        try {
            if (mFirstKeyboardShow) {
                mFirstKeyboardShow = false;
                syncCustomKeyboardHeightAfterUIUpdate(height);
            } else {
                setShadowNodeHeight(height);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private void setShadowNodeHeight(int height) {
        final CustomKeyboardRootViewShadow shadowNode = mShadowNode.get();
        if (shadowNode != null) {
            shadowNode.setHeight(height);
        }
    }

    private float getShadowNodeHeight() {
        float height = 0;
        final CustomKeyboardRootViewShadow shadowNode = mShadowNode.get();
        if (shadowNode != null) {
            height = shadowNode.getHeight();
        }
        return height;
    }

    private void showSoftKeyboard() {
        mInputMethodManager.showSoftInput(getCurrentActivity().getCurrentFocus(), 0);
    }

    private void hideSoftKeyboardIfNeeded() {
        final View focusedView = getCurrentActivity().getCurrentFocus();
        if (focusedView != null) {
            mInputMethodManager.hideSoftInputFromWindow(focusedView.getWindowToken(), 0);
        }
    }

    private int getHeightForCustomContent() {
        return mKeyboardMonitor.getKeyboardHeight();
    }

    private void setKeyboardOverlayMode() {
        getWindow().setSoftInputMode(WindowManager.LayoutParams.SOFT_INPUT_ADJUST_PAN);
    }

    private void clearKeyboardOverlayMode() {
        getWindow().setSoftInputMode(WindowManager.LayoutParams.SOFT_INPUT_ADJUST_RESIZE);
    }

    private void sendCustomKeyboardResignedEvent() {
        if (ReactContextHolder.getContext().hasActiveCatalystInstance()) {
            ReactContextHolder.getContext().getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit("kbdResigned", null);
        }
    }

}
