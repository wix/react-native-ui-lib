import React from 'react';

console.log('KeyboardTrackingView not supported on web');
class KeyboardTrackingView extends React.Component {
  static displayName = 'IGNORE';
  
  render() {
    return null;
  }
}

export default KeyboardTrackingView;
