import React from 'react';
import { Link } from 'react-router-dom';
import styles from './styless/LandingPage.module.css'
import {AiOutlineArrowRight} from "react-icons/ai"
import video from './../img/video.mp4'
//import 'animate.css'

export default function LandingPage() {
    return(
        <div className={styles.container}>
            <h1 className={styles.title}>Welcome </h1>
            <h2 className={styles.subtitle}>to the world of dogs</h2>
            <video className={styles.background} muted autoPlay loop src={video} />
            <Link to ='/home'>
                <button className={styles.button}><AiOutlineArrowRight/> </button>
            </Link>
        </div>
    )
}