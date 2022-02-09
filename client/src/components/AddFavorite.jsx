import React from "react";
import { addFavorite } from "../actions/index";
import {  useDispatch } from "react-redux";
import { MdFavoriteBorder } from "react-icons/md";
import { MdFavorite } from "react-icons/md";
import styles from "./styless/Favorite.module.css";




export default function AddFavorite({ id, name, image }) {
  const dispatch = useDispatch();
  const [isFavorite, setIsFavorite] = React.useState(false);
  // const [favorites , setFavorites] = React.useState([]);

  //ESTADO GLOBAL DE FAVORITOS
  // const myFavorites = useSelector((state) => state.favorites);




  // const [dogFavourite , setDogFavourite] = React.useState([]);

  //ACCION QUE GUARDA EN LOCALSTORAGE LOS FAVORITOS
  // const saveToLocalStorage = (items) => {

  //   localStorage.setItem('dogs-favourites', JSON.stringify(items)) 
    
	
	// };

  

  function handleClick () {
    dispatch(addFavorite({ id, name, image })); 
    // setFavorites(myFavorites);
    // saveToLocalStorage(setFavorites);
    setIsFavorite(!isFavorite);
   
   
  
    // alert("Add to favourites");
  }
  return (
    <div>
      <button className={styles.btnFavoriteHome} onClick={() => handleClick()}>
        {isFavorite === false ? <MdFavoriteBorder /> : <MdFavorite />}{" "}
      </button>
    </div>
  );
}
