//
//  LNFrameAnimator.h
//  KeyboardTransitionDemo
//
//  Created by Leo Natan (Wix) on 11/05/2017.
//  Copyright © 2017 Wix. All rights reserved.
//

@import UIKit;

@protocol LNAnimationTemp <NSObject>

@property (nonatomic) CGFloat progress;

@end

@interface LNViewAnimationTemp : NSObject <LNAnimationTemp>

@property (nonatomic, strong, readonly) UIView* view;
@property (nonatomic, strong, readonly) NSString* keyPath;
@property (nonatomic, strong, readonly) id toValue;

+ (instancetype)animationWithView:(UIView*)view keyPath:(NSString*)keyPath toValue:(id)toValue;

@end

@interface LNAnimatorTemp : NSObject

@property (nonatomic, readonly) NSTimeInterval duration;
@property (nonatomic, strong, readonly) NSArray<id<LNAnimationTemp>>* animations;

+ (instancetype)animatorWithDuration:(NSTimeInterval)duration animations:(NSArray<id<LNAnimationTemp>>*)animations completionHandler:(void(^)(BOOL completed))completionHandler;

- (void)start;

@end
