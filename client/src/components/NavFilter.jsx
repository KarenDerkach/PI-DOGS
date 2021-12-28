import React from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterDogsByCreated,
  filterDogsByTemperament,
  orderByName,
  orderByWeight,
  getListTemperaments,
} from "../actions/index";
import styles from "./styless/NavFilter.module.css";


function NavFilter() {
  const dispatch = useDispatch();
  const temperaments = useSelector((state) => state.temperaments); //estado global de temperamentos

  useEffect(() => {
    //que renderize la lista de temperamentos
    dispatch(getListTemperaments());
  }, [dispatch]);

  //////////////////////////////////////////////////////EVENTS////////////////////////////////////////////////////////////////////

  function handlefilterDogsByCreated(e) {
    e.preventDefault();
    dispatch(filterDogsByCreated(e.target.value));
  }

  //----------------------------------------TEMPERAMENTS----------------------------------------
  function handleFilterDogsByTemperament(e) {
    e.preventDefault();
    dispatch(filterDogsByTemperament(e.target.value));
  }
  //--------------------------------------------------------------------------------
  function handleOrderByName(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
  }

  function handleOrderByWeight(e) {
    e.preventDefault();
    dispatch(orderByWeight(e.target.value));
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div className={styles.container}>
      <div>
        <Link to="/dogs">
          <button className={styles.btnCreate}>Create Pet</button>
        </Link>
      </div>

      <div className={styles.order}>
        <h3>Sort by:</h3>
        {/* Botones/Opciones para ORDENAR tanto ascendentemente como descendentemente las razas de perro por: Orden alfabético, Peso*/}
        <div className={styles.orderName}>
          {/*<h5>Name</h5>*/}
          <select
            className={styles.select}
            onChange={(e) => handleOrderByName(e)}
          >
            <option defaultValue value="all">
              Name
            </option>
            <option value="asc">A - Z</option>
            <option value="desc">Z - A</option>
          </select>
        </div>

        <div className={styles.orderWeight}>
          {/*<h5>Weight</h5>*/}
          <select
            className={styles.select}
            onChange={(e) => handleOrderByWeight(e)}
          >
            <option defaultValue value="all">
              Weight
            </option>
            <option value="asc">Light</option>
            <option value="desc">Heavy</option>
          </select>
        </div>
      </div>

      <div className={styles.filters}>
        <h3>Filter by:</h3>{" "}
        {/* Botones/Opciones para FILTRAR las razas de perro por:Temperamento, Raza existente (API o BD)*/}
        <div className={styles.filterBred}>
          <select
            className={styles.select}
            onChange={(e) => handlefilterDogsByCreated(e)}
          >
            <option value="all">All breeds</option>
            <option value="created">Breeds created</option>
          </select>
        </div>
        <div className={styles.filterTem}>
          <select
            className={styles.select}
            onChange={(e) => handleFilterDogsByTemperament(e)}
          >
            <option value="sinFiltro">Temperaments</option>
            {temperaments?.map((temp) => {
              return (
                <option key={temp.id} value={temp.name}>
                  {temp.name}
                </option>
              );
            })}
          </select>
        </div>
      </div>
    </div>
  );
}

export default NavFilter;
