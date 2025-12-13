package com.rnuilib;
import android.app.Application;
import androidx.annotation.NonNull;
import com.facebook.react.PackageList;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.ReactPackageTurboModuleManagerDelegate;
import java.util.List;
/**
 * A {@link ReactNativeHost} that helps you load everything needed for the New Architecture, both
 * TurboModule delegates and the Fabric Renderer.
 *
 * <p>Please note that this class is used ONLY if you opt-in for the New Architecture (see the
 * `newArchEnabled` property). Is ignored otherwise.
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
        List<ReactPackage> packages = new PackageList(this).getPackages();
        // Packages that cannot be autolinked yet can be added manually here, for example:
        //     packages.add(new MyReactNativePackage());
        // TurboModules must also be loaded here providing a valid TurboReactPackage implementation:
        //     packages.add(new TurboReactPackage() { ... });
        // If you have custom Fabric Components, their ViewManagers should also be loaded here
        // inside a ReactPackage.
        return packages;
    }
    @Override
    protected String getJSMainModuleName() {
        return "index";
    }
    @NonNull
    @Override
    protected ReactPackageTurboModuleManagerDelegate.Builder
    getReactPackageTurboModuleManagerDelegateBuilder() {
        // Here we provide the ReactPackageTurboModuleManagerDelegate Builder. This is necessary
        // for the new architecture and to use TurboModules correctly.
        return new MainApplicationTurboModuleManagerDelegate.Builder();
    }
}