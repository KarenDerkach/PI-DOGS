import React from 'react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {getDogs} from '../actions/index'
import { Link } from 'react-router-dom'
import CardDog from './CardDog'
import Pagination from './Pagination'
import Header from './Header'
import SearchBar from './SearchBar'
import NavFilter from './NavFilter'
import styles from './styless/Home.module.css'

export default function Home() {
  const dispatch = useDispatch(); //HOOK reemplaza mapDispatchToProps, se crea una instancia de la funcion
  //////////////////////////////////////////////ESTADOS GLOBALES//////////////////////////////////////////////////////////////////
  const allDogs = useSelector((state) => state.dogs); //HOOK reemplaza mapStateToProps

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //PAGINADO:
  const [currentPage, setCurrentPage] = useState(1); //Estado local, pagina actual
  const [dogsPerPage, setDogsPerPage] = useState(8); //Estado local, cantidad de perros por pagina (8)
  const numberOfLastDog = currentPage * dogsPerPage; //Indice del ultimo perro de la pagina actual osea 8
  const numberOfFirstDog = numberOfLastDog - dogsPerPage; //Indice del primer perro de la pagina actual osea 0
  const currentDogs = allDogs.slice(numberOfFirstDog, numberOfLastDog); //Perros de la pagina actual, con slice selecciono los perros de la pagina actual q seran los que tienen indice 0 -1 - 2 - 3 - 4 - 5 - 6 - 7 en total 8 personajes

  //Pag 1 ----> muestra indice del array de perros: 0 - 7

  const paginate = (pageNumber) => setCurrentPage(pageNumber); //Pagina actual
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    //HOOK para ejecutar una funcion cuando el componente se monta
    dispatch(getDogs());
  }, [dispatch]);

  

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <div className={styles.bgk}>
      <div className={styles.header}>
        <Header />
      </div>
      <div className={styles.searchBar}>
       <SearchBar /> 
      </div>
      <div className={styles.navFilter}>
        <NavFilter />
      </div>
      <div>
        <div className={styles.containerDogs}>
          {
          currentDogs.length > 0 ? 
          
            currentDogs.map((dog) => {
              return (
                <fragment>
                  <Link
                    to={`/dogs/${dog.id}`}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <CardDog
                      key={dog.id}
                      name={dog.name}
                      temperament={dog.temperament}
                      temperaments={dog.temperaments}
                      image={dog.image}
                      weight_min={dog.weight_min}
                      weight_max={dog.weight_max}
                    />
                  </Link>
                </fragment>
              );
            })
            
            :
            <div className={styles.loading}><h2>Loading...</h2></div>
            }
        </div>

        <div className={styles.pagination}>
          <Pagination
            dogsPerPage={dogsPerPage}
            allDogs={allDogs.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </div>
      </div>
    </div>
  );
}
