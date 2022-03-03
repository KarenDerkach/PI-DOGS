import React,
  { useState} 
 from "react";
import { addFavorite } from "../actions/index";
import {  useDispatch } from "react-redux";
import { MdFavoriteBorder } from "react-icons/md";
import { MdFavorite } from "react-icons/md";

import styles from "./styless/Favorite.module.css";





export default function AddFavorite({ id, name, image }) {
  const dispatch = useDispatch();
  //ESTADO GLOBAL DE FAVORITOS
//  const myFavorites = useSelector((state) => state.favorites);

  const [isFavorite, setIsFavorite] = useState(false);
  // const [favourite , setFavourite] = useState([myFavorites],[], ()=>{
  //   const data = localStorage.getItem( 'dogs-favourites');
  //   return data ? JSON.parse(data) : [];
  // })



// useEffect(()=>{
//   localStorage.setItem( 'dogs-favourites', JSON.stringify(myFavorites) );
// }, [myFavorites, favourite])
  

   function handleClick (event) {
    event.preventDefault();
   dispatch(addFavorite({ id, name, image })); 
    // setFavourite(myFavorites);
    setIsFavorite(!isFavorite);
    // alert("Add to favourites");
  }
  return (
    <div>
      <button className={styles.btnFavoriteHome} onClick={(e) => handleClick(e)}>
        {isFavorite === false ? <MdFavoriteBorder /> : <MdFavorite />}{" "}
      </button>
    </div>


  );
}
