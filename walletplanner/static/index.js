import "babel-polyfill";
import React from 'react';
import * as ReactDOM from 'react-dom';
import App from './js/App';
import Server from './js/Server';

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import "react-datepicker/dist/react-datepicker.css";
import './js/App.css';

/** Initialize the main application page */
window.initApp = ({homeUrl, echoUrl, apiCatalog}) => {
  ReactDOM.render(
    <App
      homeUrl={homeUrl}
      echoUrl={echoUrl}
      server={new Server(apiCatalog)} />,
    document.getElementById('root'));
}
