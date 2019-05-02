import React from 'react';
import PropTypes from 'prop-types';
import CurrencyInput from 'react-currency-input';


class TransactionBadge extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="list-group-item transaction-badge-amount">{this.formatAmount(this.props.transaction.amount)}</div>
        );
    }

    formatAmount(amount) {
        return `${(amount / 100).toFixed(2)}$`
    }
};


TransactionBadge.propTypes = {
  transaction: PropTypes.any.isRequired
};

export default TransactionBadge;