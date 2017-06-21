import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';

// CONTAINERS
import Intro from './containers/Intro';

ReactDOM.render(
  <BrowserRouter>
    <Intro/>
  </BrowserRouter>,
  document.getElementById('root'),
);
