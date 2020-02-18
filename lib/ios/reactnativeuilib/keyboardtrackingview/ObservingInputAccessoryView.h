//
//  ObservingInputAccessoryView.h
//  ReactNativeChat
//
//  Created by Artal Druk on 11/04/2016.
//  Copyright © 2016 Wix.com All rights reserved.
//

#import <UIKit/UIKit.h>

typedef NS_ENUM(NSUInteger, KeyboardState) {
    KeyboardStateHidden,
    KeyboardStateWillShow,
    KeyboardStateShown,
    KeyboardStateWillHide
};

@class ObservingInputAccessoryView;

@interface ObservingInputAccessoryViewManager : NSObject;
+(ObservingInputAccessoryViewManager*)sharedInstance;
@property (nonatomic, weak) ObservingInputAccessoryView *activeObservingInputAccessoryView;
@end

@protocol ObservingInputAccessoryViewDelegate <NSObject>

- (void)observingInputAccessoryViewDidChangeFrame:(ObservingInputAccessoryView*)observingInputAccessoryView;

@optional

- (void)observingInputAccessoryViewKeyboardWillAppear:(ObservingInputAccessoryView*)observingInputAccessoryView keyboardDelta:(CGFloat)delta;
- (void)observingInputAccessoryViewKeyboardWillDisappear:(ObservingInputAccessoryView*)observingInputAccessoryView;

@end

@interface ObservingInputAccessoryView : UIView

@property (nonatomic, weak) id<ObservingInputAccessoryViewDelegate> delegate;

@property (nonatomic) CGFloat height;
@property (nonatomic, readonly) CGFloat keyboardHeight;
@property (nonatomic, readonly) KeyboardState keyboardState;

@end
