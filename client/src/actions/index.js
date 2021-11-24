import axios from 'axios';
//TRAIGO LA API_KEY
//const { API_KEY }= process.env;

export function getDogs(){
    return function(dispatch){
        axios.get('http://localhost:3001/dogs')
        .then((response)=>{
            dispatch({type:'GET_DOGS', payload: response.data})
        })
    }
}


//accion para filtrar los perros
export function getListTemperaments(){
    return async function(dispatch){
        var temp = await axios.get('http://localhost:3001/temperament')
        var arrTemps = temp.data.map(e => e.name)
        return dispatch({
            type: 'GET_TEMPERAMENTS',
            payload: arrTemps
        })
    }
}


//accion para filtrar los perros creados por el usuario
export function filterDogsByUser(value){
    return {
        type: 'FILTER_DOGS_BY_USER',
        payload: value
    }
}

export function orderByName(payload){
    return {
        type:'ORDER_BY_NAME', 
        payload
    }
}

export function orderByWeight(payload){
    return {
        type:'ORDER_BY_WEIGHT', 
        payload
    }
}
