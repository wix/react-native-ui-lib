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

function asBaseComponent<PROPS>(WrappedComponent: React.ComponentType<any>): React.ComponentType<PROPS> {
  class BaseComponent extends UIComponent {
    state = Modifiers.generateModifiersStyle(undefined, BaseComponent.getThemeProps(this.props, this.context));
    static displayName: string | undefined;
    static propTypes: any;
    static defaultProps: any;

    static getDerivedStateFromProps(nextProps: any, prevState: any) {
      const themeProps = BaseComponent.getThemeProps(nextProps, undefined);
      const newModifiers = Modifiers.generateModifiersStyle(undefined, themeProps);
      if (!_.isEqual(newModifiers, prevState)) {
        return newModifiers;
      }

      return null;
    }

    static getThemeProps = (props: any, context: any) => {
      return Modifiers.getThemeProps.call(WrappedComponent, props, context);
    }

    render() {
      const themeProps = BaseComponent.getThemeProps(this.props, this.context);
      // TODO: omit original modifiers props (left, right, flex, etc..)
      // Because they throws an error when being passed to RNView on Android
      const {forwardedRef, ...others} = themeProps;
      return <WrappedComponent /* {...this.props} */ {...others} modifiers={this.state} ref={forwardedRef}/>;
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
