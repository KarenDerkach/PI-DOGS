import React from 'react'
import loading from '../img/Runningdog1.gif'
import styles from './styless/Loading.module.css'

export default function Loading() {
    return (
        <div className={styles.bkg}>
            <img src={loading} alt="loading gif" className={styles.loadingif}/>
            <div className={styles.loading}><h2>Loading...</h2></div>
        </div>
    )
}
