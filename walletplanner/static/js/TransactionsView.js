import React from 'react';
import PropTypes from 'prop-types';
import TransactionsPeriodView from './TransactionsPeriodView';
import Period from "./Period";


export default class TransactionsView extends React.Component {
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
            <div className="container">
                <div className="row">
                    {displayedPeriods.map((period, periodIndex) => (
                        <TransactionsPeriodView
                            key={periodIndex}
                            className="transaction-view-period col-sm"
                            period={new Period({
                                openingBalance: 0,
                                range: period,
                                transactions: this.props.transactions.filter(
                                    transaction => period.contains(transaction.date, {excludeEnd: true})
                                )
                            })}
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
