import React from "react";
import { Link } from "react-router-dom";
import AddFavorite from "./AddFavorite";
import styles from "./styless/CardDog.module.css";

function CardDog({ id, name, temperament, temperaments, image, weight_min }) {
  if (!temperaments) {
    return (
      <div className={styles.card}>
        <Link
          to={`/dogs/${id}`}
          style={{ textDecoration: "none", color: "black" }}
        >
          <div >
            <img src={image} alt="img not found" className={styles.imgcard} />
            <h3>{name}</h3>
            <p>{temperament}</p>
            <p>{weight_min} kg </p>
          </div>
        </Link>
        <AddFavorite id={id} name={name} image={image} />
      </div>
    );
  } else {
    return (
      <div className={styles.container}>
        <Link
          to={`/dogs/${id}`}
          style={{ textDecoration: "none", color: "black" }}
        >
          <div className={styles.card}>
            <img src={image} alt="img not found" className={styles.imgcard} />
            <h3>{name}</h3>
            <p>{temperaments?.map((temp) => temp.name).join(", ")}</p>
            <p>{weight_min} kg</p>
          </div>
        </Link>
        <AddFavorite id={id} name={name} image={image} />
      </div>
    );
  }
}

export default CardDog;
