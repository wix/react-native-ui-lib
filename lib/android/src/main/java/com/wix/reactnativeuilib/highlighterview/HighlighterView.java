package com.wix.reactnativeuilib.highlighterview;

import android.content.Context;
import android.graphics.Canvas;
import android.graphics.Paint;
import android.graphics.PorterDuff;
import android.graphics.PorterDuffXfermode;
import android.graphics.RectF;
import android.support.annotation.ColorInt;
import android.view.View;

public class HighlighterView extends View {
    private RectF highlightFrame;
    private RectF viewBasedHighlightFrame;
    HighlightViewTagParams highlightViewTagParams;
    private @ColorInt int overlayColor;
    private @ColorInt int strokeColor;
    private float strokeWidth;
    private float borderRadius = -1;
    private float radius;

    private static final PorterDuffXfermode porterDuffXfermode = new PorterDuffXfermode(PorterDuff.Mode.CLEAR);
    private static final Paint paint = new Paint(Paint.ANTI_ALIAS_FLAG);

    public HighlighterView(Context context) {
        super(context);
        setLayerType(LAYER_TYPE_HARDWARE, null);
    }

    private RectF rectToDraw() {
        if (viewBasedHighlightFrame != null && viewBasedHighlightFrame.width() > 0 && viewBasedHighlightFrame.height() > 0) {
            if (highlightViewTagParams == null) {
                return viewBasedHighlightFrame;
            }

            RectF highlightRect = new RectF(viewBasedHighlightFrame);
            highlightRect.left -= highlightViewTagParams.paddingLeft;
            highlightRect.top -= highlightViewTagParams.paddingTop;
            highlightRect.right += highlightViewTagParams.paddingRight;
            highlightRect.bottom += highlightViewTagParams.paddingBottom;

            if (highlightViewTagParams.offsetX > 0) {
                highlightRect.left += highlightViewTagParams.offsetX;
                highlightRect.right += highlightViewTagParams.offsetX;
            }
            if (highlightViewTagParams.offsetY > 0) {
                highlightRect.top += highlightViewTagParams.offsetY;
                highlightRect.bottom += highlightViewTagParams.offsetY;
            }
            return highlightRect;
        } else {
            return highlightFrame;
        }
    }

    private void updateRadius() {
        float newRadius = 0;
        if (borderRadius >= 0) {
            newRadius = borderRadius;
        }
        else {
            RectF rect = rectToDraw();
            if (rect != null) {
                newRadius = Math.min(rect.width() / 2, rect.height() / 2);
            }
        }
        radius = newRadius;
    }

    public void setHighlightFrame(HighlightFrame frame) {
        highlightFrame = frame.toRect();
        updateRadius();
        invalidate();
    }

    public void setOverlayColor(@ColorInt int overlayColor) {
        this.overlayColor = overlayColor;
        invalidate();
    }

    public void setStrokeColor(@ColorInt int strokeColor) {
        this.strokeColor = strokeColor;
        invalidate();
    }

    public void setStrokeWidth(int strokeWidth) {
        this.strokeWidth = UiUtils.pxToDp(getResources(), strokeWidth);
        invalidate();
    }

    public void setBorderRadius(int borderRadius) {
        this.borderRadius = UiUtils.pxToDp(getResources(), borderRadius);
        updateRadius();
        invalidate();
    }

    public void setViewBasedHighlightFrame(HighlightFrame viewBasedHighlightFrame) {
        this.viewBasedHighlightFrame = viewBasedHighlightFrame.toRect();
        updateRadius();
        invalidate();
    }

    public void setHighlightViewTagParams(HighlightViewTagParams highlightViewTagParams) {
        this.highlightViewTagParams = highlightViewTagParams;
        updateRadius();
        invalidate();
    }

    @Override
    public void onDraw(Canvas canvas) {
        super.onDraw(canvas);

        paint.setColor(overlayColor);
        paint.setStyle(Paint.Style.FILL);
        canvas.drawPaint(paint);

        RectF rect = rectToDraw();
        if(rect != null) {
            paint.setXfermode(porterDuffXfermode);

            canvas.drawRoundRect(rect, radius, radius, paint);

            if (strokeWidth > 0) {
                paint.setXfermode(null);
                paint.setColor(strokeColor);
                paint.setStrokeWidth(strokeWidth);
                paint.setStyle(Paint.Style.FILL_AND_STROKE);
                canvas.drawRoundRect(rect, radius, radius, paint);
            }
        }
    }
}
