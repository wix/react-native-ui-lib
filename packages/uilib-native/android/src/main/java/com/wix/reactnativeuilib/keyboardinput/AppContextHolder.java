package com.wix.reactnativeuilib.keyboardinput;

import android.app.Activity;
import android.app.Application;
import android.os.Bundle;

public class AppContextHolder {

    private static Activity sCurrentActivity;

    public static void setApplication(Application application) {
        application.registerActivityLifecycleCallbacks(new Application.ActivityLifecycleCallbacks() {
            @Override
            public void onActivityCreated(Activity activity, Bundle savedInstanceState) {
                sCurrentActivity = activity;
            }

            @Override
            public void onActivityStarted(Activity activity) {
                sCurrentActivity = activity;
            }

            @Override
            public void onActivityResumed(Activity activity) {
                sCurrentActivity = activity;
            }

            @Override
            public void onActivityPaused(Activity activity) {
            }

            @Override
            public void onActivityStopped(Activity activity) {
            }

            @Override
            public void onActivitySaveInstanceState(Activity activity, Bundle outState) {
            }

            @Override
            public void onActivityDestroyed(Activity activity) {
                if (sCurrentActivity == activity) {
                    sCurrentActivity = null;
                }
            }
        });
    }

    public static Activity getCurrentActivity() {
        return sCurrentActivity;
    }
}
