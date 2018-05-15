package com.wix.reactnativeuilib.highlighterview;

import android.annotation.TargetApi;
import android.content.Context;
import android.graphics.Canvas;
import android.graphics.Paint;
import android.graphics.PorterDuff;
import android.graphics.PorterDuffXfermode;
import android.graphics.RectF;
import android.support.annotation.ColorInt;
import android.view.View;
import android.util.SizeF;

public class HighlighterView extends View {
    private RectF highlightFrame;
    private RectF viewBasedHighlightFrame;
    HighlightViewTagParams highlightViewTagParams;
    private @ColorInt int overlayColor;
    private @ColorInt int strokeColor;
    private float strokeWidth;
    private float borderRadius;
    private SizeF minimumRectSize;
    private float innerPadding;

    private static final PorterDuffXfermode porterDuffXfermode = new PorterDuffXfermode(PorterDuff.Mode.CLEAR);
    private static final Paint paint = new Paint(Paint.ANTI_ALIAS_FLAG);

    public HighlighterView(Context context) {
        super(context);
        setLayerType(LAYER_TYPE_HARDWARE, null);
    }

    private RectF rectToDraw() {
        if (viewBasedHighlightFrame != null && viewBasedHighlightFrame.width() > 0 && viewBasedHighlightFrame.height() > 0) {
            if (highlightViewTagParams == null) {
                RectF frame = adjustFrame(viewBasedHighlightFrame);
                return frame;
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

    private float getRadius(RectF rect) {
        float newRadius = 0;
        if (borderRadius > 0) {
            newRadius = borderRadius;
        }
        else {
            if (rect != null) {
                newRadius = Math.min(rect.width() / 2, rect.height() / 2);
            }
        }
        return newRadius;
    }

    public void setHighlightFrame(HighlightFrame frame) {
        highlightFrame = frame.toRect();
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
        invalidate();
    }

    public void setViewBasedHighlightFrame(HighlightFrame viewBasedHighlightFrame) {
        this.viewBasedHighlightFrame = viewBasedHighlightFrame.toRect();
        invalidate();
    }

    public void setHighlightViewTagParams(HighlightViewTagParams highlightViewTagParams) {
        this.highlightViewTagParams = highlightViewTagParams;
        invalidate();
    }

    @TargetApi(21)
    public void setMinimumRectSize(SizeF minimumRectSize) {
        float width = UiUtils.pxToDp(getResources(), minimumRectSize.getWidth());
        float height = UiUtils.pxToDp(getResources(), minimumRectSize.getHeight());
        this.minimumRectSize = new SizeF(width, height);
        invalidate();
    }

    public void setInnerPadding(int innerPadding) {
        this.innerPadding = UiUtils.pxToDp(getResources(), innerPadding); //innerPadding;
        invalidate();
    }

    @TargetApi(21)
    public RectF adjustFrame(RectF frame) {
        float x = frame.left;
        float y = frame.top;
        float fWidth = frame.right - frame.left;
        float fHeight = frame.bottom - frame.top;
        float width = fWidth + (innerPadding * 2);
        float height = fHeight + (innerPadding * 2);
        if (minimumRectSize != null) {
            width = width < minimumRectSize.getWidth() ? minimumRectSize.getWidth() : width;
            height = height < minimumRectSize.getHeight() ? minimumRectSize.getHeight() : height;
        }

        x = x - ((width - fWidth) / 2);
        y = y - ((height - fHeight) / 2);

        return new RectF(x, y, x + width, y + height); // float left, float top, float right, float bottom
    }

    @Override
    public void onDraw(Canvas canvas) {
        super.onDraw(canvas);

        paint.setColor(overlayColor);
        paint.setStyle(Paint.Style.FILL);
        canvas.drawPaint(paint);

        RectF rect = rectToDraw();
        float radius = getRadius(rect);

        if(rect != null) {
            paint.setXfermode(porterDuffXfermode);

            canvas.drawRoundRect(rect, radius, radius, paint);

            if (strokeWidth > 0) {
                paint.setXfermode(null);
                paint.setColor(strokeColor);
                paint.setStrokeWidth(strokeWidth);
                paint.setStyle(Paint.Style.STROKE);
                canvas.drawRoundRect(rect, radius, radius, paint);
            }
        }
    }
}
