package com.uilib;

import android.support.annotation.Nullable;
import android.view.KeyEvent;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.reactnativenavigation.NavigationApplication;
import com.reactnativenavigation.controllers.ActivityCallbacks;
import com.wix.androidshadow.RNReactNativeAndoridShadowPackage;

import java.util.List;
//import com.wix.interactable.Interactable;
import java.util.Arrays;


public class MainApplication extends NavigationApplication {
    @Override
    public boolean isDebug() {
        // Make sure you are using BuildConfig from your own application
        return BuildConfig.DEBUG;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        setBackspaceListener();
    }

    private void setBackspaceListener() {
        setActivityCallbacks(new ActivityCallbacks() {
            @Override
            public void onKeyUp(int keyCode, KeyEvent event) {
                if (event.getKeyCode() == KeyEvent.KEYCODE_DEL) {
                    ReactContext reactContext = getReactNativeHost().getReactInstanceManager().getCurrentReactContext();
                    if (reactContext != null) {
                        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                                .emit("onBackspacePress", Arguments.createMap());
                    }
                }
            }
        });
    }

    @Nullable
    @Override
    public List<ReactPackage> createAdditionalReactPackages() {
        // Add the packages you require here.
        // No need to add RnnPackage and MainReactPackage
        return Arrays.<ReactPackage>asList(
                new RNReactNativeAndoridShadowPackage()
//                new Interactable()
        );
    }


}
