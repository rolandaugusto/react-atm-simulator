import React from 'react';
import styles from './../Pad.css';
import classnames from 'classnames';

export default class Pad extends React.Component {
    constructor(props) {
        super(props);

        this.handleNumber = this.handleNumber.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleEnter = this.handleEnter.bind(this);
    }

    handleNumber(num) {
        let event = new CustomEvent('number', {'detail': num});
        window.dispatchEvent(event);
    }

    handleEnter() {
        let event = new Event('enter');
        window.dispatchEvent(event);
    }
    handleCancel() {
        let event = new Event('cancel');
        window.dispatchEvent(event);
    }
    handleClear() {
        let event = new Event('clear');
        window.dispatchEvent(event);
    }
    render() {
        let buttons = [];

        for(let i = 1; i < 11; i++) {
            buttons.push(
                <button
                    key={i}
                    className={i === 10 ? styles.number0 : styles.number}
                    onClick={() => this.handleNumber(i === 10 ? 0 : i)}
                />
            );
        }

        let cardReaderClasses = classnames({
            [styles.cardReader]: true,
            [styles.cardReaderIdle]: this.props.currentCard === null
        });
        let card = this.props.currentCard !== null ?
             (
                 <div>
                     <img className={styles.card} src={this.props.currentCard} />
                 </div>
            ) : ''
        ;
        return (
            <div className={styles.padWrapper}>
                <div className={styles.cardHolder}>
                    <div>
                        <div className={cardReaderClasses}>
                            <span className={styles.cardReaderLabel}>CARD</span>
                        </div>
                        {card}
                    </div>
                </div>
                <div className={styles.pad}>
                    <div className={styles.numbers}>
                        {buttons}
                    </div>
                    <div className={styles.ctas}>
                        <button className={styles.cta} onClick={this.handleCancel} />
                        <button className={styles.cta} onClick={this.handleClear} />
                        <button className={styles.cta} onClick={this.handleEnter} />
                    </div>
                </div>
            </div>
        );
    }
}
