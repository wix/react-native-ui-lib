//
//  LNFrameAnimator.m
//  KeyboardTransitionDemo
//
//  Created by Leo Natan (Wix) on 11/05/2017.
//  Copyright © 2017 Wix. All rights reserved.
//

#import "LNAnimatorTemp.h"

#import "LNInterpolation.h"

@implementation LNViewAnimationTemp
{
    id _fromValue;
}

@synthesize progress = _progress;

- (instancetype)init
{
    [NSException raise:NSInvalidArgumentException format:@"Use animationWithView:keyPath:toValue: to create LNViewAnimationTemp objects."];
    return nil;
}

- (instancetype)_init
{
    return [super init];
}

+ (instancetype)animationWithView:(UIView*)view keyPath:(NSString*)keyPath toValue:(id)toValue
{
    LNViewAnimationTemp* rv = [[LNViewAnimationTemp alloc] _init];
    
    if(rv)
    {
        rv->_view = view;
        rv->_keyPath = keyPath;
        rv->_toValue = toValue;
        rv->_fromValue = [view valueForKeyPath:keyPath];
    }
    
    return rv;
}

- (void)setProgress:(CGFloat)progress
{
    _progress = progress;
    [_view setValue:[_fromValue interpolateToValue:_toValue progress:progress] forKeyPath:_keyPath];
    [_view layoutIfNeeded];
}

@end

@implementation LNAnimatorTemp
{
    void (^_completionHandler)(BOOL);
    CADisplayLink* _displayLink;
    CFTimeInterval _previousFrameTimestamp;
    CFTimeInterval _elapsedTime;
}

- (instancetype)init
{
    [NSException raise:NSInvalidArgumentException format:@"Use animationWithView:keyPath:toValue: to create LNViewAnimationTemp objects."];
    return nil;
}

- (instancetype)_init
{
    return [super init];
}

+ (instancetype)animatorWithDuration:(NSTimeInterval)duration animations:(NSArray<id<LNAnimationTemp>>*)animations completionHandler:(void(^)(BOOL completed))completionHandler
{
    LNAnimatorTemp* rv = [[LNAnimatorTemp alloc] _init];
    if(rv)
    {
        rv->_duration = duration;
        
        NSAssert(animations.count > 0, @"At least one animation must be provided.");
        
        rv->_animations = animations;
        rv->_completionHandler = completionHandler;
    }
    
    return rv;
}

- (void)start
{
    _displayLink = [CADisplayLink displayLinkWithTarget:self selector:@selector(_displayLinkDidTick)];
//    _displayLink.preferredFramesPerSecond = 30;
    [_displayLink addToRunLoop:[NSRunLoop mainRunLoop] forMode:NSRunLoopCommonModes];
}

- (void)_displayLinkDidTick
{
    if(_previousFrameTimestamp != 0)
    {
        _elapsedTime += _displayLink.timestamp - _previousFrameTimestamp;
    }
    _previousFrameTimestamp = _displayLink.timestamp;
    
    [_animations enumerateObjectsUsingBlock:^(id<LNAnimationTemp>  _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
        obj.progress = MIN(_elapsedTime / _duration, 1.0);
    }];
    
    if(_elapsedTime / _duration >= 1.0)
    {
        [_displayLink invalidate];
        _displayLink = nil;
        
        if(_completionHandler)
        {
            _completionHandler(YES);
        }
    }
}

@end
