package com.rnuilib;

import com.facebook.react.PackageList;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactNativeHost;
import com.facebook.react.bridge.JSIModulePackage;

import com.reactnativenavigation.NavigationApplication;
import com.reactnativenavigation.react.NavigationReactNativeHost;
import com.wix.reactnativeuilib.UiLibPackageList;
import com.swmansion.reanimated.ReanimatedJSIModulePackage;

import java.util.List;


public class MainApplication extends NavigationApplication {

    private final ReactNativeHost mReactNativeHost = new NavigationReactNativeHost(this) { //DefaultReactNativeHost
        @Override
        protected String getJSMainModuleName() {
            return "demo";
        }

        @Override
        protected JSIModulePackage getJSIModulePackage() {
            return new ReanimatedJSIModulePackage();
        }

        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            List<ReactPackage> packages = new PackageList(this).getPackages();
            packages.addAll(new UiLibPackageList(MainApplication.this).getPackageList());
            return packages;
        }
    
        // private final ReactNativeHost mNewArchitectureNativeHost = new MainApplicationReactNativeHost(this);
        protected boolean isNewArchEnabled() {
        return BuildConfig.IS_NEW_ARCHITECTURE_ENABLED;
        }
        protected Boolean isHermesEnabled() {
        return BuildConfig.IS_HERMES_ENABLED;
        }
    };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

    @Override
    public void onCreate() {
        super.onCreate();

        if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
            // If you opted-in for the New Architecture, we load the native entry point for this app.
            DefaultNewArchitectureEntryPoint.load();
          }
          ReactNativeFlipper.initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
    }
}
