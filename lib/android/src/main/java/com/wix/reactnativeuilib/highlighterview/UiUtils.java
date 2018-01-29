package com.wix.reactnativeuilib.highlighterview;

import android.content.res.Resources;
import android.graphics.Point;
import android.graphics.Rect;
import android.view.Display;
import android.view.View;
import android.view.Window;

import com.facebook.react.uimanager.ThemedReactContext;

import java.lang.reflect.Method;

public class UiUtils {
    public static float pxToDp(Resources resources, double pixels) {
        return (float) (resources.getDisplayMetrics().density * pixels);
    }

    public static int getStatusBarHeight(View view, Window window) {
        int height = 0;
        if (UiUtils.hasOnScreenSystemBar(window)) {
            Resources resources = view.getResources();
            int resourceId = resources.getIdentifier("status_bar_height", "dimen", "android");
            if (resourceId > 0) {
                height = resources.getDimensionPixelSize(resourceId);
            }
        }
        return height;
    }

    public static Rect getVisibleRect(View view) {
        Rect myViewRect = new Rect();
        view.getGlobalVisibleRect(myViewRect);
        return myViewRect;
    }

    private static boolean hasOnScreenSystemBar(Window window) {
        Display display = window.getWindowManager().getDefaultDisplay();
        int rawDisplayHeight = 0;
        try {
            Method getRawHeight = Display.class.getMethod("getRawHeight");
            rawDisplayHeight = (Integer) getRawHeight.invoke(display);
        } catch (Exception ex) {
        }

        Point point = new Point();
        display.getSize(point);
        return (rawDisplayHeight - point.y) <= 0;
    }
}
