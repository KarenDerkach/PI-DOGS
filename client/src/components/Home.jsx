import React from 'react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {getDogs, filterDogsByUser, orderByName, orderByWeight, getListTemperaments} from '../actions/index'
import { Link } from 'react-router-dom'
import CardDog from './CardDog'
import Paginado from './Paginado'

export default function Home() {
    const dispatch = useDispatch()   //HOOK reemplaza mapDispatchToProps
    const allDogs = useSelector(state => state.dogs) //HOOK reemplaza mapStateToProps
    const temperaments = useSelector(state => state.temperaments)
    .sort((a,b) =>{if(a < b) return -1; else return 1;})

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //PAGINADO:
    const [currentPage, setCurrentPage] = useState(1) //Estado local, pagina actual
    const [dogsPerPage, setDogsPerPage] = useState(8) //Estado local, cantidad de perros por pagina (8)
    const numberOfLastDog = currentPage * dogsPerPage //Indice del ultimo perro de la pagina actual osea 8
    const numberOfFirstDog = numberOfLastDog - dogsPerPage //Indice del primer perro de la pagina actual osea 0
    const currentDogs = allDogs.slice(numberOfFirstDog, numberOfLastDog) //Perros de la pagina actual, con slice selecciono los perros de la pagina actual q seran los que tienen indice 0 -1 - 2 - 3 - 4 - 5 - 6 - 7 en total 8 personajes

    //Pag 1 ----> muestra indice del array de perros: 0 - 7

    const paginate = pageNumber => setCurrentPage(pageNumber) //Pagina actual
     /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    useEffect(() => {  //HOOK para ejecutar una funcion cuando el componente se monta
        dispatch(getDogs());
        dispatch(getListTemperaments());

    },[dispatch])

//////////////////////////////////////////////////////EVENTS////////////////////////////////////////////////////////////////////
    function handleClick(e) {
        e.preventDefault(); //permite q no se recargue la pagina y se rompan las cosas
        dispatch(getDogs());
    }

    function handlefilterDogsByUser(e) {
        e.preventDefault(); //permite q no se recargue la pagina y se rompan las cosas
        dispatch(filterDogsByUser(e.target.value));
    }

    function handleOrderByName(e) {
        e.preventDefault(); //permite q no se recargue la pagina y se rompan las cosas
        dispatch(orderByName(e.target.value));
    }

    function handleOrderByWeight(e) {
        e.preventDefault(); //permite q no se recargue la pagina y se rompan las cosas
        dispatch(orderByWeight(e.target.value));
    }

    function handleGetTemperaments(e) {
        e.preventDefault(); //permite q no se recargue la pagina y se rompan las cosas
        dispatch(getListTemperaments(e.target.value));
    }
//////////////////////////////////////////////////////EVENTS////////////////////////////////////////////////////////////////////
    return (
        <div>
            <Link to='/dogs'>Crear Mascota</Link>
            <h1>Bienvenidos al Mundo de las Mascotas</h1>
            <button onClick={e=>{handleClick(e)}}> {/*si el usuario tiene un filtro y quiere ver todo de nuevo. con este boton resetea todo y muestra todo original*/}
                Volver a cargar todos los personajes
            </button>
            <div>
                <h3>Ordenar por:</h3>{/* Botones/Opciones para ORDENAR tanto ascendentemente como descendentemente las razas de perro por: Orden alfabético, Peso*/}

                <div>
                <h5>Nombre</h5>
                <select onChange={(e)=> handleOrderByName(e)}>  
                    <option value='asc'>Ascendente</option>
                    <option value='desc'>Descendente</option>
                </select>
                </div>

                <div>
                <h5>Weight</h5>
                <select onChange={(e)=> handleOrderByWeight(e)}>  
                    <option value='asc'>Ascendente</option>
                    <option value='desc'>Descendente</option>
                </select>
                </div>

                <h3>Filtrar por:</h3> {/* Botones/Opciones para FILTRAR las razas de perro por:Temperamento, Raza existente (API o BD)*/}
               
                <div>
                    <h5>Temperamento:</h5>
                <select onChange={(e)=> handleGetTemperaments(e)}> 
                    <option> Temperamentos </option>
                    {
                        temperaments.map(temperament => {
                            return (
                                <option key={temperament} value={temperament}>{temperament}</option>
                            )
                        }
                        )
                    }
                </select>
                </div>

                <select onChange={(e)=> handlefilterDogsByUser(e)}>
                    <option value='api' >Razas Existentes</option>
                    <option value='created' >Razas Creadas</option>
                    <option defaultValue value='all' >Todas las Razas</option>
                </select>
                <Paginado
                    dogsPerPage={dogsPerPage}
                    allDogs={allDogs.length}
                    paginate={paginate}
                />
                
                {
                    currentDogs && currentDogs.map(dog => {
                      return (
                          <fragment>
                              <Link to={`/dogs/${dog.id}`}>
                      <CardDog key={dog.id} name={dog.name} temperament={dog.temperament} image={dog.image} />
                                </Link>
                        </fragment>
                         ) ;      
                    })
                }
               
            </div>
        </div>
    )
}
