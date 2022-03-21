import React, {Component} from 'react';
import {View} from 'react-native';
import hoistNonReactStatic from 'hoist-non-react-statics';
import SliderContext from './SliderContext';


const getConsumer = (WrappedComponent: React.ComponentClass<any>) => (
  class SliderContextConsumer extends Component {
    contentRef = React.createRef<View>();

    render() {
      return (
        <SliderContext.Consumer>
          {(context) => (
            <WrappedComponent
              ref={this.contentRef}
              sliderContext={context}
              {...this.props}
            />
          )}
        </SliderContext.Consumer>
      );
    }
  }
);

function asSliderGroupChild(WrappedComponent: any) {

  const SliderContextConsumer = getConsumer(WrappedComponent);

  hoistNonReactStatic(SliderContextConsumer, WrappedComponent);

  return SliderContextConsumer;
}

export default asSliderGroupChild;
