package com.wix.reactnativeuilib.highlighterview;

import android.annotation.TargetApi;
import android.app.Activity;
import android.graphics.Rect;
import android.util.Log;
import android.util.SizeF;
import android.view.View;

import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.uimanager.IllegalViewOperationException;
import com.facebook.react.uimanager.NativeViewHierarchyManager;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.UIManagerModule;
import com.facebook.react.uimanager.annotations.ReactProp;

import javax.annotation.Nullable;

class HighlighterViewManager extends SimpleViewManager<HighlighterView> {
    private static final String REACT_CLASS = "HighlighterView";

    private ThemedReactContext context;

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    public HighlighterView createViewInstance(ThemedReactContext context) {
        this.context = context;
        HighlighterView view = new HighlighterView(context);
        view.setFitsSystemWindows(true);
        return view;
    }

    @ReactProp(name = "highlightFrame")
    public void setHighlightFrame(HighlighterView view, ReadableMap highlightFrame) {
        view.setHighlightFrame(new HighlightFrame(view.getResources(), highlightFrame));
    }

    @ReactProp(name = "overlayColor")
    public void setOverlayColor(HighlighterView view, @Nullable Integer overlayColor) {
        view.setOverlayColor((overlayColor == null) ? 0 : overlayColor);
    }

    @ReactProp(name = "borderRadius")
    public void setBorderRadius(HighlighterView view, @Nullable Integer borderRadius) {
        view.setBorderRadius((borderRadius == null) ? 0 : borderRadius);
    }

    @ReactProp(name = "strokeColor")
    public void setStrokeColor(HighlighterView view, @Nullable Integer strokeColor) {
        view.setStrokeColor((strokeColor == null) ? 0 : strokeColor);
    }

    @ReactProp(name = "strokeWidth")
    public void setStrokeWidth(HighlighterView view, @Nullable Integer strokeWidth) {
        view.setStrokeWidth((strokeWidth == null) ? 0 : strokeWidth);
    }

    @TargetApi(21)
    @ReactProp(name = "minimumRectSize")
    public void setMinimumRectSize(HighlighterView view, ReadableMap minimumRectSize) {
        float width = (float) minimumRectSize.getDouble("width");
        float height = (float) minimumRectSize.getDouble("height");
        view.setMinimumRectSize(new SizeF(width, height));
    }

    @ReactProp(name = "innerPadding")
    public void setInnerPadding(HighlighterView view, @Nullable Integer innerPadding) {
        view.setInnerPadding((innerPadding == null) ? 0 : innerPadding);
    }

    @ReactProp(name = "highlightViewTag")
    public void setHighlightViewTag(final HighlighterView view, Integer highlightViewTag) {
        try {
            NativeViewHierarchyManager nativeViewHierarchyManager = ReactHacks.getNativeViewHierarchyManager(context.getNativeModule(UIManagerModule.class));
            if (nativeViewHierarchyManager == null) {
                return;
            }

            final View resolvedView = nativeViewHierarchyManager.resolveView(highlightViewTag);
            if (resolvedView != null) {
                if (resolvedView.getWidth() == 0 || resolvedView.getHeight() == 0) {
                    resolvedView.addOnLayoutChangeListener(new View.OnLayoutChangeListener() {
                        @Override
                        public void onLayoutChange(View v, int left, int top, int right, int bottom, int oldLeft, int oldTop, int oldRight, int oldBottom) {
                            float width = right - left;
                            float height = bottom - top;
                            if (width > 0 && height > 0) {
                                setViewBasedHighlightFrame(view, resolvedView);
                                resolvedView.removeOnLayoutChangeListener(this);
                            }
                        }
                    });
                } else {
                    setViewBasedHighlightFrame(view, resolvedView);
                }
            }
        }
        catch (IllegalViewOperationException e) {
            Log.e("HighlighterView", "invalid highlightViewTag: " + highlightViewTag.toString() + " " + e.toString());
        }
    }

    @ReactProp(name = "highlightViewTagParams")
    public void setHighlightViewTagParams(HighlighterView view, ReadableMap highlightViewTagParams) {
        view.setHighlightViewTagParams(new HighlightViewTagParams(view.getResources(), highlightViewTagParams));
    }

    private void setViewBasedHighlightFrame(HighlighterView view, View resolvedView) {
        Activity currentActivity = context.getCurrentActivity();
        if (currentActivity == null) {
            return;
        }

        final float topOffset = UiUtils.getStatusBarHeight(view, currentActivity.getWindow());
        Rect myViewRect = UiUtils.getVisibleRect(resolvedView);
        view.setViewBasedHighlightFrame(new HighlightFrame(myViewRect.left, myViewRect.top - topOffset, resolvedView.getWidth(), resolvedView.getHeight()));
    }
}
