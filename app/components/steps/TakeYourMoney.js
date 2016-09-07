import React from 'react';
import styles from './../../App.css';

let timeout;

export default class TakeYourMoney extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        timeout = setTimeout(this.props.reset, 3000);
    }
    componentWillUnmount() {
        clearTimeout(timeout);
    }

    render() {

        return (
            <div className={styles.bap}>
                Please get your card and take your money
                <p>
                    <img src={require('./../../img/money.png')} />
                </p>
            </div>
        );
    }
}
