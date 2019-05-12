import React from 'react';
import PropTypes from 'prop-types';
import TransactionBadge from "./TransactionBadge";


export default class TransactionsPeriodView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={this.props.className}>
                <div className="transaction-view-date">{this.props.period.start.format("YYYY-MM-DD")}</div>
                <div className="transactions">
                    {this.props.transactions.map((transaction, transactionIndex) => (
                        <TransactionBadge key={transactionIndex} transaction={transaction}/>
                    ))}
                </div>
                <div className="transactions-total">
                    {formatAmount(this.props.transactions.reduce((total, e) => total + e.amount, 0))}
                </div>
            </div>
        )
    }
};

TransactionsPeriodView.propTypes = {
    period: PropTypes.any.isRequired,
    transactions: PropTypes.any.isRequired
};


function formatAmount(amount) {
    return `${(amount / 100).toFixed(2)}$`
}