import React from 'react';
import hoistStatics from 'hoist-non-react-statics';
import * as Modifiers from './modifiers';
import {Scheme, ThemeManager} from '../style';
import forwardRef from './forwardRef';
import UIComponent from './UIComponent';

export interface BaseComponentInjectedProps {
  /**
   * All generated styles from the modifiers props
   */
  modifiers: ReturnType<typeof Modifiers.generateModifiersStyle>;
}

export interface AsBaseComponentOptions {
  ignoreModifiers?: boolean;
  ignoreTheme?: boolean;
  modifiersOptions?: Modifiers.ModifiersOptions;
}

const EMPTY_MODIFIERS = {};

function asBaseComponent<PROPS, STATICS = {}>(WrappedComponent: React.ComponentType<any>,
  options: AsBaseComponentOptions = {}): React.ComponentClass<PROPS & ThemeComponent> & STATICS {
  class BaseComponent extends UIComponent {
    static displayName: string | undefined;
    static propTypes: any;
    static defaultProps: any;

    state = {
      error: false
    };

    componentDidMount() {
      Scheme.addChangeListener(this.appearanceListener);
    }

    componentWillUnmount() {
      Scheme.removeChangeListener(this.appearanceListener);
    }

    appearanceListener = () => {
      // iOS 13 and above will trigger this call with the wrong colorScheme value. So just ignore returned colorScheme for now
      // https://github.com/facebook/react-native/issues/28525
      // this.setState({colorScheme: Appearance.getColorScheme()});
      this.setState({colorScheme: Scheme.getSchemeType()});
    };

    static getThemeProps = (props: any, context: any) => {
      return Modifiers.getThemeProps.call(WrappedComponent, props, context);
    };

    static getDerivedStateFromError(error: any) {
      UIComponent.defaultProps?.onError?.(error, WrappedComponent.defaultProps);
      return {error: true};
    }

    render() {
      const themeProps = options.ignoreTheme ? this.props : BaseComponent.getThemeProps(this.props, this.context);
      const modifiers = options.ignoreModifiers
        ? EMPTY_MODIFIERS
        : Modifiers.generateModifiersStyle(options.modifiersOptions, themeProps);
      // TODO: omit original modifiers props (left, right, flex, etc..)
      // Because they throws an error when being passed to RNView on Android
      // @ts-expect-error
      const {forwardedRef, ...others} = themeProps;
      return (
        (this.state.error && UIComponent.defaultProps?.renderError) || (
          <WrappedComponent {...others} modifiers={modifiers} ref={forwardedRef}/>
        )
      );
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

  return forwardRef(BaseComponent) as any;
}

export default asBaseComponent;
