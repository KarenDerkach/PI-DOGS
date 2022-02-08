import React from "react";
import { removeFavorite } from "../actions/index";
import { useSelector, useDispatch } from "react-redux";
import styles from "./styless/Favorite.module.css";
import { MdFavorite } from "react-icons/md";
import { MdDelete } from "react-icons/md";

export default function FavoriteSite() {
  const dispatch = useDispatch();
  const myFavorites = useSelector((state) => state.favorites);

  console.log(myFavorites);

  function handleDelete(element) {
    dispatch(removeFavorite(element.id));
    alert("Remove from favourites");
  }
  return (
    <div>
      <h1 className={styles.title}> FAVORITES</h1>
      <div className={styles.box}>
        {myFavorites?.map((element) => {
          return (
            <div className={styles.fav} key={element.id}>
              <h2>{element.name} </h2>
              <div>
                {" "}
                <img
                  className={styles.imgfav}
                  src={element.image}
                  alt="woof"
                />{" "}
              </div>
              <MdFavorite />
              <button
                className={styles.btn}
                onClick={() => handleDelete(element)}
              >
                {" "}
                <MdDelete />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
