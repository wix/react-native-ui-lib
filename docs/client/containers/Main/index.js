import React, {Component} from 'react';
import { Router, Route, Link, browserHistory } from 'react-router'
import _ from 'lodash';
import {DocsService} from '../../services';

import SideMenu from '../../components/SideMenu';
import ComponentPage from '../../components/ComponentPage';
import './style.scss';

export default class Main extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      components: [],
      props: [],
      propsByComponentId: {},
      selectedComponentIndex: 0,
    }

    this.selectComponent = this.selectComponent.bind(this);
    this.renderContent = this.renderContent.bind(this);
  }

  async componentWillMount() {
    const {components, props} = await DocsService.fetchDocs();
    const propsByComponentId = _.groupBy(props, 'componentId');
    this.setState({
      loading: false,
      components,
      props,
      propsByComponentId,
    });
  }

  selectComponent(index) {
    this.setState({
      selectedComponentIndex: index,
    });
  }

  renderContent() {
    const {components, propsByComponentId} = this.state;
    const {params, children} = this.props;
    const {componentId} = params;
    if (componentId) {
      const component = _.find(components, component => component.displayName === componentId);
      const props = propsByComponentId[component.displayName];
      return children && React.cloneElement(children, { component, props }) ;
    }

    return children;
  }

  render() {
    const {loading, components} = this.state;
    const {location} = this.props;
    if (loading) {
      return (
        <div>
          Loading Components...
        </div>
      );
    }

    // if (_.isEmpty(components)) {
    //   return null;
    // }

    return (
      <div className="main">
        <SideMenu components={components} location={location}/>
        <div className="content">
            {/*<ComponentPage component={component} props={props}/>*/}
            {this.renderContent()}
        </div>
      </div>
    );
  }
}

