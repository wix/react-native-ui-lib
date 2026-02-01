//
//  LNInterpolable.c
//
//  Created by Leo Natan on 04/10/2016.
//  Copyright © 2016 Leo Natan. All rights reserved.
//

#import "LNInterpolable.h"

LNInterpolationBehavior const LNInterpolationBehaviorUseDefault = @"LNInterpolationBehaviorUseDefault";

double BackEaseOut(double p)
{
    double f = (1 - p);
    return 1 - (f * f * f - 0.4*f * sin(f * M_PI));
}

double QuarticEaseOut(double p)
{
    double f = (p - 1);
    return f * f * f * (1 - p) + 1;
}

double LNLinearInterpolate(double from, double to, double p)
{
    return from + QuarticEaseOut(p) * (to - from);
}
