#import "SafeAreaSpacerView.h"
#import "SafeAreaSpacerViewLocalData.h"
#import <React/RCTBridge.h>
#import <React/RCTUIManager.h>

@implementation SafeAreaSpacerView
{
    __weak RCTBridge *_bridge;
    UIEdgeInsets _currentSafeAreaInsets;
        //these flags are used to prevent an endless cycle of safe area insets update. setting the view height changes it's frame, and in some cases `reactSetFrame` causes more and more updates with varying sizes
    BOOL _ignoreNextInsetUpdate;
    BOOL _insetsWereUpdated;
}

- (instancetype)initWithBridge:(RCTBridge *)bridge
{
    if (self = [super initWithFrame:CGRectZero])
    {
        _bridge = bridge;
        _ignoreNextInsetUpdate = NO;
        _insetsWereUpdated = NO;
    }
    return self;
}

- (void)reactSetFrame:(CGRect)frame
{
    if (self.window != nil && _insetsWereUpdated)
    {
        _ignoreNextInsetUpdate = YES;
        dispatch_async(dispatch_get_main_queue(), ^{
           _ignoreNextInsetUpdate = NO;
        });
    }
    
    [super reactSetFrame:frame];
}

#if defined(__IPHONE_OS_VERSION_MAX_ALLOWED) && __IPHONE_OS_VERSION_MAX_ALLOWED >= 110000 /* __IPHONE_11_0 */

static BOOL UIEdgeInsetsEqualToEdgeInsetsWithThreshold(UIEdgeInsets insets1, UIEdgeInsets insets2, CGFloat threshold)
{
    return
    ABS(insets1.left - insets2.left) <= threshold &&
    ABS(insets1.right - insets2.right) <= threshold &&
    ABS(insets1.top - insets2.top) <= threshold &&
    ABS(insets1.bottom - insets2.bottom) <= threshold;
}

- (void)safeAreaInsetsDidChange
{
    if (![self respondsToSelector:@selector(safeAreaInsets)] || _ignoreNextInsetUpdate)
    {
        _ignoreNextInsetUpdate = NO;
        _insetsWereUpdated = NO;
        return;
    }
    
    UIEdgeInsets safeAreaInsets = self.safeAreaInsets;
    
    if (UIEdgeInsetsEqualToEdgeInsetsWithThreshold(safeAreaInsets, _currentSafeAreaInsets, 1.0 / RCTScreenScale()))
    {
        return;
    }
    
    _currentSafeAreaInsets = safeAreaInsets;
    _insetsWereUpdated = YES;
    
    SafeAreaSpacerViewLocalData *localData = [[SafeAreaSpacerViewLocalData alloc] initWithInsets:safeAreaInsets];
    [_bridge.uiManager setLocalData:localData forView:self];
}

#endif

@end

