import React from 'react';
import {BaseComponent} from '../../commons';
import Toast from '../toast';

export default class Notification extends BaseComponent {
  constructor(props) {
    super(props);
    console.warn('"Notification" component will be changed soon, please use "Toast" component instead.');
  }

  render() {
    return <Toast {...this.props} />;
  }
}
