import React from 'react';

function asClassComponent(WrappedComponent: React.ComponentType<any>): React.ComponentClass<any> {
  class ClassComponent extends React.Component {
    render() {
      return <WrappedComponent {...this.props}/>;
    }
  }

  return ClassComponent;
}

export default asClassComponent;
