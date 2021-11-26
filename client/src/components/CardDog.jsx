import React from 'react'
import imgdefault from '../img/perros-unicornio.jpg'

function CardDog({ name, temperament, temperaments, image }) {
  if (!temperaments) {
    return (
      <div>
        <h3>{name}</h3>
        <h5>{temperament}</h5>
        <img src={image} alt="img not found" height="250px" />
      </div>
    );
  } else {
    return (
      <div>
        <h3>{name}</h3>
        <h5>{temperaments?.map((temp) => temp.name).join(",")}</h5>
        <img src={imgdefault} alt="img not found" height="250px" />
      </div>
    );
  }
}

export default CardDog
