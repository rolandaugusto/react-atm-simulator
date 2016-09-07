import React from 'react';
import styles from './../../App.css';

export default class ProcessingScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div className={styles.bap}>
                {this.props.message}
            </div>
        );
    }
}
