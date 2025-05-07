import _ from 'lodash';
import React, {useImperativeHandle, forwardRef, ForwardedRef, useEffect, useRef, useState} from 'react';
import {StyleSheet, Animated, TextInput, ActivityIndicator} from 'react-native';
import {SearchInputPresets, SearchInputProps, SearchInputRef} from './types';
import {Colors, BorderRadiuses, Spacings, Typography} from '../../style';
import {Constants, asBaseComponent} from '../../commons/new';
import Button from '../button';
import Icon from '../icon';
import View from '../view';
import Assets from '../../assets';

const ICON_SIZE = 24;
const INPUT_HEIGHT = 60;
const TOP_INPUT_HEIGHT = Constants.isIOS ? 40 : 56;
const PROMINENT_INPUT_HEIGHT = 48;
const INVERTED_TEXT_COLOR = Colors.$textDefaultLight;
const INVERTED_ICON_COLOR = Colors.$iconDefaultLight;
const HIT_SLOP_VALUE = 20;

const SearchInput = forwardRef((props: SearchInputProps, ref: ForwardedRef<any>) => {
  const {
    preset = SearchInputPresets.DEFAULT,
    onDismiss,
    useSafeArea,
    invertColors,
    testID,
    showLoader,
    loaderProps,
    value: controlledValue,
    onChangeText,
    onClear,
    containerStyle,
    customRightElement,
    style,
    inaccessible
  } = props;
  const currentAnimatedValue = useRef<ReturnType<typeof Animated.timing> | undefined>();
  const searchInputRef = useRef<TextInput>(null);
  const [hasValue, setHasValue] = useState(Boolean(controlledValue));
  const [value, setValue] = useState(controlledValue);
  const [valueState] = useState(new Animated.Value(_.isEmpty(controlledValue) ? 0 : 1));
  const [isAnimatingClearButton, setIsAnimatingClearButton] = useState(!_.isEmpty(controlledValue));

  useImperativeHandle(ref, () => {
    return {
      blur: () => searchInputRef.current?.blur(),
      focus: () => searchInputRef.current?.focus(),
      clear: () => {
        searchInputRef.current?.clear();
        onChangeText?.('');
        onClear?.();
      }
    };
  });

  useEffect(() => {
    if (controlledValue !== value) {
      setValue(controlledValue);
      setHasValue(Boolean(controlledValue));
    }
  }, [controlledValue]);

  useEffect(() => {
    if (hasValue) {
      animatedValueState(1);
    } else {
      animatedValueState(0);
    }
  }, [hasValue]);

  useEffect(() => {
    return () => {
      currentAnimatedValue.current?.stop();
    };
  }, []);

  const animatedValueState = (value: number) => {
    setIsAnimatingClearButton(true);
    if (currentAnimatedValue.current) {
      currentAnimatedValue.current.stop();
    }
    currentAnimatedValue.current = Animated.timing(valueState, {
      toValue: value,
      duration: 160,
      useNativeDriver: true
    });

    currentAnimatedValue.current.start(() => {
      if (!hasValue) {
        setIsAnimatingClearButton(false);
      }
    });
  };

  const getHeight = () => {
    const isProminent = preset === SearchInputPresets.PROMINENT;
    if (isProminent) {
      return PROMINENT_INPUT_HEIGHT;
    }
    return useSafeArea ? TOP_INPUT_HEIGHT : INPUT_HEIGHT;
  };

  const onChangeTextHandler = (text: string) => {
    console.log(`onChangeTextHandler, text:`, text);
    onChangeText?.(text);
    setValue(text);
    setHasValue(!_.isEmpty(text));
  };

  const clearInput = () => {
    searchInputRef?.current?.clear();
    onChangeTextHandler('');
    onClear?.();
  };

  const renderClearButton = () => {
    const transform = [
      {
        translateY: valueState.interpolate({
          inputRange: [0, 1],
          outputRange: [50, 1]
        })
      }
    ];

    const clearButtonStyle = !isDismissible() && isAnimatingClearButton && styles.clearButton;
    const iconStyle = {tintColor: invertColors ? INVERTED_ICON_COLOR : Colors.grey40, width: 12, height: 12};
    return (
      <Animated.View style={[{transform}, clearButtonStyle]}>
        <Button
          link
          grey10
          text80
          iconSource={Assets.internal.icons.x}
          iconStyle={iconStyle}
          onPress={clearInput}
          hitSlop={HIT_SLOP_VALUE}
          accessible={Boolean(hasValue)}
          accessibilityLabel={'clear'}
          testID={`${testID}.clearButton`}
        />
      </Animated.View>
    );
  };

  const renderCancelButton = () => {
    const {cancelButtonProps} = props;
    if (onDismiss) {
      return (
        <Button
          style={styles.cancelButton}
          link
          color={invertColors ? INVERTED_TEXT_COLOR : undefined}
          $textDefault
          text65M
          {...cancelButtonProps}
          onPress={onDismiss}
          testID={`${testID}.cancelButton`}
        />
      );
    }
  };

  const renderTextInput = () => {
    const {placeholder} = props;
    const height = getHeight();
    const placeholderTextColor = invertColors ? INVERTED_TEXT_COLOR : Colors.$textDefault;
    const selectionColor = invertColors ? INVERTED_TEXT_COLOR : Colors.$textDefault;
    return (
      <View style={[styles.inputContainer, {height}]}>
        <TextInput
          accessibilityRole={'search'}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          underlineColorAndroid="transparent"
          selectionColor={selectionColor}
          ref={searchInputRef}
          value={value}
          allowFontScaling={false}
          style={[
            styles.input,
            containerStyle,
            invertColors && {color: INVERTED_TEXT_COLOR},
            (!isDismissible() || isAnimatingClearButton) && styles.emptyInput
          ]}
          onChangeText={onChangeTextHandler}
          testID={testID}
        />
        {isAnimatingClearButton && renderClearButton()}
        {isDismissible() && renderCancelButton()}
        {!isDismissible() && customRightElement}
      </View>
    );
  };

  const isDismissible = () => {
    return typeof onDismiss !== 'undefined';
  };

  const renderIcon = (icon: any, left = true) => {
    const invertedColor = invertColors ? {tintColor: INVERTED_ICON_COLOR} : undefined;
    return (
      <View>
        <Icon
          tintColor={invertedColor?.tintColor}
          style={[styles.icon, invertedColor, left && styles.leftIcon]}
          source={icon}
          size={ICON_SIZE}
        />
      </View>
    );
  };

  const renderLoader = () => {
    const {customLoader} = props;
    return <View>{customLoader ? customLoader() : <ActivityIndicator style={styles.loader} {...loaderProps}/>}</View>;
  };

  const topInputTopMargin = useSafeArea && {marginTop: Constants.isIOS ? Constants.statusBarHeight : 0};
  const isProminent = preset === SearchInputPresets.PROMINENT;

  return (
    <View
      inaccessible={inaccessible}
      row
      centerV
      style={[style, isProminent && styles.prominentContainer, topInputTopMargin]}
      testID={`${testID}.searchBox`}
    >
      {showLoader ? renderLoader() : renderIcon(Assets.internal.icons.search)}
      {renderTextInput()}
    </View>
  );
});

const styles = StyleSheet.create({
  inputContainer: {
    height: INPUT_HEIGHT,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden'
  },
  prominentContainer: {
    borderWidth: 1,
    borderColor: Colors.$outlineDefault,
    borderRadius: BorderRadiuses.br20,
    marginHorizontal: Spacings.s5
  },
  input: {
    flex: 1,
    ...Typography.body,
    lineHeight: undefined,
    color: Colors.$textDefault,
    textAlign: Constants.isRTL ? 'right' : 'left'
  },
  emptyInput: {
    marginRight: Spacings.s4
  },
  cancelButton: {
    marginLeft: Spacings.s4,
    marginRight: Spacings.s4
  },
  clearButton: {
    marginRight: Spacings.s4
  },
  icon: {
    marginRight: Spacings.s4
  },
  leftIcon: {
    marginLeft: Spacings.s4
  },
  loader: {
    marginHorizontal: Spacings.s4
  }
});

interface StaticMembers {
  presets: typeof SearchInputPresets;
}

SearchInput.displayName = 'SearchInput';
export {SearchInput, SearchInputProps, SearchInputRef, SearchInputPresets};
export default asBaseComponent<SearchInputProps, StaticMembers>(SearchInput);
