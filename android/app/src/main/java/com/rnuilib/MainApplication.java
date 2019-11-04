package com.uilib;

import android.support.annotation.Nullable;
import com.cmcewen.blurview.BlurViewPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.github.amarcruz.rntextsize.RNTextSizePackage;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import com.reactnativenavigation.NavigationApplication;
import com.reactnativenavigation.react.NavigationReactNativeHost;
import com.reactnativenavigation.react.ReactGateway;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.swmansion.reanimated.ReanimatedPackage;
//import com.wix.interactable.Interactable;
//import com.wix.reactnativeuilib.highlighterview.HighlighterViewPackage;
//import com.wix.reactnativeuilib.textinput.TextInputDelKeyHandlerPackage;
//import com.wix.reactnativeuilib.wheelpicker.WheelPickerPackage;
import java.util.Arrays;
import java.util.List;


public class MainApplication extends NavigationApplication {
    @Override
    protected ReactGateway createReactGateway() {
        ReactNativeHost host = new NavigationReactNativeHost(this, isDebug(), createAdditionalReactPackages()) {
            @Override
            protected String getJSMainModuleName() {
                return "demo";
            }
        };
        return new ReactGateway(this, isDebug(), host);
    }

    @Override
    public boolean isDebug() {
        return BuildConfig.DEBUG;
    }

    @Nullable
    @Override
    public List<ReactPackage> createAdditionalReactPackages() {
        return getPackages();
    }

    protected List<ReactPackage> getPackages() {
        // Add additional packages you require here
        // No need to add RnnPackage and MainReactPackage
        return Arrays.<ReactPackage>asList(
            // eg. new VectorIconsPackage()
//            new TextInputDelKeyHandlerPackage(),
//            new HighlighterViewPackage(),
//            new WheelPickerPackage(),
            new BlurViewPackage(),
//            new Interactable(),
            new RNTextSizePackage(),
            new ReanimatedPackage(),
            new RNGestureHandlerPackage(),
            new AsyncStoragePackage()
        );
    }
}


// DEFAULT RN CODE
// public class MainApplication extends Application implements ReactApplication {

//   private final ReactNativeHost mReactNativeHost =
//       new ReactNativeHost(this) {
//         @Override
//         public boolean getUseDeveloperSupport() {
//           return BuildConfig.DEBUG;
//         }

//         @Override
//         protected List<ReactPackage> getPackages() {
//           @SuppressWarnings("UnnecessaryLocalVariable")
//           List<ReactPackage> packages = new PackageList(this).getPackages();
//           // Packages that cannot be autolinked yet can be added manually here, for example:
//           // packages.add(new MyReactNativePackage());
//           return packages;
//         }

//         @Override
//         protected String getJSMainModuleName() {
//           return "index";
//         }
//       };

//   @Override
//   public ReactNativeHost getReactNativeHost() {
//     return mReactNativeHost;
//   }

//   @Override
//   public void onCreate() {
//     super.onCreate();
//     SoLoader.init(this, /* native exopackage */ false);
//     initializeFlipper(this); // Remove this line if you don't want Flipper enabled
//   }

//   /**
//    * Loads Flipper in React Native templates.
//    *
//    * @param context
//    */
//   private static void initializeFlipper(Context context) {
//     if (BuildConfig.DEBUG) {
//       try {
//         /*
//          We use reflection here to pick up the class that initializes Flipper,
//         since Flipper library is not available in release mode
//         */
//         Class<?> aClass = Class.forName("com.facebook.flipper.ReactNativeFlipper");
//         aClass.getMethod("initializeFlipper", Context.class).invoke(null, context);
//       } catch (ClassNotFoundException e) {
//         e.printStackTrace();
//       } catch (NoSuchMethodException e) {
//         e.printStackTrace();
//       } catch (IllegalAccessException e) {
//         e.printStackTrace();
//       } catch (InvocationTargetException e) {
//         e.printStackTrace();
//       }
//     }
//   }
// }
