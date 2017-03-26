import React from 'react';
import {Modal as RNModal} from 'react-native';
import {LoaderScreen} from 'react-native-ui-lib';//eslint-disable-line
import {BaseComponent} from '../../commons';
import TopBar from './TopBar';


export default class Modal extends BaseComponent {

  render() {
    return (
      <RNModal {...this.props}/>
    );
  }
}

Modal.TopBar = TopBar;
