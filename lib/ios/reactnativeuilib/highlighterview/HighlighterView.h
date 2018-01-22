#import <UIKit/UIKit.h>
#import <React/RCTBridge.h>

@interface HighlighterView : UIView

- (id)initWithFrame:(CGRect)frame bridge:(RCTBridge*)bridge;

@property (nonatomic) CGRect highlightFrame;
@property (nonatomic, strong) NSNumber *borderRadius;
@property (nonatomic, strong) UIColor *overlayColor;
@property (nonatomic, strong) UIColor *strokeColor;
@property (nonatomic, strong) NSNumber *strokeWidth;

@end
