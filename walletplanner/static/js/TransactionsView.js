import React from 'react';
import PropTypes from 'prop-types';
import TransactionBadge from './TransactionBadge';


class TransactionsView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let currentPeriod = this.props.periodicity.currentPeriod(this.props.currentDate);

        let displayedPeriods = [];

        let pastGen = this.props.periodicity.pastPeriods(this.props.currentDate);
        for (let i = this.props.periodStart; i < 0; i++) {
            displayedPeriods.unshift(pastGen.next().value);
        }

        displayedPeriods.push(currentPeriod);

        let futureGen = this.props.periodicity.futurePeriods(this.props.currentDate);
        for (let i = 0; i < 5; i++) {
            displayedPeriods.push(futureGen.next().value);
        }

        return (
            <div>
                {displayedPeriods.map((period, periodIndex) => (
                    <div key={periodIndex} className="transaction-view-period">
                        <div className="transaction-view-date">{period.start.format("YYYY-MM-DD")}</div>
                        {this.props.transactions
                                .filter(transaction => period.contains(transaction.date, { excludeEnd: true }))
                                .map((transaction, transactionIndex) => (
                            <TransactionBadge key={transactionIndex} transaction={transaction} />
                        ))}
                    </div>
                ))}
            </div>
        );
    }
};


TransactionsView.propTypes = {
  transactions: PropTypes.any.isRequired,
  periodicity: PropTypes.any.isRequired,
  currentDate: PropTypes.any.isRequired,
  periodStart: PropTypes.any.isRequired
};

export default TransactionsView;