import axios from 'axios';
//TRAIGO LA API_KEY
//const { API_KEY }= process.env;

//action qe permite buscar perros por nombre  (SearchBar)
export function getNameDogs (name){
 return function(dispatch){
     axios.get('http://localhost:3001/dogs?name='+ name)
     .then((response)=>{
            dispatch({
                type: 'GET_DOGS_NAME',
                payload: response.data
            })
     })
        .catch((err)=>{
            console.log(err);
        })
 }
}
//action qe permite renderizar todos los perros (home)
export function getDogs(){
    return function(dispatch){
        axios.get('http://localhost:3001/dogs')
        .then((response)=>{
            dispatch({type:'GET_DOGS', payload: response.data})
        })
        .catch((err)=>{
            console.log(err);
        })
    }
}

export function postDog (info){ //recibe un objeto con toda la info del perro a crear (createDogs)
    return async function(dispatch){
        const response = await axios.post('http://localhost:3001/dog', info)
        //console.log(response);
        return response;
    }
}

export function getDetailsDogs(id){
    return function(dispatch){
        axios.get('http://localhost:3001/dogs/'+ id)
        .then((response)=>{
            dispatch({type:'GET_DETAILS_DOG', payload: response.data})
        })
        .catch((err)=>{
            console.log(err);
        })
    }
}


//accion para traer los temperamentos en un array
export function getListTemperaments(){ //(CreateDogs) (HOME)
    return function(dispatch){
        axios.get('http://localhost:3001/temperament')
        .then((response)=>{
            var arrTemps = response.data.map(e => e.name)
            return arrTemps
        }) 
        .then((arrTemps)=>{
            dispatch({type:'GET_TEMPERAMENTS', payload: arrTemps})
        })
        .catch((err)=>{ console.log(err)})
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
