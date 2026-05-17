#import <UIKit/UIKit.h>

@interface SafeAreaSpacerViewLocalData : NSObject

- (instancetype)initWithInsets:(UIEdgeInsets)insets;

@property (atomic, readonly) UIEdgeInsets insets;

@end
