import React, {Component} from 'react';
import './style.scss';

const LIB_TITLE = '<RN UI LIB>';

export default class Intro extends Component {
  render() {
    return (
      <div className="intro">

        <ul className="topbar">
          <li> <a target="_blank" href="https://github.com/wix/react-native-ui-lib">GITHUB</a></li>
          <li><a href="/docs">DOCS</a></li>
        </ul>

        <div className="welcome">
          <div className="big-title">{LIB_TITLE}</div>
          <div className="subtitle">Powerfull cross-platform UI components library for React Native</div>
        </div>
      </div>
    );
  }
}

