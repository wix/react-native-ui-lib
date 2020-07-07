//
//  RCTCustomKeyboardViewControllerTemp.h
//
//  Created by Leo Natan (Wix) on 12/12/2016.
//  Copyright © 2016 Leo Natan. All rights reserved.
//

#import <UIKit/UIKit.h>

#if __has_include(<React/RCTRootView.h>)
#import <React/RCTRootView.h>
#else
#import "RCTRootView.h"
#endif

@interface RCTCustomKeyboardViewControllerTemp : UIInputViewController

- (void) setAllowsSelfSizing:(BOOL)allowsSelfSizing;
- (instancetype)initWithUsingSafeArea:(BOOL)useSafeArea;

@property (nonatomic, strong) NSLayoutConstraint *heightConstraint;
@property (nonatomic, strong) RCTRootView *rootView;

@end
