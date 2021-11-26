import React from 'react'
import { Link,useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {getDetailsDogs} from '../actions/index'
import imgdefault from '../img/perros-unicornio.jpg'
//Ruta de detalle de raza de perro: debe contener
// [ ] Los campos mostrados en la ruta principal para cada raza (imagen, nombre y temperamento)
// [ ] Altura
// [ ] Peso
// [ ] Años de vida
function Details(props) {
    const allDetails = useSelector(state => state.dogsDetails)
    const dispatch = useDispatch();
    const {id} = useParams();
    useEffect(() => {
        dispatch(getDetailsDogs(id))
    } )

    return (
        <div>
            {
                allDetails.length > 0 ?
                <div>
                <h1>Más sobre {allDetails[0].name}</h1>
                <img src={allDetails[0].image ? allDetails[0].image : imgdefault} alt='img not found'  height='700px'/>
                <h3>Años de vida: {allDetails[0].life_span}</h3>
                <h3>Altura: {allDetails[0].height_min} - {allDetails[0].height_max}</h3>
                <h3>Peso: {allDetails[0].weight_min} - {allDetails[0].weight_max}</h3>
                <h3>Temperamentos: {
                allDetails[0].temperament ? 
                allDetails[0].temperament : 
                allDetails[0].temperaments.map(elem => elem.name + ' ')}</h3>
                </div>
                :
                <h2>Cargando info...</h2>
            }
            
            <Link to='/home'><button>Volver</button></Link>
               

            
        </div>
    )
}

export default Details
