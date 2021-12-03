import React from 'react';
import { Link } from 'react-router-dom';
import styles from './styless/LandingPage.module.css'
import {AiOutlineArrowRight} from "react-icons/ai"

export default function LandingPage() {
    return(
        <div className={styles.background}>
            <h1 className={styles.title}>Welcome </h1>
            <h2 className={styles.subtitle}>to the world of dogs</h2>
            <Link to ='/home'>
                <button className={styles.button}><AiOutlineArrowRight/> </button>
            </Link>
        </div>
    )
}