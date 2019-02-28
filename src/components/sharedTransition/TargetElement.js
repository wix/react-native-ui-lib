import React, {Component} from 'react';
import TouchableOpacity from '../touchableOpacity';

import ShareTransitionContext from './ShareTransitionContext';

class TargetElement extends Component {
  state = {};

  componentDidUpdate() {
    const {showDetails, setTarget} = this.context;

    if (showDetails && !this.targetLayout) {
      this.element.measureInWindow((x, y, width, height) => {
        this.targetLayout = {x, y, width, height};
        setTarget(this.targetLayout);
      });
    }
  }

  setRef = ref => {
    this.element = ref;
  };

  render() {
    const {style, children} = this.props;
    return (
      <TouchableOpacity style={[style, {opacity: 0}]} ref={this.setRef}>
        {children}
      </TouchableOpacity>
    );
  }
}

TargetElement.contextType = ShareTransitionContext;
export default TargetElement;
