import React, {Component} from 'react';

import './docs.scss';

class Docs extends Component {
  state = {
    selectedComponentIndex: 0,
  };

  render() {
    return (
      <div className="docs-page">
        <div className="docs-page__content" />
      </div>
    );
  }
}

export default Docs;
