import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../img/dog.png' 

import styles from './styless/Header.module.css'

function Header() {
 

    return (
        <nav className={styles.container}>
            
           <Link to='/home' className={styles.link}>
            <img src={logo} alt="logo" height="100px" className={styles.img} />
            <span className={styles.title}>DOGS WORLD</span>
            </Link>
           

        </nav>
    )
}

export default Header
