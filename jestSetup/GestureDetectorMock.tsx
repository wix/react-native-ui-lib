import React from 'react';
import {TouchableOpacity} from 'react-native';

type Props = {
  gesture: any;
  children: any;
};

const DEFAULT_DATA = {
  absoluteX: 0,
  absoluteY: 0,
  translationX: 0,
  translationY: 0,
  velocityX: 0,
  velocityY: 0,
  x: 0,
  y: 0
};

export class GestureDetectorMock extends React.Component<Props> {
  render() {
    switch (this.props.gesture.type) {
      case 'tap':
        return (
          <TouchableOpacity
            onPress={() => {
              this.props.gesture._handlers.onTouchesDown?.();
              this.props.gesture._handlers.onEnd?.();
              this.props.gesture._handlers.onFinalize?.();
            }}
          >
            {this.props.children}
          </TouchableOpacity>
        );
      case 'pan':
        return (
          <TouchableOpacity
            onPress={(data) => {
              this.props.gesture._handlers.onStart?.(DEFAULT_DATA);
              if (Array.isArray(data)) {
                data.forEach(info => {
                  this.props.gesture._handlers.onUpdate?.({...DEFAULT_DATA, ...info});
                });
              } else {
                this.props.gesture._handlers.onUpdate?.({...DEFAULT_DATA, ...data});
              }
              this.props.gesture._handlers.onEnd?.(DEFAULT_DATA);
              this.props.gesture._handlers.onFinalize?.(DEFAULT_DATA);
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
