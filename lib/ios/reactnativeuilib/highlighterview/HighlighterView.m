
#import "HighlighterView.h"
#import <React/RCTUIManager.h>

#define kDefaultOverlayColor [UIColor colorWithWhite:0 alpha:0.8]
#define kHighlightViewFrameExpand 5

@interface HighlighterView ()
{
    RCTBridge* _bridge;
    CGRect _viewBasedHighlightFrame;
    UIView *_highlightedView;
}
@end

@implementation HighlighterView

- (id)initWithFrame:(CGRect)frame bridge:(RCTBridge*)bridge
{
    self = [super initWithFrame:frame];
    if (self)
    {
        _bridge = bridge;
        self.highlightFrame = CGRectNull;
        _viewBasedHighlightFrame = CGRectNull;
        self.backgroundColor = [UIColor clearColor];
        self.overlayColor = kDefaultOverlayColor;
    }
    return self;
}

- (void)dealloc
{
    [self clearObserver];
}

- (BOOL)isFrameValid:(CGRect)frame
{
    return !CGRectIsNull(frame) && frame.size.width > 0 && frame.size.height > 0;
}

- (void)drawRect:(CGRect)rect
{
    BOOL viewBasedHighlightFrameIsValid = [self isFrameValid:_viewBasedHighlightFrame];
    if (![self isFrameValid:self.highlightFrame] && !viewBasedHighlightFrameIsValid) {
        UIColor *color = self.overlayColor ? self.overlayColor : [UIColor clearColor];
        [color setFill];
        UIRectFill(rect);
        return;
    }

    CGContextRef context = UIGraphicsGetCurrentContext();
    CGContextClearRect(context, rect);

    CGRect highlightRect = viewBasedHighlightFrameIsValid ? _viewBasedHighlightFrame : self.highlightFrame;
    
    UIBezierPath *clipPath = [UIBezierPath bezierPathWithRect:CGRectInfinite];
    CGSize cornerRadii = CGSizeMake(highlightRect.size.width/2, highlightRect.size.height/2);
    if (self.borderRadius != nil) {
        CGFloat radius = [self.borderRadius floatValue];
        cornerRadii = CGSizeMake(radius, radius);
    }
    UIBezierPath* roundPath = [UIBezierPath bezierPathWithRoundedRect:highlightRect byRoundingCorners:UIRectCornerAllCorners cornerRadii:cornerRadii];
    [clipPath appendPath:roundPath];
    clipPath.usesEvenOddFillRule = YES;

    CGContextSaveGState(context);
    [clipPath addClip];
    [self.overlayColor setFill];
    UIRectFill(rect);
    CGContextRestoreGState(context);
    
    if (self.strokeColor && self.strokeWidth) {
        CGContextAddPath(context, roundPath.CGPath);
        [self.strokeColor setStroke];
        CGContextSetLineWidth(context, [self.strokeWidth floatValue]);
        CGContextStrokePath(context);
    }
}

-(void)setHighlightFrame:(CGRect)highlightFrame
{
    if ([self isFrameValid:highlightFrame]) {
        _highlightFrame = highlightFrame;
        [self setNeedsDisplay];
    }
}

-(void)setOverlayColor:(UIColor *)overlayColor
{
    _overlayColor = overlayColor;
    [self setNeedsDisplay];
}

-(void)setViewBasedHighlightFrameFromView:(UIView*)view {
    CGRect convertedRect = [self convertRect:view.frame fromView:view.superview];
    _viewBasedHighlightFrame = CGRectMake(convertedRect.origin.x - kHighlightViewFrameExpand, convertedRect.origin.y - kHighlightViewFrameExpand, convertedRect.size.width + kHighlightViewFrameExpand * 2,convertedRect.size.height + kHighlightViewFrameExpand * 2);
    [self setNeedsDisplay];
}

-(void)setHighlightViewTag:(NSNumber *)highlightViewTag
{
    if (highlightViewTag) {
        UIView *view = [_bridge.uiManager viewForReactTag:highlightViewTag];
        if (view != nil) {
            if (view.frame.size.width == 0 || view.frame.size.height == 0) {
                _highlightedView = view;
                [_highlightedView.layer addObserver:self forKeyPath:@"frame" options:NSKeyValueObservingOptionNew context:nil];
                [_highlightedView.layer addObserver:self forKeyPath:@"bounds" options:NSKeyValueObservingOptionNew context:NULL];
            } else {
                [self setViewBasedHighlightFrameFromView:view];
            }
        }
    }
}

#pragma mark - KVO

-(void)clearObserver
{
    if (_highlightedView != nil) {
        [_highlightedView.layer removeObserver:self forKeyPath:@"frame"];
        [_highlightedView.layer removeObserver:self forKeyPath:@"bounds"];
        _highlightedView = nil;
    }
}

- (void)observeValueForKeyPath:(NSString *)keyPath ofObject:(id)object change:(NSDictionary *)change context:(void *)context
{
    if ((object == _highlightedView.layer) && ([keyPath isEqualToString:@"frame"] || [keyPath isEqualToString:@"bounds"]))
    {
        CGRect frame = [change[NSKeyValueChangeNewKey] CGRectValue];
        if (frame.size.width > 0 && frame.size.height > 0) {
            dispatch_async(dispatch_get_main_queue(), ^{
                [self setViewBasedHighlightFrameFromView:_highlightedView];
                [self clearObserver];
            });
        }
    }
}

@end
