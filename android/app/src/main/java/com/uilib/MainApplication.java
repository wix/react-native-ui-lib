package com.uilib;

import android.support.annotation.Nullable;

import com.facebook.react.ReactPackage;
import com.reactnativenavigation.NavigationApplication;
import com.wix.reactnativeuilib.textinput.TextInputDelKeyHandlerPackage;

import java.util.Arrays;
import java.util.List;

//import com.wix.interactable.Interactable;

public class MainApplication extends NavigationApplication {
    @Override
    public boolean isDebug() {
        return BuildConfig.DEBUG;
    }

    @Nullable
    @Override
    public List<ReactPackage> createAdditionalReactPackages() {
        return Arrays.<ReactPackage>asList(
                new TextInputDelKeyHandlerPackage()
//                new Interactable()
        );
    }
}
