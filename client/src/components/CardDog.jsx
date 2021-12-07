import React from 'react'
import imgdefault from '../img/createDog_1.jpg'
import styles from './styless/CardDog.module.css'

function CardDog({ name, temperament, temperaments, image, weight_min}) {
  
  if (!temperaments) {
    return (
      <div className={styles.container}>
        <div className={styles.card}>
        <img src={image} alt="img not found" />
        <h3>{name}</h3>
        <p>{temperament}</p>
        <p>{weight_min} kg </p>
      </div>
      </div>
    );
  } else {
    return (
      <div className={styles.container}>
        <div className={styles.card}>
        <img src={imgdefault} alt="img not found"  />
        <h3>{name}</h3>
        <p>{temperaments?.map((temp) => temp.name).join(", ")}</p>
        <p>{weight_min} kg</p>
      </div>
      </div>
    );
  }
}

export default CardDog
