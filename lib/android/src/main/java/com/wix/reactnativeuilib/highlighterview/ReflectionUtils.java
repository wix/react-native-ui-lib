package com.wix.reactnativeuilib.highlighterview;

import android.support.annotation.Nullable;

import java.lang.reflect.Field;

class ReflectionUtils {

    @Nullable
    static Object getDeclaredField(Object obj, String fieldName) {
        try {
            Field f = getField(obj.getClass(), fieldName);
            if (f == null) {
                return null;
            }
            f.setAccessible(true);
            return f.get(obj);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    private static Field getField(Class clazz, String name) {
        try {
            return clazz.getDeclaredField(name);
        } catch (NoSuchFieldException nsfe) {
            return getField(clazz.getSuperclass(), name);
        } catch (Exception e) {
            return null;
        }
    }
}
