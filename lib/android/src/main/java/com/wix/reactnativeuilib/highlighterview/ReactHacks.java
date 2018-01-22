package com.wix.reactnativeuilib.highlighterview;

import android.support.annotation.Nullable;

import com.facebook.react.uimanager.NativeViewHierarchyManager;
import com.facebook.react.uimanager.UIBlock;
import com.facebook.react.uimanager.UIManagerModule;
import com.facebook.react.uimanager.UIViewOperationQueue;

/**
 * ¯\_(ツ)_/¯
 */
public class ReactHacks {

    /**
     * {@link NativeViewHierarchyManager} is used to resolve a native view by RN tag ({@link NativeViewHierarchyManager#resolveView}). The only way of obtaining it is by
     * posting {@link UIBlock} which can take a noticeable amount of time to execute.
     */
    @Nullable
    public static NativeViewHierarchyManager getNativeViewHierarchyManager(UIManagerModule uiManager) {
        try {
            UIViewOperationQueue mOperationsQueue = (UIViewOperationQueue) ReflectionUtils.getDeclaredField(uiManager.getUIImplementation(), "mOperationsQueue");
            return (NativeViewHierarchyManager) ReflectionUtils.getDeclaredField(mOperationsQueue, "mNativeViewHierarchyManager");
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
