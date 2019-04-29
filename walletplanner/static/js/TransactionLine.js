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

    handleChange(event, maskedvalue, floatvalue){
        this.setState({transaction: {amount: maskedvalue}});
        this.props.onChange()
    }

    render() {
        return (
            <div className="form-row">
              <div className="form-group col-sm-11">
               <CurrencyInput value={this.state.transaction.amount} onChangeEvent={this.handleChange.bind(this)}/>
              </div>
            </div>
        );
    }
};


TransactionLine.propTypes = {
  transaction: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired
};

export default TransactionLine;