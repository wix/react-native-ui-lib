import React, {PureComponent} from 'react';
import _ from 'lodash';
import * as Modifiers from './modifiers';

function asBaseComponent(WrappedComponent) {
  class BaseComponent extends PureComponent {
    state = Modifiers.generateModifiersStyle(undefined, this.props);

    componentWillReceiveProps(nextProps) {
      const options = Modifiers.getAlteredModifiersOptions(this.props, nextProps);
      if (!_.isEmpty(options)) {
        this.setState(Modifiers.generateModifiersStyle(undefined, nextProps));
      }
    }

    render() {
      const themeProps = Modifiers.getThemeProps.call(WrappedComponent, this.props, this.context);
      return <WrappedComponent /* {...this.props} */ {...themeProps} modifiers={this.state} />;
    }
  }

  return BaseComponent;
}

export default asBaseComponent;
