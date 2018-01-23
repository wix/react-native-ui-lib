package com.wix.reactnativeuilib.highlighterview;

import android.content.res.Resources;
import android.graphics.RectF;

import com.facebook.react.bridge.ReadableMap;

public class HighlightFrame {
    public float x;
    public float y;
    public float width;
    public float height;

    public HighlightFrame(Resources resources, ReadableMap highlightFrameMap) {
        if (highlightFrameMap != null) {
            x = UiUtils.pxToDp(resources, highlightFrameMap.getDouble("x"));
            y = UiUtils.pxToDp(resources, highlightFrameMap.getDouble("y"));
            width = UiUtils.pxToDp(resources, highlightFrameMap.getDouble("width"));
            height = UiUtils.pxToDp(resources, highlightFrameMap.getDouble("height"));
        }
    }

    public HighlightFrame(float x, float y, float width, float height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    public RectF toRect() {
        return new RectF(x, y, x + width,y + height);
    }
}
