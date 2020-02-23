//
//  LNFrameAnimator.h
//  KeyboardTransitionDemo
//
//  Created by Leo Natan (Wix) on 11/05/2017.
//  Copyright © 2017 Wix. All rights reserved.
//

@import UIKit;

@protocol LNAnimation <NSObject>

@property (nonatomic) CGFloat progress;

@end

@interface LNViewAnimation : NSObject <LNAnimation>

@property (nonatomic, strong, readonly) UIView* view;
@property (nonatomic, strong, readonly) NSString* keyPath;
@property (nonatomic, strong, readonly) id toValue;

+ (instancetype)animationWithView:(UIView*)view keyPath:(NSString*)keyPath toValue:(id)toValue;

@end

@interface LNAnimator : NSObject

@property (nonatomic, readonly) NSTimeInterval duration;
@property (nonatomic, strong, readonly) NSArray<id<LNAnimation>>* animations;

+ (instancetype)animatorWithDuration:(NSTimeInterval)duration animations:(NSArray<id<LNAnimation>>*)animations completionHandler:(void(^)(BOOL completed))completionHandler;

- (void)start;

@end
