import React from 'react';
import AddTransactions from './AddTransactions';
import TransactionsView from './TransactionsView';
import Server from './Server';
import PropTypes from 'prop-types';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        transactions: []
    }
  }

  render() {
    return (
      <div className="App container">
        <h1 className="display-4">Wall Planner</h1>
        <AddTransactions server={this.props.server} onTransactionAdded={this.refreshTransactions.bind(this)}/>
        <TransactionsView transactions={this.state.transactions}/>
      </div>
    )
  }

   refreshTransactions() {
      this.props.server.getTransactions()
        .then(ts => this.setState({transactions: ts}));
  }
}

App.propTypes = {
  homeUrl: PropTypes.string.isRequired,
  echoUrl: PropTypes.string.isRequired,
  server: PropTypes.object.isRequired,
};

export default App;
