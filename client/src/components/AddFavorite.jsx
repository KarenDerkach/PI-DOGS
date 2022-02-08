import React from "react";
import { addFavorite } from "../actions/index";
import { useDispatch } from "react-redux";
import { MdFavoriteBorder } from "react-icons/md";
import { MdFavorite } from "react-icons/md";
import styles from "./styless/Favorite.module.css";

export default function AddFavorite({ id, name, image }) {
  const dispatch = useDispatch();

  const [isFavorite, setIsFavorite] = React.useState(false);

  function handleClick() {
    dispatch(addFavorite({ id, name, image }));
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
