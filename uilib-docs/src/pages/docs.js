import React, {Component} from 'react';

import './docs.scss';
import Layout from '../components/layout';
import Navbar from '../components/navbar';

class Docs extends Component {
  state = {
    selectedComponentIndex: 0
  }

  render() {
    return (
      <Layout {...this.props} navbar={<Navbar/>}>
        <div className="docs-page">
          {/* <div className="docs-page__content"></div> */}
        </div>
      </Layout>
    );
  }
}

export default Docs;
