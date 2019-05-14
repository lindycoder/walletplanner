import React from 'react';
import PropTypes from 'prop-types';
import TransactionsPeriodView from './TransactionsPeriodView';
import Period, {InitialPeriod} from "./Period";
import {moment} from './utils';


export default class TransactionsView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let transactions = this.withRecurrences();

        let firstTransactionDate = transactions.reduce(
            (min, transaction) => transaction.date < min ? transaction.date : min,
            this.props.currentDate
        );

        let previousPeriod = new InitialPeriod(this.props.openingBalance);

        let periods = [];

        let currentPeriod = this.props.periodicity.currentPeriod(this.props.currentDate);
        let currentPeriodIndex;

        let beforeFirst = this.props.periodicity.pastPeriods(firstTransactionDate).next().value;
        for (let range of this.props.periodicity.futurePeriods(beforeFirst.start)) {
            periods.push(new Period({
                openingBalance: previousPeriod.getClosingBalance(),
                range: range,
                transactions: transactions.filter(
                    transaction => range.contains(transaction.date, {excludeEnd: true})
                )
            }));

            previousPeriod = periods[periods.length - 1];

            if (range.isSame(currentPeriod)) {
                currentPeriodIndex = periods.length - 1;
            }
            if (periods.length === currentPeriodIndex + 6) {
                break;
            }
        }

        let displayedPeriods = periods.slice(Math.max(0, currentPeriodIndex - 3));

        let pastGenerator = this.props.periodicity.pastPeriods(displayedPeriods[0].range.start);
        while (displayedPeriods.length < 9) {
            displayedPeriods.unshift(new Period({
                openingBalance: this.props.openingBalance,
                range: pastGenerator.next().value,
                transactions: []
            }));
        }

        return (
            <div className="container">
                <div className="row">
                    {displayedPeriods.map((period, periodIndex) => (
                        <TransactionsPeriodView
                            key={periodIndex}
                            className="transaction-view-period col-sm"
                            period={period}
                        />
                    ))}
                </div>
            </div>
        );
    }

    withRecurrences() {
        let transactions = this.props.transactions.slice();

        if (this.props.recurrences) {
            this.props.recurrences.forEach((recurrence => {
                let newTransaction = Object.assign({}, recurrence.transaction);
                for (let i = 0; i <= 100; i++) {
                    transactions.push(newTransaction);

                    newTransaction = Object.assign({}, newTransaction);
                    newTransaction.date = moment(newTransaction.date).add(recurrence.interval);
                }
            }))
        }

        return transactions
    }
}


TransactionsView.propTypes = {
    transactions: PropTypes.any.isRequired,
    recurrences: PropTypes.any,
    periodicity: PropTypes.any.isRequired,
    currentDate: PropTypes.any.isRequired,
    periodStart: PropTypes.any.isRequired
};
