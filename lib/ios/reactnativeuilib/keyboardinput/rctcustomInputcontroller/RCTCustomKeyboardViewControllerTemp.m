//
//  RCTCustomKeyboardViewControllerTemp.m
//
//  Created by Leo Natan (Wix) on 12/12/2016.
//  Copyright © 2016 Leo Natan. All rights reserved.
//

#import "RCTCustomKeyboardViewControllerTemp.h"

#if __has_include(<KeyboardTrackingView/ObservingInputAccessoryViewTemp.h>)
#import <KeyboardTrackingView/ObservingInputAccessoryViewTemp.h>
#define ObservingInputAccessoryViewTemp_IsAvailable true
#endif

@interface RCTCustomKeyboardViewControllerTemp ()
@property (nonatomic, assign, getter=isUsingSafeArea) BOOL useSafeArea;
@end

@implementation RCTCustomKeyboardViewControllerTemp

- (instancetype)initWithUsingSafeArea:(BOOL)useSafeArea
{
    self = [super init];
    
    if(self)
    {
        self.inputView = [[UIInputView alloc] initWithFrame:CGRectZero inputViewStyle:UIInputViewStyleKeyboard];
        
        self.heightConstraint = [self.inputView.heightAnchor constraintEqualToConstant:0];
        self.useSafeArea = useSafeArea;
        
#ifdef ObservingInputAccessoryViewTemp_IsAvailable
        ObservingInputAccessoryViewTemp *activeObservingInputAccessoryViewTemp = [ObservingInputAccessoryViewTempManager sharedInstance].activeObservingInputAccessoryViewTemp;
        if (activeObservingInputAccessoryViewTemp != nil)
        {
            CGFloat keyboardHeight = activeObservingInputAccessoryViewTemp.keyboardHeight;
            if (keyboardHeight > 0)
            {
                self.heightConstraint.constant = keyboardHeight;
                [self setAllowsSelfSizing:YES];
            }
        }
#endif
        //!!!
        self.view.translatesAutoresizingMaskIntoConstraints = NO;
    }
    
    return self;
}

- (void) setAllowsSelfSizing:(BOOL)allowsSelfSizing
{
    if(self.inputView.allowsSelfSizing != allowsSelfSizing)
    {
        self.inputView.allowsSelfSizing = allowsSelfSizing;
        self.heightConstraint.active = allowsSelfSizing;
    }
}

-(void)setRootView:(RCTRootView*)rootView
{
    if(_rootView != nil)
    {
        [_rootView removeFromSuperview];
    }
    
    _rootView = rootView;
    _rootView.translatesAutoresizingMaskIntoConstraints = NO;
    [self.inputView addSubview:_rootView];
        
    [self updateRootViewConstraints];
    [self.inputView setNeedsLayout];
}

- (void)updateRootViewConstraints {
    [_rootView.leadingAnchor constraintEqualToAnchor:self.view.leadingAnchor].active = YES;
    [_rootView.trailingAnchor constraintEqualToAnchor:self.view.trailingAnchor].active = YES;
    [_rootView.topAnchor constraintEqualToAnchor:self.view.topAnchor].active = YES;
    
    NSLayoutYAxisAnchor *yAxisAnchor = [self bottomLayoutAnchorUsingSafeArea:self.isUsingSafeArea];
    [_rootView.bottomAnchor constraintEqualToAnchor:yAxisAnchor].active = YES;
}

- (NSLayoutYAxisAnchor *)bottomLayoutAnchorUsingSafeArea:(BOOL)useSafeArea {
    NSLayoutYAxisAnchor *yAxisAnchor = self.view.bottomAnchor;
    
    if (!useSafeArea) {
        return yAxisAnchor;
    }
    
#if __IPHONE_OS_VERSION_MAX_ALLOWED > __IPHONE_10_3
    if (@available(iOS 11.0, *)) {
        yAxisAnchor = self.view.safeAreaLayoutGuide.bottomAnchor;
    }
#endif
    return yAxisAnchor;
}

@end
