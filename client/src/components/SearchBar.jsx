import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getDogs, getNameDogs } from "../actions/index";
import styles from "./styless/SearchBar.module.css";
import swal from "sweetalert";
//ICONS
import { ImSearch } from "react-icons/im";
import {MdFavorite} from "react-icons/md";

function SearchBar() {
  const dispatch = useDispatch();

  const [name, setName] = useState("");

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(getDogs());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.length === 0) {
      return swal({
        title: "Please enter a valid name",
        icon: "error",
        dangerMode: true,
      });
    } else {
      dispatch(getNameDogs(name));
      setName("");
    }
  };

  return (
    <div className={styles.container}>
      <div>
      <Link to='/favorites'> <button className={styles.btnFavorite}> <MdFavorite/> </button></Link>
      </div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          placeholder="Name ..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          type="submit"
          onClick={(e) => handleSubmit(e)}
          className={styles.search}
        >
          <ImSearch />
        </button>
      </form>

      <div>
        <button onClick={(e) => handleClick(e)} className={styles.refresh}>
          {" "}
          Refresh{" "}
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
