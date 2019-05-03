import React from 'react';
import PropTypes from 'prop-types';
import CurrencyInput from 'react-currency-input';


class TransactionLine extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            transaction: this.props.transaction
        }
    }

    handleChange(event, maskedvalue, floatvalue) {
        const transaction = this.state.transaction;
        transaction.amount = Math.trunc(floatvalue * 100);

        this.setState({transaction: transaction});

        if (typeof this.props.onChange === 'function') {
            this.props.onChange(this.state.transaction);
        }
    }

    render() {
        return (
            <div className="form-row">
              <div className="form-group col-sm-11">
               <CurrencyInput value={this.format(this.state.transaction.amount)} onChangeEvent={this.handleChange.bind(this)}/>
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