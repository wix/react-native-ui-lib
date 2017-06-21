import React, {Component} from 'react';
import ReactMarkdown from 'react-markdown';
import readme from './README.md';

// todo: should get this information out of a README.md
export default class Modifiers extends Component {
  render() {
    return (
      <div className="modifiers page">
        <ReactMarkdown source={readme}/>
      </div>
    );
  }
}
