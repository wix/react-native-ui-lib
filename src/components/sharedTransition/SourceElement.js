import React, {Component} from 'react';
import PropTypes from 'prop-types';
import TouchableOpacity from '../touchableOpacity';

import ShareTransitionContext from './ShareTransitionContext';

class SourceElement extends Component {
  static propTypes = {
    /**
     * Data to share between shared element and placeholder
     */
    data: PropTypes.object,
  };

  state = {};

  onPress = () => {
    const {data} = this.props;
    const {setSource} = this.context;

    this.element.measureInWindow((x, y, width, height) => {
      const sourceLayout = {x, y, width, height};
      setSource(sourceLayout, data, this.props.children);
    });
  };

  setRef = ref => {
    this.element = ref;
  };

  render() {
    const {style, children} = this.props;
    return (
      <TouchableOpacity activeOpacity={0.9} style={style} ref={this.setRef} onPress={this.onPress}>
        {children}
      </TouchableOpacity>
    );
  }
}

SourceElement.contextType = ShareTransitionContext;
export default SourceElement;
