import React  from "react";
import { removeFavorite } from "../actions/index";
import { useSelector, useDispatch } from "react-redux";
import styles from "./styless/Favorite.module.css";
import { MdFavorite } from "react-icons/md";
import { MdDelete } from "react-icons/md";

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



    alert("Remove from favourites");
  }

  return (
    
      <div className={styles.containerFavList}>
        <div className={styles.containerFav}/>
      <h1 className={styles.title}> FAVOURITES</h1>
      <div className={styles.box}>
        {myFavorites.length > 0 ? myFavorites.map((element) => {
          return (
            <div className={styles.fav} key={element.id}>
            
              <div>
                {" "}
                <img
                  className={styles.imgfav}
                  src={element.image}
                  alt="woof"
                />{" "}
                <div className={styles.containerName}>
                <h2 className={styles.nameFav}>{element.name} <MdFavorite /></h2>
                </div>
                <button
                className={styles.btn}
                onClick={() => handleDelete(element)}
              >
                {" "}
                <MdDelete />
              </button>
              </div>
              
            </div>
          );
        }): <h1 className={styles.favNotFound}>Not found favourites dogs in the list</h1>}
      </div>
      </div>

  );
}
