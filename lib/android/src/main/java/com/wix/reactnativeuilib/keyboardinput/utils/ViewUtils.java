package com.wix.reactnativeuilib.keyboardinput.utils;

import android.app.Activity;
import android.view.View;
import android.view.ViewGroup;
import android.view.Window;

import androidx.annotation.Nullable;

import com.facebook.react.ReactRootView;

import static com.wix.reactnativeuilib.keyboardinput.AppContextHolder.getCurrentActivity;

public class ViewUtils {

    private static class VisibleViewClassMatchPredicate implements PredicateFunc<View> {
        private final Class mClazz;

        private VisibleViewClassMatchPredicate(Class clazz) {
            mClazz = clazz;
        }

        @Override
        public boolean invoke(View view) {
            return mClazz.isAssignableFrom(view.getClass()) && view.isShown();
        }
    }
    private static final VisibleViewClassMatchPredicate sVisibleReactRootViewMatcher = new VisibleViewClassMatchPredicate(ReactRootView.class);

    public static Window getWindow() {
        final Activity activity = getCurrentActivity();
        return (activity == null ? null : activity.getWindow());
    }

    public static ReactRootView getReactRootView() {
        final Window window = getWindow();
        if (window == null) {
            return null;
        }

        final ReactRootView view = findChildByClass((ViewGroup) window.getDecorView(), sVisibleReactRootViewMatcher);
        return view;
    }

    /**
     * Returns the first instance of clazz in root for which <code>predicate</code> is evaluated as <code>true</code>.
     */
    @Nullable
    public static <T> T findChildByClass(ViewGroup root, PredicateFunc<View> predicate) {
        for (int i = 0; i < root.getChildCount(); i++) {
            View view = root.getChildAt(i);
            if (predicate.invoke(view)) {
                return ((T) view);
            }

            if (view instanceof ViewGroup) {
                view = findChildByClass((ViewGroup) view, predicate);
                if (view != null) {
                    return (T) view;
                }
            }
        }
        return null;
    }
}
