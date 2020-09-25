import React, {Component, Ref} from 'react';
import PanningContext from './panningContext';

function asPanViewConsumer<PROPS>(WrappedComponent: React.ComponentType<any>): React.ComponentClass<PROPS> {
  class PanViewConsumer extends Component<PROPS> {
    contentRef: any;

    saveRef = (r: Ref<React.Component<any>>) => {
      this.contentRef = r;
    };

    render() {
      return (
        <PanningContext.Consumer>
          {context => <WrappedComponent ref={this.saveRef} context={context} {...this.props}/>}
        </PanningContext.Consumer>
      );
    }
  }

  return PanViewConsumer as any;
}

export default asPanViewConsumer;
