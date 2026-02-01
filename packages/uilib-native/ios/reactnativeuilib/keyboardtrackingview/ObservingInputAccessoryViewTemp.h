//
//  ObservingInputAccessoryViewTemp.h
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

@class ObservingInputAccessoryViewTemp;

@interface ObservingInputAccessoryViewTempManager : NSObject;
+(ObservingInputAccessoryViewTempManager*)sharedInstance;
@property (nonatomic, weak) ObservingInputAccessoryViewTemp *activeObservingInputAccessoryViewTemp;
@end

@protocol ObservingInputAccessoryViewTempDelegate <NSObject>

- (void)ObservingInputAccessoryViewTempDidChangeFrame:(ObservingInputAccessoryViewTemp*)ObservingInputAccessoryViewTemp;

@optional

- (void)ObservingInputAccessoryViewTempKeyboardWillAppear:(ObservingInputAccessoryViewTemp*)ObservingInputAccessoryViewTemp keyboardDelta:(CGFloat)delta;
- (void)ObservingInputAccessoryViewTempKeyboardWillDisappear:(ObservingInputAccessoryViewTemp*)ObservingInputAccessoryViewTemp;

@end

@interface ObservingInputAccessoryViewTemp : UIView

@property (nonatomic, weak) id<ObservingInputAccessoryViewTempDelegate> delegate;

@property (nonatomic) CGFloat height;
@property (nonatomic, readonly) CGFloat keyboardHeight;
@property (nonatomic, readonly) KeyboardState keyboardState;

@end
