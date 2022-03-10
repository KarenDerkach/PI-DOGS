import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs, getListTemperaments } from "../actions/index";
import CardDog from "./CardDog";
import Header from "./Header";
import SearchBar from "./SearchBar";
import NavFilter from "./NavFilter";
import Loading from "./Loading";
import styles from "./styless/Home.module.css";

export default function Home() {
  
  const dispatch = useDispatch(); //HOOK reemplaza mapDispatchToProps, se crea una instancia de la funcion
  //////////////////////////////////////////////ESTADOS GLOBALES//////////////////////////////////////////////////////////////////
  const allDogs = useSelector((state) => state.dogs); //HOOK reemplaza mapStateToProps

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //PAGINADO:
  const [currentPage, setCurrentPage] = useState(1); //pagina actual
  const [dogsPerPage] = useState(8); //(8)
  const numberOfLastDog = currentPage * dogsPerPage; //Indice del ultimo perro de la pagina actual osea 8
  const numberOfFirstDog = numberOfLastDog - dogsPerPage; //Indice del primer perro de la pagina actual osea 0
  const currentDogs = allDogs.slice(numberOfFirstDog, numberOfLastDog); //Perros de la pagina actual, con slice selecciono los perros de la pagina actual q seran los que tienen indice 0 -1 - 2 - 3 - 4 - 5 - 6 - 7 en total 8 personajes
  //Pag 1 ----> muestra indice del array de perros: 0 - 7

  
  const totalPages = Math.ceil(allDogs.length / dogsPerPage); //redondea al numero entero mas cercano,p/ arriba

  const paginate = (number) => { 
  if(number + currentPage > totalPages) return;
  if(number + currentPage < 1) return;
  setCurrentPage(number + currentPage);
  }

  const OnFirstPage = () => {
    setCurrentPage(1);
  }  

  const OnLastPage = () => {
    setCurrentPage(totalPages);
  }


  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    //HOOK para ejecutar una funcion cuando el componente se monta
    dispatch(getDogs());
    dispatch(getListTemperaments());
  }, [dispatch]);


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <div className={styles.home}>
      <div className={styles.header}>
        <Header />
      </div>
      <div className={styles.searchBar}>
        <SearchBar />
      </div>
      <div className={styles.navFilter}>
        <NavFilter />
      </div>
      {/* Paginado */}
        <div className={styles.pagination}>
           <section className={styles.containerPage}>
             <button className={styles.bntPages} onClick={OnFirstPage}>Firts</button>
           <button className={styles.bntPages} onClick={()=>paginate(-1)}>Prev</button>
           <span className={styles.currentNumber}>{currentPage}</span>
          <button className={styles.bntPages} onClick={()=>paginate(1)}>Next</button>
          <button className={styles.bntPages} onClick={OnLastPage}>Last</button>
          </section>
        </div>
        {/* renderizado de cartas */}
      <div>
        <div className={styles.containerDogs}>
          {currentDogs.length > 0 ? (
            currentDogs.map((dog) => {
              return (
                <CardDog
                  key={dog.id}
                  id={dog.id}
                  name={dog.name}
                  temperament={dog.temperament}
                  temperaments={dog.temperaments}
                  image={dog.image}
                  weight_min={dog.weight_min}
                  weight_max={dog.weight_max}
                />
              );
            })
          ) : (
            <div>
              <Loading />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


