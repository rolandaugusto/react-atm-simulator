import React from 'react';
import styles from './../../App.css';
import classnames from 'classnames';
import {steps as STEPS} from './../../steps';

let shakeTimeout;

export default class EnterPIN extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: '',
            errorMessage: '',
            mustShake: false
        };

        this.updateValue = this.updateValue.bind(this);
        this.validateAndContinue = this.validateAndContinue.bind(this);
        this.clearInput = this.clearInput.bind(this);
        this.addNumberFromPad = this.addNumberFromPad.bind(this);
    }
    componentDidMount() {
        // Add listeners for the number pad events
        window.addEventListener('enter', this.validateAndContinue);
        window.addEventListener('clear', this.clearInput);
        window.addEventListener('number', this.addNumberFromPad);
    }
    componentWillUnmount() {
        // Clean from memory
        window.removeEventListener('enter', this.validateAndContinue);
        window.removeEventListener('clear', this.clearInput);
        window.removeEventListener('number', this.addNumberFromPad);
        clearTimeout(shakeTimeout);
    }
    addNumberFromPad(e) {
        // If the user adds a digit from the pad we append it and check that is not longer than 4 chars
        let currVal = this.state.inputValue.toString();
        if (currVal.length === 4) return;
        let val = (currVal === '') ? e.detail : currVal.concat(e.detail);
        this.setState({inputValue: val});
    }
    clearInput() {
        this.setState({inputValue: ''});
    }
    // Manages the input field
    updateValue(e) {
        this.setState({inputValue: e.target.value});
    }
    // Validates that the user input is correct. If not, shows an error message
    validateAndContinue(){
        if (this.state.inputValue === '1234') {
            this.props.updateStep(STEPS.SELECT_AMOUNT);
        }
        else {
            this.setState({errorMessage: 'Wrong PIN!'});
            this.setState({mustShake: true});
            this.setState({inputValue: ''});
            shakeTimeout = setTimeout(() => this.setState({mustShake: false}), 500);
        }
    }

    render() {

        // Here we use the Classnames utility to add css classes conditionally
        let errorMessagesCssClasses = classnames({
            [styles.redText]: true,
            [styles.shake]: this.state.mustShake
        });

        return (
            <div className={styles.bap}>
                <button
                    className={styles.buttonBack}
                    onClick={() => this.props.previousStep()}
                >
                    BACK
                </button>
                <p>Insert your PIN</p>
                {
                    this.state.errorMessage !== '' ?
                    <p className={errorMessagesCssClasses}>{this.state.errorMessage}</p> :
                    ''
                }
                <p>
                    <input
                        className={styles.input}
                        placeholder='XXXX'
                        maxLength='4'
                        required
                        onChange={this.updateValue}
                        type='password'
                        autoComplete='off'
                        value={this.state.inputValue}
                    />
                </p>
            </div>
        );
    }
}
