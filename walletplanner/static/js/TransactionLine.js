import React from 'react';
import PropTypes from 'prop-types';
import CurrencyInput from 'react-currency-input';
import DatePicker from 'react-datepicker';


class TransactionLine extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            transaction: this.props.transaction
        }
    }

    handleAmountChange(event, maskedvalue, floatvalue) {
        const transaction = this.state.transaction;
        transaction.amount = Math.trunc(floatvalue * 100);

        this._update(transaction);
    }
    handleDateChange(date) {
        const transaction = this.state.transaction;
        transaction.date = date;

        this._update(transaction);
    }

    _update(transaction) {
        this.setState({transaction: transaction});

        if (typeof this.props.onChange === 'function') {
            this.props.onChange(this.state.transaction);
        }
    }

    render() {
        return (
            <div className="form-row">
              <div className="form-group col-sm-11">
               <DatePicker
                   selected={this.state.transaction.date}
                   onChange={this.handleDateChange.bind(this)}
                   className="transaction-line-date"
               />
               <CurrencyInput
                   value={this.format(this.state.transaction.amount)}
                   onChangeEvent={this.handleAmountChange.bind(this)}
                   className="transaction-line-amount"
               />
              </div>
            </div>
        );
    }

    format(amount) {
        return amount / 100;
    }
};


TransactionLine.propTypes = {
  transaction: PropTypes.any.isRequired,
  onChange: PropTypes.func
};

export default TransactionLine;