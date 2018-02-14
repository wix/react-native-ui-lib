
#import "HighlighterView.h"
#import <React/RCTUIManager.h>

#define kDefaultOverlayColor [UIColor colorWithWhite:0 alpha:0.8]

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
        self.minimumRectSize = CGSizeZero;
        self.innerPadding = 0;
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

-(CGRect)adjustFrame:(CGRect)frame {
    CGFloat x = frame.origin.x;
    CGFloat y = frame.origin.y;
    CGFloat width = frame.size.width + self.innerPadding * 2;
    CGFloat height = frame.size.height + self.innerPadding * 2;
    
    width = width < self.minimumRectSize.width ? self.minimumRectSize.width : width;
    height = height < self.minimumRectSize.height ? self.minimumRectSize.height : height;
    x = x - ((width - frame.size.width) / 2);
    y = y - ((height - frame.size.height) / 2);
    
    return CGRectMake(x, y, width, height);
}

-(CGRect)getHighlightRect
{
    CGRect highlightRect = self.highlightFrame;
    if ([self isFrameValid:_viewBasedHighlightFrame]) {
//        highlightRect = _viewBasedHighlightFrame;
        highlightRect = [self adjustFrame: _viewBasedHighlightFrame];
        if (_highlightViewTagParams != nil) {
            id padding = _highlightViewTagParams[@"padding"];
            if (padding != nil) {
                if ([padding isKindOfClass:[NSNumber class]]) {
                    CGFloat paddingValue = [(NSNumber*)padding floatValue];
                    highlightRect = CGRectMake(_viewBasedHighlightFrame.origin.x - paddingValue,
                                               _viewBasedHighlightFrame.origin.y - paddingValue,
                                               _viewBasedHighlightFrame.size.width + paddingValue * 2,
                                               _viewBasedHighlightFrame.size.height + paddingValue * 2);
                } else if ([padding isKindOfClass:[NSDictionary class]]) {
                    NSDictionary *paddingDic = (NSDictionary*)padding;
                    CGFloat top = [paddingDic[@"top"] floatValue];
                    CGFloat left = [paddingDic[@"left"] floatValue];
                    CGFloat bottom = [paddingDic[@"bottom"] floatValue];
                    CGFloat right = [paddingDic[@"right"] floatValue];
                    highlightRect = CGRectMake(_viewBasedHighlightFrame.origin.x - left,
                                               _viewBasedHighlightFrame.origin.y - top,
                                               _viewBasedHighlightFrame.size.width + right + left,
                                               _viewBasedHighlightFrame.size.height + bottom + top);
                }
            }
            
            NSDictionary *offset = _highlightViewTagParams[@"offset"];
            if (offset != nil) {
                highlightRect = CGRectOffset(highlightRect, [offset[@"x"] floatValue], [offset[@"y"] floatValue]);
            }
        }
    }
    return highlightRect;
}

- (CGSize)getCornerRadiiForHighlightRect:(CGRect)highlightRect {
    CGSize cornerRadii = CGSizeMake(highlightRect.size.width/2, highlightRect.size.height/2);
    if (self.borderRadius != nil) {
        CGFloat radius = [self.borderRadius floatValue];
        cornerRadii = CGSizeMake(radius, radius);
    }
    return cornerRadii;
}

- (void)drawRect:(CGRect)rect
{
    if (![self isFrameValid:self.highlightFrame] && ![self isFrameValid:_viewBasedHighlightFrame]) {
        UIColor *color = self.overlayColor ? self.overlayColor : [UIColor clearColor];
        [color setFill];
        UIRectFill(rect);
        return;
    }

    CGContextRef context = UIGraphicsGetCurrentContext();
    CGContextClearRect(context, rect);

    CGRect highlightRect = [self getHighlightRect];
    CGSize cornerRadii = [self getCornerRadiiForHighlightRect:highlightRect];
    
    UIBezierPath *clipPath = [UIBezierPath bezierPathWithRect:CGRectInfinite];
    UIBezierPath *roundPath = [UIBezierPath bezierPathWithRoundedRect:highlightRect byRoundingCorners:UIRectCornerAllCorners cornerRadii:cornerRadii];
    [clipPath appendPath:roundPath];
    clipPath.usesEvenOddFillRule = YES;

    CGContextSaveGState(context);
    [clipPath addClip];
    [self.overlayColor setFill];
    UIRectFill(rect);
    
    if (self.strokeColor && self.strokeWidth) {
        CGContextAddPath(context, roundPath.CGPath);
        [self.strokeColor setStroke];
        CGContextSetLineWidth(context, [self.strokeWidth floatValue]);
        CGContextStrokePath(context);
    }
    
    CGContextRestoreGState(context);
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

-(void)setMinimumRectSize:(CGSize)minimumRectSize
{
    _minimumRectSize = minimumRectSize;
    [self setNeedsDisplay];
}

-(void)setInnerPadding:(CGFloat)innerPadding
{
    _innerPadding = innerPadding;
    [self setNeedsDisplay];
}

-(void)setViewBasedHighlightFrameFromView:(UIView*)view {
    _viewBasedHighlightFrame = [self convertRect:view.frame fromView:view.superview];
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

-(void)setHighlightViewTagParams:(NSDictionary*)highlightViewTagParams
{
    _highlightViewTagParams = highlightViewTagParams;
    [self setNeedsDisplay];
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
