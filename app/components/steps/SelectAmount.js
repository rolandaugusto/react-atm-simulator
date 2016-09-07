import React from 'react';
import styles from './../../App.css';
import classnames from 'classnames';
import {steps as STEPS} from './../../steps';

let shakeTimeout;

// This Class behaves almost the same as EnterPIN. In fact we could extend both classes from a more general
// class.
export default class SelectAmount extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            inputValue: '',
            customAmountActive: false,
            mustShake: false,
            errorMessage: ''

        };
        this.nextStep = this.nextStep.bind(this);
        this.toggleCustomAmount = this.toggleCustomAmount.bind(this);
        this.validateAmount = this.validateAmount.bind(this);
        this.updateValue = this.updateValue.bind(this);
        this.clearInput = this.clearInput.bind(this);
        this.addNumberFromPad = this.addNumberFromPad.bind(this);
    }
    componentDidMount() {
        window.addEventListener('enter', this.validateAmount);
        window.addEventListener('clear', this.clearInput);
        window.addEventListener('number', this.addNumberFromPad);
    }
    componentWillUnmount() {
        window.removeEventListener('enter', this.validateAmount);
        window.removeEventListener('clear', this.clearInput);
        window.removeEventListener('number', this.addNumberFromPad);
        clearTimeout(shakeTimeout);
    }
    updateValue(e) {
        this.setState({inputValue: e.target.value})
    }
    clearInput() {
        this.setState({inputValue: ''});
    }
    addNumberFromPad(e) {
        let currVal = this.state.inputValue.toString();
        if (currVal.length === 4) return;
        let val = (currVal === '') ? e.detail : currVal.concat(e.detail);
        this.setState({inputValue: val});
    }
    nextStep() {
        this.props.updateStep(STEPS.TAKE_YOUR_MONEY, 'The ATM is preparing to deliver the amount requested...');
    }
    toggleCustomAmount() {
        this.setState({customAmountActive: !this.state.customAmountActive});
    }

    validateAmount() {
        if (this.state.inputValue !== '' && (this.state.inputValue % 10) === 0) {
            this.nextStep();
        }
        else {
            this.setState({errorMessage: 'Wrong Amount!'});
            this.setState({mustShake: true});
            shakeTimeout = setTimeout(() => this.setState({mustShake: false}), 500);
        }
    }

    render() {

        let defaulCssClasses = classnames({
            [styles.amountDefault]: true,
            [styles.hidden]: this.state.customAmountActive
        });

        let customCssClasses = classnames({
            [styles.hidden]: !this.state.customAmountActive
        });

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
                Select the Amount to Withdraw
                <div className={defaulCssClasses}>
                    <div className={styles.panelLeft}>
                        <button className={styles.buttonAmount} onClick={this.nextStep}>20</button>
                        <button className={styles.buttonAmount} onClick={this.nextStep}>80</button>
                        <button className={styles.buttonAmount} onClick={this.nextStep}>200</button>
                    </div>
                    <div className={styles.panelRight}>
                        <button className={styles.buttonAmount} onClick={this.nextStep}>40</button>
                        <button className={styles.buttonAmount} onClick={this.nextStep}>100</button>
                        <button className={styles.buttonAmount} onClick={this.toggleCustomAmount}>Other</button>
                    </div>
                </div>
                <div className={customCssClasses}>
                    {
                        this.state.errorMessage !== '' ?
                            <p className={errorMessagesCssClasses}>{this.state.errorMessage}</p> :
                            ''
                    }
                    <p>
                        <input
                            className={styles.input}
                            placeholder='0.00'
                            onChange={this.updateValue}
                            type='text'
                            autoComplete='off'
                            value={this.state.inputValue}
                            required
                        />
                    </p>

                </div>
            </div>
        );
    }
}
