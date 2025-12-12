#import "SafeAreaManager.h"
#import <UIKit/UIKit.h>
#import <objc/runtime.h>

static NSString *const UIWindowSafeAreaInsetsDidChangeNotification = @"SafeAreaManager.UIWindowSafeAreaInsetsDidChangeNotification";
static NSString *const SafeAreaInsetsDidChangeEvent = @"SafeAreaInsetsDidChangeEvent";
static id (*_swz_safeAreaInsetsDidChange_orig)(id self, SEL _cmd);

@interface SafeAreaManager () {
    UIEdgeInsets _cachedSafeAreaInsets;
}
@end

@implementation SafeAreaManager

RCT_EXPORT_MODULE()

+ (BOOL)requiresMainQueueSetup
{
    return YES;
}

- (dispatch_queue_t)methodQueue {
    return dispatch_get_main_queue();
}

- (NSArray<NSString *> *)supportedEvents {
    return @[SafeAreaInsetsDidChangeEvent];
}

- (instancetype)init {
    self = [super init];
    if (self) {
        _cachedSafeAreaInsets = [self getCurrentSafeAreaInsets];
        [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(windowSafeAreaDidChange) name:UIWindowSafeAreaInsetsDidChangeNotification object:nil];
        [self applySizzles];
    }
    return self;
}

-(void)dealloc {
    [[NSNotificationCenter defaultCenter] removeObserver:self];
}

- (void)windowSafeAreaDidChange {
    UIEdgeInsets currentSafeAreaInsets = [self getCurrentSafeAreaInsets];
    if (!UIEdgeInsetsEqualToEdgeInsets(currentSafeAreaInsets, _cachedSafeAreaInsets)) {
        _cachedSafeAreaInsets = currentSafeAreaInsets;
        
        NSUInteger listenerCount = [[self valueForKey:@"_listenerCount"] unsignedIntegerValue];
        if (listenerCount > 0) {
            [self sendEventWithName:SafeAreaInsetsDidChangeEvent body:[self getResultDicFromSafeArea:_cachedSafeAreaInsets]];
        }
    }
}

-(UIEdgeInsets)getCurrentSafeAreaInsets {
    UIEdgeInsets safeAreaInsets = UIEdgeInsetsZero;
#if __IPHONE_OS_VERSION_MAX_ALLOWED > __IPHONE_10_3
    if (@available(iOS 11.0, *)) {
        safeAreaInsets = [UIApplication sharedApplication].keyWindow.safeAreaInsets;
    }
#endif
    return safeAreaInsets;
}

#pragma mark - swizzles

- (void)applySizzles {
#if __IPHONE_OS_VERSION_MAX_ALLOWED > __IPHONE_10_3
    if (@available(iOS 11.0, *)) {
        static dispatch_once_t onceToken;
        dispatch_once(&onceToken, ^{
            Method originalMethod = class_getInstanceMethod([UIWindow class], @selector(safeAreaInsetsDidChange));
            Method replacementMethod = class_getInstanceMethod([SafeAreaManager class], @selector(_swz_safeAreaInsetsDidChange));
            _swz_safeAreaInsetsDidChange_orig = (void*)method_getImplementation(originalMethod);
            method_exchangeImplementations(originalMethod, replacementMethod);
        });
    }
#endif
}

- (void)_swz_safeAreaInsetsDidChange {
    _swz_safeAreaInsetsDidChange_orig(self, _cmd);
    [[NSNotificationCenter defaultCenter] postNotificationName:UIWindowSafeAreaInsetsDidChangeNotification object:nil];
}

#pragma mark - helper methods

- (NSDictionary*)getResultDicFromSafeArea:(UIEdgeInsets)safeAreaInsets {
    return @{@"top": @(safeAreaInsets.top),
             @"left": @(safeAreaInsets.left),
             @"bottom": @(safeAreaInsets.bottom),
             @"right": @(safeAreaInsets.right)
             };
}

#pragma mark - public API

RCT_EXPORT_METHOD(getSafeAreaInsets:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    UIEdgeInsets safeAreaInsets = [self getCurrentSafeAreaInsets];
    resolve([self getResultDicFromSafeArea:safeAreaInsets]);
}

@end
