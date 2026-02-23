//
//  NSValue+Interpolation.h
//
//  Created by Leo Natan on 01/10/2016.
//  Copyright © 2016 Leo Natan. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "LNInterpolable.h"

/**
 Interpolates between @c NSValue objects.
 Currently, the following value types are supported:
    Numbers (@c NSNumber), decimal numbers (@c NSDecimalNumber)
    Core Graphics: CGPoint, CGSize, CGVector, CGRect, CGAffineTransform (@c NSValue)
    UIKit: UIOffset, UIEdgeInsets (@c NSValue)
    AppKit: NSEdgeInsets (@c NSValue)
 */
@interface NSValue (Interpolation) <LNInterpolable> @end
