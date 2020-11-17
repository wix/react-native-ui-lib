import React from 'react';
import _ from 'lodash';
//@ts-ignore
import hoistStatics from 'hoist-non-react-statics';
//@ts-ignore
import * as Modifiers from './modifiers';
import forwardRef from './forwardRef';
import UIComponent from './UIComponent';

export interface BaseComponentInjectedProps {
  /**
   * All generated styles from the modifiers props
   */
  modifiers: ReturnType<typeof Modifiers.generateModifiersStyle>;
}

// TODO: find a proper way to inject this type in the private repo
type ThemeComponent = {
  useCustomTheme?: boolean;
}

function asBaseComponent<PROPS, STATICS = {}>(WrappedComponent: React.ComponentType<any>): React.ComponentClass<PROPS & ThemeComponent> & STATICS {
  class BaseComponent extends UIComponent {
    static displayName: string | undefined;
    static propTypes: any;
    static defaultProps: any;

    static getThemeProps = (props: any, context: any) => {
      return Modifiers.getThemeProps.call(WrappedComponent, props, context);
    }

    render() {
      const themeProps = BaseComponent.getThemeProps(this.props, this.context);
      const modifiers = Modifiers.generateModifiersStyle(undefined, themeProps);
      // TODO: omit original modifiers props (left, right, flex, etc..)
      // Because they throws an error when being passed to RNView on Android
      const {forwardedRef, ...others} = themeProps;
      return <WrappedComponent {...others} modifiers={modifiers} ref={forwardedRef}/>;
    }
  }

  // Statics
  hoistStatics(BaseComponent, WrappedComponent);
  BaseComponent.displayName = WrappedComponent.displayName;
  BaseComponent.propTypes = WrappedComponent.propTypes;
  BaseComponent.defaultProps = WrappedComponent.defaultProps;

  return forwardRef(BaseComponent) as any;
}

export default asBaseComponent;
