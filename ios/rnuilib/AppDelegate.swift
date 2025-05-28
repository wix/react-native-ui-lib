import UIKit
import React
import React_RCTAppDelegate
import ReactAppDependencyProvider
//import ReactNativeNavigation

@main
class AppDelegate: RCTAppDelegate {
  override func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey : Any]? = nil) -> Bool {
    self.moduleName = "rnuilib"
    self.dependencyProvider = RCTAppDependencyProvider()
 
    // You can add your custom initial props in the dictionary below.
    // They will be passed down to the ViewController used by React Native.
    self.initialProps = [:]
    
//    [ReactNativeNavigation bootstrapWithDelegate:self launchOptions:launchOptions];
//    let jsCodeLocation = RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: "index", fallbackResource: nil)
//    ReactNativeNavigation.bootstrap(jsCodeLocation, launchOptions: launchOptions)
 
    
//    ReactNativeNavigation.bootstrap(with: self, launchOptions: launchOptions)
//    ReactNativeNavigation.bootstrap(with: RNModuleInitialiser.init(), launchOptions: launchOptions)
//    [ReactNativeNavigation bootstrapWithDelegate:self launchOptions:launchOptions];

    return super.application(application, didFinishLaunchingWithOptions: launchOptions)
    
    // ReactNativeNavigation.bootstrap(withDelegate: self, launchOptions: launchOptions)

    // return true
  }
 
  override func sourceURL(for bridge: RCTBridge) -> URL? {
    self.bundleURL()
  }
 
  override func bundleURL() -> URL? {
#if DEBUG
    RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: "index")
#else
    Bundle.main.url(forResource: "main", withExtension: "jsbundle")
#endif
  }
}

extension AppDelegate: ReactNativeNavigationDelegate {
  func sourceURL(for bridge: RCTBridge) -> URL! {
    // Return the source URL for your JavaScript bundle
    #if DEBUG
    return RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: "index", fallbackResource: nil)
    #else
    return Bundle.main.url(forResource: "main", withExtension: "jsbundle")
    #endif
  }
}
