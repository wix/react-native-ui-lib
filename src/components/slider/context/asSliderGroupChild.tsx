import React, {Component, ElementRef} from 'react';
import {View} from 'react-native';
import hoistNonReactStatic from 'hoist-non-react-statics';
import SliderContext from './SliderContext';


const getConsumer = (WrappedComponent: React.ComponentClass<any>) => (
  class SliderContextConsumer extends Component {
    contentRef: ElementRef<typeof View> | undefined;

    render() {
      return (
        <SliderContext.Consumer>
          {(context) => (
            <WrappedComponent
              ref={(r: ElementRef<typeof View>) => (this.contentRef = r)}
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
