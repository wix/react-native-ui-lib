// Reverting to using AppDelegate.m since this is causing iOS to fail on start
#import "AppDelegate.h"
#import <React/RCTBundleURLProvider.h>
#import <ReactNativeNavigation/ReactNativeNavigation.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];
  [ReactNativeNavigation bootstrapWithBridge:bridge];

//  self.moduleName = @"rnuilib";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};
  
//  return [super application:application didFinishLaunchingWithOptions:launchOptions];
  return YES;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
  return [self getBundleURL];
}

- (NSURL *)getBundleURL
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

- (NSArray<id<RCTBridgeModule>> *)extraModulesForBridge:(RCTBridge *)bridge {
  return [ReactNativeNavigation extraModulesForBridge:bridge];
}

@end
