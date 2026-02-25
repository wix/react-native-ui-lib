#import "SafeAreaSpacerViewLocalData.h"

@implementation SafeAreaSpacerViewLocalData

- (instancetype)initWithInsets:(UIEdgeInsets)insets
{
    if (self = [super init]) {
        _insets = insets;
    }
    
    return self;
}

@end
