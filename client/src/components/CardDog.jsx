import React from 'react'

function CardDog({ name, temperament, image}) {
    return (
        <div>
            <h3>{name}</h3>
            <h5>{temperament}</h5>
            <img src={image} alt="img not found"  height="250px"/>
        </div>
    )
}

export default CardDog
