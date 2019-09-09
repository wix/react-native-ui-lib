import React from 'react';
import _ from 'lodash';
import hoistStatics from 'hoist-non-react-statics';
import * as Modifiers from './modifiers';
import forwardRef from './forwardRef';
import UIComponent from './UIComponent';

function asBaseComponent(WrappedComponent) {
  class BaseComponent extends UIComponent {
    state = Modifiers.generateModifiersStyle(undefined, this.props);

    UNSAFE_componentWillReceiveProps(nextProps) {
      const options = Modifiers.getAlteredModifiersOptions(this.props, nextProps);
      if (!_.isEmpty(options)) {
        this.setState(Modifiers.generateModifiersStyle(undefined, nextProps));
      }
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
