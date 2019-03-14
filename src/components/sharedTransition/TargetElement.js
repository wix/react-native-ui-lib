import React, {Component} from 'react';
import TouchableOpacity from '../touchableOpacity';

import ShareTransitionContext from './ShareTransitionContext';

class TargetElement extends Component {
  state = {};

  componentDidMount() {
    const {setTarget} = this.context;

    if (!this.targetLayout) {
      setTimeout(() => {
        this.element.measure((x, y, width, height, pageX, pageY) => {
          this.targetLayout = {x: pageX, y: pageY, width, height};
          setTarget(this.targetLayout);
        });
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
