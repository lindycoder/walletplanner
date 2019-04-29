import React from 'react';
import PropTypes from 'prop-types';
import TransactionLine from './TransactionLine';

class AddTransactions extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            transactions: [
                {
                   "amount": 0,
                   "description": "",
                   "category": ""
                }
            ]
        }
    }

    letsgo(event){
        this.props.server.addTransaction(this.state.transactions[0]);
    }

    render() {
        return (
            <div>
                Add transactions
               <TransactionLine transaction={this.state.transactions[0]}/>
             <div className="col-sm-1">
               <button className="btn btn-primary" onClick={this.letsgo.bind(this)}>Submit</button>
             </div>
            </div>
        );
    }
};


AddTransactions.propTypes = {
  server: PropTypes.any.isRequired
};

export default AddTransactions;