import React from 'react';
import PropTypes from 'prop-types';
import TransactionsPeriodView from './TransactionsPeriodView';
import Period, {InitialPeriod} from "./Period";


export default class TransactionsView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let firstTransactionDate = this.props.transactions.reduce(
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
                transactions: this.props.transactions.filter(
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
}


TransactionsView.propTypes = {
    transactions: PropTypes.any.isRequired,
    periodicity: PropTypes.any.isRequired,
    currentDate: PropTypes.any.isRequired,
    periodStart: PropTypes.any.isRequired
};
