package com.wix.reactnativeuilib.utils;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

public class LogForwarder {

    public enum LogType {
        log,
        warn,
        error
    }

    private DeviceEventManagerModule.RCTDeviceEventEmitter eventEmitter;

    public LogForwarder(ReactContext reactContext) {
        eventEmitter = reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class);
    }

    @SuppressWarnings("unused")
    public void e(String TAG, String text) {
        log(LogType.error, TAG, text);
    }

    @SuppressWarnings("unused")
    public void w(String TAG, String text) {
        log(LogType.warn, TAG, text);
    }

    @SuppressWarnings("unused")
    public void d(String TAG, String text) {
        log(LogType.log, TAG, text);
    }

    private void log(LogType logType, String TAG, String text) {
        WritableMap payload = Arguments.createMap();
        payload.putString("LogType", logType.name());
        payload.putString("TAG", TAG);
        payload.putString("text", text);
        eventEmitter.emit("log", payload);
    }

}
