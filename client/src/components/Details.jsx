import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {getDetailsDogs} from '../actions/index'
import imgdefault from '../img/createDog_1.jpg'
import style from './styless/Details.module.css'
//ICONS
import { BiBone } from "react-icons/bi";
import { GiLifeBar } from "react-icons/gi";
import { GiWeight } from "react-icons/gi";
import { FaRulerVertical } from "react-icons/fa";
import { GiJumpingDog } from "react-icons/gi";
//Ruta de detalle de raza de perro: debe contener
// [ ] Los campos mostrados en la ruta principal para cada raza (imagen, nombre y temperamento)
// [ ] Altura
// [ ] Peso
// [ ] Años de vida
function Details() {
    const allDetails = useSelector(state => state.dogsDetails)
    const dispatch = useDispatch();
    const {id} = useParams();

    /**componentDidMount(){
        const dogId = props.match.params.id;
        props.getDetailsDogs(dogId) 
    } */
    useEffect(() => {
        dispatch(getDetailsDogs(id))
    } )
    
    return (
        <div className={style.bkg}>
            {
                allDetails.length > 0 ?

                <div className={style.container}>
                <img src={allDetails[0].image ? allDetails[0].image : imgdefault} alt='img not found'  />
                <h1 className={style.name}>{allDetails[0].name} < BiBone /> </h1>
                <div className={style.info}>
                    <div  className={style.details}>
                <h3 className={style.icon}> <GiLifeBar/> </h3>
                <p>{allDetails[0].life_span.length > 8 ? allDetails[0].life_span.slice(0,7) : allDetails[0].life_span.slice(0,2) } years</p>
                    </div>
                    <div className={style.details}>
                <h3 className={style.icon} > <FaRulerVertical/> </h3>
                <p>{allDetails[0].height_min}  - {allDetails[0].height_max} cm</p>
                    </div>
                    <div className={style.details}>
                <h3 className={style.icon} ><GiWeight/></h3>
                <p>{allDetails[0].weight_min}  - {allDetails[0].weight_max} kg</p> 
                    </div>
                <div className={style.temperament}>
                <h3 className={style.icon} ><GiJumpingDog/> </h3>
                 <p className={style.data}>{
                allDetails[0].temperament ? allDetails[0].temperament : 
                allDetails[0].temperaments?.map(elem => elem.name + '  ')}</p>
                </div>

                </div>
                </div>
                :
                <div className={style.loading}><h2>Loading...</h2></div>
            }
            
            {/*<Link to='/home'><button className={style.btnReturn}>Return</button></Link>*/}
               

            
        </div>
    )
}

export default Details
