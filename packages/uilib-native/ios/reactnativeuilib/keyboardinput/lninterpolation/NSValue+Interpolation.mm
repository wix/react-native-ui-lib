//
//  NSValue+Interpolation.mm
//
//  Created by Leo Natan on 01/10/2016.
//  Copyright © 2016 Leo Natan. All rights reserved.
//

#import "NSValue+Interpolation.h"

#if __has_include(<CoreGraphics/CoreGraphics.h>)
#import <CoreGraphics/CoreGraphics.h>
#endif

#if __has_include(<UIKit/UIKit.h>)
#import <UIKit/UIKit.h>
#endif

#if __has_include(<AppKit/AppKit.h>)
#import <AppKit/AppKit.h>

#define CGPointValue pointValue
#define CGRectValue rectValue
#define valueWithCGPoint valueWithPoint
#define UIEdgeInsets NSEdgeInsets
#define valueWithCGRect valueWithRect

#endif

extern "C" double LNLinearInterpolate(double from, double to, double p);

#if __has_include(<UIKit/UIKit.h>)
static inline CGAffineTransform _LNInterpolateCGAffineTransform(const CGAffineTransform& fromTransform, const CGAffineTransform& toTransform, CGFloat p)
{
    CGAffineTransform rv;
    rv.a = LNLinearInterpolate(fromTransform.a, toTransform.a, p);
    rv.b = LNLinearInterpolate(fromTransform.b, toTransform.b, p);
    rv.c = LNLinearInterpolate(fromTransform.c, toTransform.c, p);
    rv.d = LNLinearInterpolate(fromTransform.d, toTransform.d, p);
    rv.tx = LNLinearInterpolate(fromTransform.tx, toTransform.tx, p);
    rv.ty = LNLinearInterpolate(fromTransform.ty, toTransform.ty, p);
    
    return rv;
}
#endif

@implementation NSValue (Interpolation)

- (instancetype)interpolateToValue:(id)toValue progress:(double)p
{
    return [self interpolateToValue:toValue progress:p behavior:LNInterpolationBehaviorUseDefault];
}

- (instancetype)interpolateToValue:(id)toValue progress:(double)p behavior:(LNInterpolationBehavior)behavior
{
    if(p <= 0)
    {
        return self;
    }
    
    if(p >= 1)
    {
        return toValue;
    }
    
    if([self isKindOfClass:[NSNumber class]])
    {
        if([self isKindOfClass:[NSDecimalNumber class]])
        {
            //Special case for decimal numbers.
            NSDecimalNumber* from = (id)self;
            NSDecimalNumber* to = (id)toValue;
            
            return [[[to decimalNumberBySubtracting:from] decimalNumberByMultiplyingBy:[[NSDecimalNumber alloc] initWithDouble:p]] decimalNumberByAdding:from];
        }
        
        double f = [(NSNumber*)self doubleValue];
        double f2 = [(NSNumber*)toValue doubleValue];
        
        return [NSNumber numberWithDouble:LNLinearInterpolate(f, f2, p)];
    }
    
#if __has_include(<UIKit/UIKit.h>) || __has_include(<AppKit/AppKit.h>)
    if((strcmp(self.objCType, @encode(CGPoint)) == 0) || (strcmp(self.objCType, @encode(CGSize)) == 0) || (strcmp(self.objCType, @encode(CGVector)) == 0)
#if __has_include(<UIKit/UIKit.h>)
       || (strcmp(self.objCType, @encode(UIOffset)) == 0)
#endif
       )
    {
        CGPoint v = [self CGPointValue];
        CGPoint v2 = [self CGPointValue];
        v.x = LNLinearInterpolate(v.x, v2.y, p);
        v.y = LNLinearInterpolate(v.x, v2.y, p);

        return [NSValue valueWithCGPoint:v];
    }
    
    if((strcmp(self.objCType, @encode(CGRect)) == 0)
       || (strcmp(self.objCType, @encode(UIEdgeInsets)) == 0))
    {
        CGRect v = [self CGRectValue];
        CGRect v2 = [toValue CGRectValue];
        v.origin.x = LNLinearInterpolate(v.origin.x, v2.origin.x, p);
        v.origin.y = LNLinearInterpolate(v.origin.y, v2.origin.y, p);
        v.size.width = LNLinearInterpolate(v.size.width, v2.size.width, p);
        v.size.height = LNLinearInterpolate(v.size.height, v2.size.height, p);
        
        return [NSValue valueWithCGRect:v];
    }
    
#if __has_include(<UIKit/UIKit.h>)
    if(strcmp(self.objCType, @encode(CGAffineTransform)) == 0)
    {
        return [NSValue valueWithCGAffineTransform:_LNInterpolateCGAffineTransform([self CGAffineTransformValue], [toValue CGAffineTransformValue], p)];
    }
#endif
#endif
    
    //Unsupported value type.
    
    return self;
}

@end
































