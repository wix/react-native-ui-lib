import React from 'react';
import {TouchableOpacity} from 'react-native';

type Props = {
  gesture: any;
  children: any;
};

export class GestureDetectorMock extends React.Component<Props> {
  render() {
    switch (this.props.gesture.type) {
      case 'tap':
        return (
          <TouchableOpacity
            onPress={() => {
              this.props.gesture._handlers.onTouchesDown();
              this.props.gesture._handlers.onEnd();
              this.props.gesture._handlers.onFinalize();
            }}
          >
            {this.props.children}
          </TouchableOpacity>
        );
      case 'pan':
        return (
          <TouchableOpacity
            onPress={() => {
              this.props.gesture._handlers.onStart({
                absoluteX: 0,
                absoluteY: 0,
                translationX: 0,
                translationY: 0,
                velocityX: 0,
                velocityY: 0,
                x: 0,
                y: 0
              });
              this.props.gesture._handlers.onUpdate({
                absoluteX: 0,
                absoluteY: 0,
                translationX: 0,
                translationY: 0,
                velocityX: 0,
                velocityY: 0,
                x: 0,
                y: 0
              });
              this.props.gesture._handlers.onEnd({
                absoluteX: 0,
                absoluteY: 0,
                translationX: 0,
                translationY: 0,
                velocityX: 0,
                velocityY: 0,
                x: 0,
                y: 0
              });
            }}
          >
            {this.props.children}
          </TouchableOpacity>
        );
      default:
        throw new Error(`Unhandled gesture of type: ${this.props.gesture.type}`);
    }
  }
}
