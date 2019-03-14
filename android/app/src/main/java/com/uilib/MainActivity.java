package com.uilib;

import android.os.Bundle;

import com.reactnativenavigation.NavigationActivity;
import com.facebook.react.modules.i18nmanager.I18nUtil;


public class MainActivity extends NavigationActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        I18nUtil sharedI18nUtilInstance = I18nUtil.getInstance();
        sharedI18nUtilInstance.allowRTL(getApplicationContext(), true);
    }
}
