import React from 'react';
import PropTypes from 'prop-types';
import TransactionBadge from './TransactionBadge';


class TransactionsView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                {this.props.transactions.map((transaction, index) => (
                    <TransactionBadge key={index} transaction={transaction} />
                ))}
            </div>
        );
    }
};


TransactionsView.propTypes = {
  transactions: PropTypes.any.isRequired
};

export default TransactionsView;