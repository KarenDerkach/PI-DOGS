import React from 'react'
//componente que renderiza el paginado
function Paginado({paginate, dogsPerPage, allDogs}) {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(allDogs / dogsPerPage); i++) {
        pageNumbers.push(i);
    }


    return (
        <div>
            <nav>
                <ul style={{display: 'flex', flexDirection:'row'}}>
                    {pageNumbers?.map(number => (
                        <li key={number} style={{alignItems:'none'}} > 
                            <button onClick={() => paginate(number)}>{number}</button>
                        </li>
                    ))}
                </ul>       
            </nav>
            
        </div>
    )
}

export default Paginado
