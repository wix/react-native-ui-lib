package com.wix.reactnativeuilib.textinput;

import android.text.Editable;
import android.text.method.KeyListener;
import android.view.KeyEvent;
import android.view.View;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.modules.core.DeviceEventManagerModule;

public class KeyListenerProxy implements KeyListener {

    final private ReactApplicationContext mContext;
    final private KeyListener mKeyListener;

    KeyListenerProxy(ReactApplicationContext context, KeyListener keyListener) {
        mContext = context;
        mKeyListener = keyListener == null ? new DefaultKeyListener() : keyListener;
    }

    @Override
    public int getInputType() {
        return mKeyListener.getInputType();
    }

    @Override
    public boolean onKeyDown(View view, Editable text, int keyCode, KeyEvent event) {
        return mKeyListener.onKeyDown(view, text, keyCode, event);
    }

    @Override
    public boolean onKeyUp(View view, Editable text, int keyCode, KeyEvent event) {
        if (keyCode == KeyEvent.KEYCODE_DEL) {
            emitBackspacePressEvent();
        }
        return mKeyListener.onKeyUp(view, text, keyCode, event);
    }

    @Override
    public boolean onKeyOther(View view, Editable text, KeyEvent event) {
        return mKeyListener.onKeyOther(view, text, event);
    }

    @Override
    public void clearMetaKeyState(View view, Editable content, int states) {
        mKeyListener.clearMetaKeyState(view, content, states);
    }

    private void emitBackspacePressEvent() {
        mContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit("onBackspacePress", Arguments.createMap());
    }
}
