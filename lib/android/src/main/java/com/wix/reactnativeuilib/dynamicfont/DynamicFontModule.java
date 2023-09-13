package com.wix.reactnativeuilib.dynamicfont;

import android.app.Activity;
import android.graphics.Typeface;
import android.util.Base64;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.views.text.ReactFontManager;

import java.io.File;
import java.io.FileOutputStream;

public class DynamicFontModule extends ReactContextBaseJavaModule {
  int tempNameCounter = 0;

  public DynamicFontModule(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @Override
  public String getName() {
    return "DynamicFont";
  }

  // TODO: Needs to be tested
  // @ReactMethod
  // public void loadFontFromFile(final ReadableMap options, final Callback callback) {
  //   Activity currentActivity = getCurrentActivity();
  //   if (currentActivity == null) {
  //     callback.invoke("Invalid activity");
  //     return;
  //   }

  //   String filePath = options.hasKey("filePath") ? options.getString("filePath") : null,
  //          name = (options.hasKey("name")) ? options.getString("name") : null;

  //   if (filePath == null || filePath.length() == 0) {
  //     callback.invoke("filePath property empty");
  //     return;
  //   }

  //   File f = new File(filePath);

  //   if (f.exists() && f.canRead()) {
  //     boolean wasLoaded = false;
  //     try {
  //       Typeface typeface = Typeface.createFromFile(f);
  //       //Cache the font for react
  // TODO: probably needs to be Typeface.NORMAL and not typeface.getStyle()
  //       ReactFontManager.getInstance().setTypeface(name, typeface.getStyle(), typeface);
  //       wasLoaded = true;
  //     } catch (Throwable e) {
  //       callback.invoke(e.getMessage());
  //     } finally {
  //       if (wasLoaded) {
  //         callback.invoke(null, name);
  //       }
  //     }
  //   } else {
  //     callback.invoke("invalid file");
  //   }
  // }

  @ReactMethod
  public void loadFont(final ReadableMap options, final Callback callback) throws Exception {
    Activity currentActivity = getCurrentActivity();
    if (currentActivity == null) {
      callback.invoke("Invalid activity");
      return;
    }

    String name = (options.hasKey("name")) ? options.getString("name") : null,
           data = (options.hasKey("data")) ? options.getString("data") : null,
           type = null;

    if (name == null || name.length() == 0) {
      callback.invoke("Name property empty");
      return;
    }

    if (data == null || data.length() == 0) {
      callback.invoke("Data property empty");
      return;
    }

    if (("data:").equalsIgnoreCase(data.substring(0, 5))) {
      Integer pos = data.indexOf(',');
      if (pos > 0) {
        String[] encodingParams = data.substring(5, pos).split(";");
        String mimeType = encodingParams[0];

        data = data.substring(pos + 1);

        if (("application/x-font-ttf").equalsIgnoreCase(mimeType) ||
            ("application/x-font-truetype").equalsIgnoreCase(mimeType) ||
            ("font/ttf").equalsIgnoreCase(mimeType)) {
          type = "ttf";
        } else if (("application/x-font-opentype").equalsIgnoreCase(mimeType) ||
                   ("font/opentype").equalsIgnoreCase(mimeType)) {
          type = "otf";
        }
      }
    }

    if (options.hasKey("type"))
      type = options.getString("type");

    if (type == null)
      type = "ttf";

    try {
      byte[] decodedBytes = Base64.decode(data, Base64.DEFAULT);
      File cacheFile = new File(currentActivity.getCacheDir(), "tempFont" + (tempNameCounter++) + type);

      FileOutputStream stream = new FileOutputStream(cacheFile);
      try {
        stream.write(decodedBytes);
      } finally {
        stream.close();
      }

      //Load the font from the temporary file we just created
      Typeface typeface = Typeface.createFromFile(cacheFile);

      //Cache the font for react
      ReactFontManager.getInstance().setTypeface(name, Typeface.NORMAL, typeface);

      cacheFile.delete();
    } catch(Exception e) {
      callback.invoke(e.getMessage());
    } finally {
      callback.invoke(null, name);
    }
  }
}
