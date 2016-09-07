import React from 'react';
import styles from './../../App.css';
import {steps as STEPS} from './../../steps';

const card1 = require('./../../img/card1.png');
const card2 = require('./../../img/card2.png');
const card3 = require('./../../img/card3.png');


export default class Welcome extends React.Component {
    constructor(props) {
        super(props);
        
        this.insertCard = this.insertCard.bind(this);
    }

    insertCard(img) {
        this.props.onInsertCard(true, img);
        this.props.updateStep(STEPS.ENTER_PIN, 'Reading your card...');
    }

    render() {

        return (
            <div className={styles.bap}>
                Welcome!<br />
                Please choose one of your cards

                <p>
                    <button className={styles.card} onClick={() => this.insertCard(card1)}>
                        <img className={styles.cardImage} src={card1}/>
                    </button>
                    <button className={styles.card} onClick={() => this.insertCard(card2)}>
                        <img className={styles.cardImage} src={card2}/>
                    </button>
                    <button className={styles.card} onClick={() => this.insertCard(card3)}>
                        <img className={styles.cardImage} src={card3}/>
                    </button>
                </p>
            </div>
        );
    }
}
