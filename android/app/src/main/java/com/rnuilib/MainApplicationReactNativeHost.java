package com.rnuilib;

import android.app.Application;
import androidx.annotation.NonNull;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.rnuilib.BuildConfig;
import java.util.ArrayList;
import java.util.List;

/**
 * A simplified {@link ReactNativeHost} for React Native 0.79.
 */
public class MainApplicationReactNativeHost extends ReactNativeHost {
    public MainApplicationReactNativeHost(Application application) {
        super(application);
    }

    @Override
    public boolean getUseDeveloperSupport() {
        return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
        List<ReactPackage> packages = new ArrayList<>();
        packages.add(new MainReactPackage());
        // Add additional packages here manually as needed
        return packages;
    }

    @Override
    protected String getJSMainModuleName() {
        return "index";
    }
}