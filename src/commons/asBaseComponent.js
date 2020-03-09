import React from 'react';
import _ from 'lodash';
import hoistStatics from 'hoist-non-react-statics';
import * as Modifiers from './modifiers';
import forwardRef from './forwardRef';
import UIComponent from './UIComponent';

function asBaseComponent(WrappedComponent) {
  class BaseComponent extends UIComponent {
    state = Modifiers.generateModifiersStyle(undefined, this.props);

    static getDerivedStateFromProps(nextProps, prevState) {
      const newModifiers = Modifiers.generateModifiersStyle(undefined, nextProps);
      if (!_.isEqual(newModifiers, prevState)) {
        return newModifiers;
      }

      return null;  
    }

    render() {
      const themeProps = Modifiers.getThemeProps.call(WrappedComponent, this.props, this.context);
      const {forwardedRef, ...others} = themeProps;
      return <WrappedComponent /* {...this.props} */ {...others} modifiers={this.state} ref={forwardedRef}/>;
    }
  }

  // Statics
  hoistStatics(BaseComponent, WrappedComponent);
  BaseComponent.displayName = WrappedComponent.displayName;
  BaseComponent.propTypes = WrappedComponent.propTypes;
  BaseComponent.defaultProps = WrappedComponent.defaultProps;

  return forwardRef(BaseComponent);
}

export default asBaseComponent;
