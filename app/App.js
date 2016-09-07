import React from 'react';
import styles from './App.css';
import {steps as STEPS} from './steps';
import Pad from './components/Pad';
import Welcome from './components/steps/Welcome';
import EnterPIN from './components/steps/EnterPIN';
import SelectAmount from './components/steps/SelectAmount';
import TakeYourMoney from './components/steps/TakeYourMoney';
import ProcessingScreen from './components/steps/ProcessingScreen';

let processingTimeout;

/*
    Main Class which acts as an orchestrator.

    The App renders all the steps and manages the global states
 */
export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            step: STEPS.INSERT_CARD,
            isCardPresent: false,
            cardImg: null,
            processMsg: 'Processing...'
        };

        // Since I am using a ES6 class the methods need to be bound
        this.previousStep = this.previousStep.bind(this);
        this.handleCardAction = this.handleCardAction.bind(this);
        this.updateStep = this.updateStep.bind(this);
        this.reset = this.reset.bind(this);
        this.handleAbort = this.handleAbort.bind(this);
    }
    componentDidMount() {
        // A listener for when the user presses the cancel button
        window.addEventListener('cancel', this.handleAbort);
    }
    componentWillUnmount() {
        // Clean up memory
        window.removeEventListener('cancel', this.handleAbort);
        if (processingTimeout) {
            clearTimeout(processingTimeout);
        }
    }
    handleAbort() {
        this.reset();
    }
    reset(message) {
        this.updateStep(STEPS.INSERT_CARD, message);
        this.handleCardAction(false, null);
    }
    // Controls the step execution from a central place
    updateStep(nextStep, message = 'Processing...') {
        this.setState({processMsg: message});
        this.setState({step: STEPS.PROCESSING});
        // The waiting time is a random value between 1-3 seconds
        processingTimeout = setTimeout(() => this.setState({step: nextStep}), Math.random() * 3000);
    }
    previousStep() {
        this.setState({step: (this.state.step - 1)});
    }
    // Determines whether a card is inserted or not
    handleCardAction(cardInserted, img) {
        this.setState({isCardPresent: cardInserted});
        this.setState({cardImg: img});
    }

    render() {
        let step;

        // The app consists of 4 Main steps plus the 'processing' screen
        switch (this.state.step) {
            case STEPS.INSERT_CARD:
                step = <Welcome onInsertCard={this.handleCardAction} updateStep={this.updateStep} />;
                break;
            case STEPS.ENTER_PIN:
                step = <EnterPIN updateStep={this.updateStep} previousStep={this.previousStep} />;
                break;
            case STEPS.SELECT_AMOUNT:
                step = <SelectAmount updateStep={this.updateStep} previousStep={this.previousStep} />;
                break;
            case STEPS.TAKE_YOUR_MONEY:
                step = <TakeYourMoney reset={this.reset}/>;
                break;
            default: // Processing is the default step
                step = <ProcessingScreen updateStep={this.updateStep} message={this.state.processMsg} />;
                break;
        }

        return (
            <div className={styles.app}>
                <div className={styles.screen}>
                    {step}
                </div>
                <Pad currentCard={this.state.cardImg}/>
            </div>
        );
    }
}
