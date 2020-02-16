//
//  RCTCustomInputController.m
//
//  Created by Leo Natan (Wix) on 13/12/2016.
//  Copyright © 2016 Leo Natan. All rights reserved.
//

#import "RCTCustomInputController.h"
#import "RCTCustomKeyboardViewController.h"

#import <React/RCTUIManager.h>
#import <objc/runtime.h>

#import "LNAnimator.h"

#define kHlperViewTag 0x1f1f1f

NSString *const RCTCustomInputControllerKeyboardResigendEvent = @"kbdResigned";

@protocol _WXInputHelperViewDelegate <NSObject>
-(void)_WXInputHelperViewResignFirstResponder:(UIView*)wxInputHelperView;
@end

@interface _WXInputHelperView : UIView

@property (nullable, nonatomic, readwrite, strong) UIInputViewController *inputViewController;
@property (nonatomic, weak) id<_WXInputHelperViewDelegate> delegate;
@property (nullable, readwrite, strong) UIView *inputAccessoryView;
@property (nonatomic) BOOL keepInSuperviewOnResign;

@end

@implementation _WXInputHelperView

- (BOOL)canBecomeFirstResponder
{
    return YES;
}

- (BOOL)resignFirstResponder
{
    BOOL rv = [super resignFirstResponder];
    
    if (!_keepInSuperviewOnResign)
    {
        [self removeFromSuperview];
        
        if(self.delegate && [self.delegate respondsToSelector:@selector(_WXInputHelperViewResignFirstResponder:)])
        {
            [self.delegate _WXInputHelperViewResignFirstResponder:self];
        }

    }
    
    return rv;
}

@end


@interface RCTCustomInputController () <_WXInputHelperViewDelegate> {
    UIWindow *_fullScreenWindow;
    BOOL _performingExpandTransition;
}

@property(nonatomic) BOOL customInputComponentPresented;

@end

@implementation RCTCustomInputController

+ (BOOL)requiresMainQueueSetup
{
    return YES;
}

- (dispatch_queue_t)methodQueue
{
    return dispatch_get_main_queue();
}

- (NSArray<NSString *> *)supportedEvents
{
    return @[RCTCustomInputControllerKeyboardResigendEvent];
}

RCT_EXPORT_MODULE(CustomInputController)

- (instancetype)init
{
    self = [super init];
    if (self)
    {
        self.customInputComponentPresented = NO;
    }
    return self;
}

-(UIView*)getFirstResponder:(UIView*)view
{
    if (view == nil || [view isFirstResponder])
    {
        return view;
    }
    
    for (UIView *subview in view.subviews)
    {
        UIView *firstResponder = [self getFirstResponder:subview];
        if(firstResponder != nil)
        {
            return firstResponder;
        }
    }
    return nil;
}

RCT_EXPORT_METHOD(presentCustomInputComponent:(nonnull NSNumber*)inputFieldTag params:(nonnull NSDictionary*)params)
{
    RCTBridge* bridge = [self.bridge valueForKey:@"parentBridge"];
    if(bridge == nil)
    {
        return;
    }
    
    UIView* inputField = [self.bridge.uiManager viewForReactTag:inputFieldTag];
    NSDictionary *initialProps = params[@"initialProps"];
    RCTRootView* rv = [[RCTRootView alloc] initWithBridge:bridge moduleName:params[@"component"] initialProperties:initialProps];
    if(initialProps != nil && initialProps[@"backgroundColor"] != nil)
    {
        UIColor *backgroundColor = [RCTConvert UIColor:initialProps[@"backgroundColor"]];
        if(backgroundColor != nil)
        {
            rv.backgroundColor = backgroundColor;
        }
    }
    
    self.customInputComponentPresented = NO;
    
    RCTCustomKeyboardViewController* customKeyboardController = [[RCTCustomKeyboardViewController alloc] init];
    customKeyboardController.rootView = rv;
    
    _WXInputHelperView* helperView = [[_WXInputHelperView alloc] initWithFrame:CGRectZero];
    helperView.tag = kHlperViewTag;
    helperView.delegate = self;
    
    if ([inputField isKindOfClass:NSClassFromString(@"RCTTextView")])
    {
        UITextView *textView = nil;
        Ivar backedTextInputIvar = class_getInstanceVariable([inputField class], "_backedTextInput");
        if (backedTextInputIvar != NULL)
        {
            textView = [inputField valueForKey:@"_backedTextInput"];
        }
        else if([inputField isKindOfClass:[UITextView class]])
        {
            textView = (UITextView*)inputField;
        }
        
        if (textView != nil)
        {
            helperView.inputAccessoryView = textView.inputAccessoryView;
        }
    }
    else if ([inputField isKindOfClass:NSClassFromString(@"RCTUITextView")] && [inputField isKindOfClass:[UITextView class]])
    {
        UITextView *textView = (UITextView*)inputField;
        helperView.inputAccessoryView = textView.inputAccessoryView;
    }
    else if([inputField isKindOfClass:NSClassFromString(@"RCTMultilineTextInputView")])
    {
        Ivar backedTextInputIvar = class_getInstanceVariable([inputField class], "_backedTextInputView");
        if (backedTextInputIvar != NULL)
        {
            id textViewObj = [inputField valueForKey:@"_backedTextInputView"];
            if ([textViewObj isKindOfClass:[UITextView class]])
            {
                UITextView *textView = (UITextView*)textViewObj;
                helperView.inputAccessoryView = textView.inputAccessoryView;
            }
        }
    }
    else
    {
        UIView *firstResponder = [self getFirstResponder:inputField];
        helperView.inputAccessoryView = firstResponder.inputAccessoryView;
    }
    
    [helperView reloadInputViews];
    
    helperView.backgroundColor = [UIColor clearColor];
    [inputField.superview addSubview:helperView];
    [inputField.superview sendSubviewToBack:helperView];
    
    helperView.inputViewController = customKeyboardController;
    [helperView reloadInputViews];
    [helperView becomeFirstResponder];
    
    self.customInputComponentPresented = YES;
}

RCT_EXPORT_METHOD(resetInput:(nonnull NSNumber*)inputFieldTag)
{
    self.customInputComponentPresented = NO;
    
    UIView* inputField = [self.bridge.uiManager viewForReactTag:inputFieldTag];
    if(inputField != nil)
    {
        _WXInputHelperView* helperView = [inputField.superview viewWithTag:kHlperViewTag];
        if(helperView != nil && [helperView isFirstResponder])
        {//restore the first responder only if it was already the first responder to prevent the keyboard from opening again if not necessary
            [inputField reactFocus];
        }
    }
}

RCT_EXPORT_METHOD(dismissKeyboard)
{
    UIView *firstResponder = [self getFirstResponder:[UIApplication sharedApplication].delegate.window];
    if(firstResponder != nil)
    {
        [firstResponder resignFirstResponder];
    }
}

-(void)changeKeyboardHeightForInput:(nonnull NSNumber*)inputFieldTag newHeight:(CGFloat)newHeight
{
    UIView* inputField = [self.bridge.uiManager viewForReactTag:inputFieldTag];
    if(inputField != nil)
    {
        _WXInputHelperView* helperView = [inputField.superview viewWithTag:kHlperViewTag];
        if(helperView != nil)
        {
            [((RCTCustomKeyboardViewController*)helperView.inputViewController) setAllowsSelfSizing:YES];
            ((RCTCustomKeyboardViewController*)helperView.inputViewController).heightConstraint.constant = newHeight;
            
            UIInputView *inputView = helperView.inputViewController.inputView;
            [inputView setNeedsUpdateConstraints];
            [UIView animateWithDuration:0.55
                                  delay:0
                 usingSpringWithDamping:500.0
                  initialSpringVelocity:0
                                options:UIViewAnimationOptionCurveEaseOut
                             animations:^{ [inputView layoutIfNeeded]; }
                             completion:nil];
        }
    }
}

-(UIColor*)reactViewAvgColor:(RCTRootView*)rootView
{
    if (rootView.frame.size.width == 0 || rootView.frame.size.height == 0)
    {
        return [UIColor clearColor];
    }
    
    UIGraphicsBeginImageContextWithOptions(CGSizeMake(1, 1), YES, 0);
    CGContextTranslateCTM(UIGraphicsGetCurrentContext(), 0, -(rootView.frame.size.height - 1));
    [rootView.layer renderInContext:UIGraphicsGetCurrentContext()];
    UIImage *image = UIGraphicsGetImageFromCurrentImageContext();
    UIGraphicsEndImageContext();
    
    CFDataRef pixelData = CGDataProviderCopyData(CGImageGetDataProvider(image.CGImage));
    const UInt8* data = CFDataGetBytePtr(pixelData);
    CFRelease(pixelData);
    
    //after scale defaults to bgr
    CGFloat red = data[2] / 255.0f,
    green = data[1] / 255.0f,
    blue = data[0] / 255.0f,
    alpha = data[3] / 255.0f;
    
    UIColor *color = [UIColor colorWithRed:red green:green blue:blue alpha:alpha];
    return color;
}

RCT_EXPORT_METHOD(expandFullScreenForInput:(nonnull NSNumber*)inputFieldTag)
{
    if (_fullScreenWindow != nil || _performingExpandTransition)
    {
        return;
    }
    
    UIView* inputField = [self.bridge.uiManager viewForReactTag:inputFieldTag];
    if(inputField != nil)
    {
        _WXInputHelperView* helperView = [inputField.superview viewWithTag:kHlperViewTag];
        if(helperView != nil)
        {
            _performingExpandTransition = YES;
            
            helperView.keepInSuperviewOnResign = YES;
            
            RCTCustomKeyboardViewController *customKeyboardViewController = (RCTCustomKeyboardViewController*)helperView.inputViewController;
            RCTRootView *rv = customKeyboardViewController.rootView;
            UIInputView *inputView = helperView.inputViewController.inputView;
            
            _fullScreenWindow = [[UIWindow alloc] initWithFrame:[inputView.window convertRect:inputView.bounds fromView:inputView]];
            UIColor *originalBackgroundColor = rv.backgroundColor;
            rv.backgroundColor = [self reactViewAvgColor:rv];
            
            customKeyboardViewController.rootView = nil;
            
            UIViewController *vc = [UIViewController new];
            vc.view = rv;
            
            inputView.window.hidden = YES;
            
            [UIView performWithoutAnimation:^{
                _fullScreenWindow.hidden = NO;
                _fullScreenWindow.rootViewController = vc;
                
                [_fullScreenWindow layoutIfNeeded];
            }];

            [[LNAnimator animatorWithDuration:0.5
                                   animations:@[[LNViewAnimation animationWithView:_fullScreenWindow keyPath:@"frame" toValue:[NSValue valueWithCGRect:[UIScreen mainScreen].bounds]]]
                            completionHandler:^(BOOL completed)
            {
                [UIView performWithoutAnimation:^{
                    inputView.window.hidden = NO;
                    [helperView resignFirstResponder];
                    [_fullScreenWindow makeKeyAndVisible];
                    
                    rv.backgroundColor = originalBackgroundColor;
                }];
                _performingExpandTransition = NO;
            }] start];
        }
    }
}

RCT_EXPORT_METHOD(resetSizeForInput:(nonnull NSNumber*)inputFieldTag)
{
    if (_fullScreenWindow == nil || _performingExpandTransition)
    {
        return;
    }
    
    UIView* inputField = [self.bridge.uiManager viewForReactTag:inputFieldTag];
    if(inputField != nil)
    {
        _WXInputHelperView* helperView = [inputField.superview viewWithTag:kHlperViewTag];
        if(helperView != nil)
        {
            _performingExpandTransition = YES;
            
            __block CGRect keyboardTargetFrame;
            UIInputView *inputView = helperView.inputViewController.inputView;
            
            [UIView performWithoutAnimation:^{
                [helperView.window makeKeyWindow];
                [helperView becomeFirstResponder];
                [helperView layoutIfNeeded];
                
                keyboardTargetFrame = [inputView.window convertRect:inputView.bounds fromView:inputView];
            }];
            
            _fullScreenWindow.windowLevel = inputView.window.windowLevel + 1;
            
            [_fullScreenWindow layoutIfNeeded];
            [_fullScreenWindow endEditing:YES];
            
            [[LNAnimator animatorWithDuration:0.5
                                   animations:@[[LNViewAnimation animationWithView:_fullScreenWindow keyPath:@"frame" toValue:[NSValue valueWithCGRect:keyboardTargetFrame]]]
                            completionHandler:^(BOOL completed)
            {
                RCTCustomKeyboardViewController *customKeyboardViewController = (RCTCustomKeyboardViewController*)helperView.inputViewController;
                RCTRootView *rv = (RCTRootView*)_fullScreenWindow.rootViewController.view;
                
                [UIView performWithoutAnimation:^{
                    
                    _fullScreenWindow.rootViewController.view = [UIView new];
                    customKeyboardViewController.rootView = rv;
                    
                    _fullScreenWindow.hidden = YES;
                    _fullScreenWindow = nil;
                }];
                
                helperView.keepInSuperviewOnResign = NO;
                _performingExpandTransition = NO;
            }] start];
        }
    }
}

#pragma mark - _WXInputHelperViewDelegate methods

-(void)_WXInputHelperViewResignFirstResponder:(UIView*)wxInputHelperView
{
    if(self.customInputComponentPresented)
    {
        [self sendEventWithName:RCTCustomInputControllerKeyboardResigendEvent body:nil];
    }
    self.customInputComponentPresented = NO;
}

@end
