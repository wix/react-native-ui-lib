import React from 'react';
import hoistStatics from 'hoist-non-react-statics';
import * as Modifiers from "./modifiers";
import { Scheme, ThemeManager } from "../style";
import forwardRef from "./forwardRef";
import UIComponent from "./UIComponent";
const EMPTY_MODIFIERS = {};
const colorScheme = Scheme.getSchemeType();
function asBaseComponent(WrappedComponent, options = {}) {
  class BaseComponent extends UIComponent {
    state = {
      error: false,
      colorScheme
    };
    componentDidMount() {
      Scheme.addChangeListener(this.appearanceListener);
    }
    componentWillUnmount() {
      Scheme.removeChangeListener(this.appearanceListener);
    }
    appearanceListener = colorScheme => {
      // iOS 13 and above will trigger this call with the wrong colorScheme value. So just ignore returned colorScheme for now
      // https://github.com/facebook/react-native/issues/28525
      // this.setState({colorScheme: Appearance.getColorScheme()});
      if (this.state.colorScheme !== colorScheme) {
        this.setState({
          colorScheme
        });
      }
    };
    static getThemeProps = (props, context) => {
      return Modifiers.getThemeProps.call(WrappedComponent, props, context);
    };
    static getDerivedStateFromError(error) {
      UIComponent.defaultProps?.onError?.(error, WrappedComponent.defaultProps);
      return {
        error: true
      };
    }
    render() {
      const themeProps = options.ignoreTheme ? this.props : BaseComponent.getThemeProps(this.props, this.context);
      const modifiers = options.ignoreModifiers ? EMPTY_MODIFIERS : Modifiers.generateModifiersStyle(options.modifiersOptions, themeProps);
      // TODO: omit original modifiers props (left, right, flex, etc..)
      // Because they throws an error when being passed to RNView on Android
      // @ts-expect-error
      const {
        forwardedRef,
        ...others
      } = themeProps;
      return this.state.error && UIComponent.defaultProps?.renderError || <WrappedComponent {...others} modifiers={modifiers} ref={forwardedRef} />;
    }
  }

  // Statics
  hoistStatics(BaseComponent, WrappedComponent);
  BaseComponent.displayName = WrappedComponent.displayName;
  BaseComponent.propTypes = WrappedComponent.propTypes;
  BaseComponent.defaultProps = WrappedComponent.defaultProps;
  const ThemeContext = ThemeManager.getThemeContext();
  if (ThemeContext) {
    BaseComponent.contextType = ThemeContext;
  }
  return forwardRef(BaseComponent);
}
export default asBaseComponent;