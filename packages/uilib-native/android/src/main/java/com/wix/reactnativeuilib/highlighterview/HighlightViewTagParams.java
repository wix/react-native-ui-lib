package com.wix.reactnativeuilib.highlighterview;

import android.content.res.Resources;

import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableType;

public class HighlightViewTagParams {
    public float paddingTop = 0;
    public float paddingLeft = 0;
    public float paddingBottom = 0;
    public float paddingRight = 0;
    public float offsetX = 0;
    public float offsetY = 0;

    public HighlightViewTagParams(Resources resources, ReadableMap highlightViewTagParams) {
        if (highlightViewTagParams != null) {
            if (highlightViewTagParams.hasKey("padding")) {
                if (highlightViewTagParams.getType("padding") == ReadableType.Number) {
                    float paddingValue = UiUtils.pxToDp(resources, highlightViewTagParams.getDouble("padding"));
                    paddingTop = paddingLeft = paddingBottom = paddingRight = paddingValue;
                } else if (highlightViewTagParams.getType("padding") == ReadableType.Map) {
                    ReadableMap paddingMap = highlightViewTagParams.getMap("padding");
                    if (paddingMap.hasKey("top")) {
                        paddingTop = UiUtils.pxToDp(resources, paddingMap.getDouble("top"));
                    }
                    if (paddingMap.hasKey("left")) {
                        paddingLeft = UiUtils.pxToDp(resources, paddingMap.getDouble("left"));
                    }
                    if (paddingMap.hasKey("bottom")) {
                        paddingBottom = UiUtils.pxToDp(resources, paddingMap.getDouble("bottom"));
                    }
                    if (paddingMap.hasKey("right")) {
                        paddingRight = UiUtils.pxToDp(resources, paddingMap.getDouble("right"));
                    }
                }
            }

            if (highlightViewTagParams.hasKey("offset")) {
                ReadableMap offsetMap = highlightViewTagParams.getMap("offset");
                if (offsetMap.hasKey("x")) {
                    offsetX = UiUtils.pxToDp(resources, offsetMap.getDouble("x"));
                }
                if (offsetMap.hasKey("y")) {
                    offsetY = UiUtils.pxToDp(resources, offsetMap.getDouble("y"));
                }
            }
        }
    }
}
