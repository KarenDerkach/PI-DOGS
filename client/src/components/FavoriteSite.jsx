import React from "react";
import { removeFavorite } from "../actions/index";
import { useSelector, useDispatch } from "react-redux";
import styles from "./styless/Favorite.module.css";
import { MdFavorite } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import swal from 'sweetalert'

export default function FavoriteSite() {
  const dispatch = useDispatch();
  const myFavorites = useSelector((state) => state.favorites);

  // const deleteToLocalStorage = (items) => {
  // 	localStorage.setItem('react-dogs-app-favourites', JSON.stringify(items));
  // };

  // useEffect(() => {
  // const dogsFavourites = JSON.parse(
  //   localStorage.getItem('dogs-favourites')

  // )

  // }, []);
  function handleDelete(element) {
    dispatch(removeFavorite(element.id));
    swal("Remove from favorites", {
      buttons: false,
      timer: 3000,
    });
  }

  return (
    <div className={styles.containerFavList}>
      <h1 className={styles.title}> FAVOURITES</h1>
      <div className={styles.box}>
        {myFavorites.length > 0 ? (
          myFavorites.map((element) => {
            return (
              <div className={styles.fav} key={element.id}>
                <img className={styles.imgfav} src={element.image} alt="woof" />{" "}
                  <h2 className={styles.nameFav}>
                    {element.name} <MdFavorite className={styles.iconHeart} />
                  </h2>
                
                <button
                  className={styles.btn}
                  onClick={() => handleDelete(element)}
                >
                  {" "}
                  <MdDelete />
                </button>
              </div>
            );
          })
        ) : (
          <h1 className={styles.favNotFound}>
            Not found favourites dogs <br/> in the list
          </h1>
        )}
      </div>
    </div>
  );
}
