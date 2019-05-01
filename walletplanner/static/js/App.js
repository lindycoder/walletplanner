import React from 'react';
import AddTransactions from './AddTransactions';
import Server from './Server';
import PropTypes from 'prop-types';

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        server: new Server(this.props.apiCatalog)
    }
  }

  render() {
    return (
      <div className="App container">
        <h1 className="display-4">Wall Planner</h1>
        <AddTransactions server={this.state.server} />
      </div>
    )
  }
}

App.propTypes = {
  homeUrl: PropTypes.string.isRequired,
  echoUrl: PropTypes.string.isRequired,
  apiCatalog: PropTypes.object.isRequired,
};

export default App;
