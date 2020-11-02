import React from 'react';
import styles from './labelHeader.module.css';

const LabelHeader = ({label}) => {
    return ( 
        <div className={styles.header}>
            {label}
        </div>
    );
}
 
export default LabelHeader;