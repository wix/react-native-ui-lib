#import "SafeAreaSpacerShadowView.h"
#import "SafeAreaSpacerViewLocalData.h"

@implementation SafeAreaSpacerShadowView

- (void)setLocalData:(SafeAreaSpacerViewLocalData *)localData
{
    UIEdgeInsets insets = localData.insets;
    
    super.height = (YGValue){insets.bottom + insets.top, YGUnitPoint};
    [self didSetProps:@[@"height"]];
}

/**
 * Removing support for setting height from any outside code
 * to prevent interferring this with local data.
 */
- (void)setHeight:(YGValue)height {}

@end
