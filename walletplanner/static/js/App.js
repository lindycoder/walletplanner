import React from 'react';
import AddTransactions from './AddTransactions';
import TransactionsView from './TransactionsView';
import {StaticMonthly} from './Periodicity';
import {moment} from './utils';
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
                <h1 className="display-4">Wallet Planner</h1>
                <AddTransactions server={this.props.server}
                                 onTransactionAdded={this.refreshTransactions.bind(this)}/>
                <TransactionsView transactions={this.state.transactions}
                                  periodicity={new StaticMonthly([1, 15])}
                                  currentDate={moment().startOf('day')}
                                  periodStart={-3}
                                  openingBalance={0}/>
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
