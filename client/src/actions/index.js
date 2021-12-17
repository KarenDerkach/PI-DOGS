import axios from 'axios';
import swal from 'sweetalert'


//action qe permite renderizar todos los perros (home)
export function getDogs(){
    return function(dispatch){
        axios.get('http://localhost:3001/dogs')
        .then((response)=>{
            dispatch({type:'GET_DOGS', payload: response.data})
            
        })
        
        .catch(()=>{
            console.log('Error al cargar datos');
        })
    }
}

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
           .catch(()=>{
               swal({
                   title:"Breed not exist",
                   text: "Try with other breed",
                   icon: "error",
                   dangerMode: true});
           })
    }
   }


export function postDog (info){ //recibe un objeto con toda la info del perro a crear (createDogs)
    return  function(dispatch){
     axios.post('http://localhost:3001/dog', info)
     .then((response)=>{
         return response.data;
     })
    }
}

export function getDetailsDogs(id){
    return function(dispatch){
        axios.get('http://localhost:3001/dogs/'+ id)
        .then((response)=>{
            dispatch({type:'GET_DETAILS_DOG', payload: response.data})
        })
        .catch(()=>{
            console.log('No se encuentra Id');
        })
    }
}



export function getListTemperaments(){ //(CreateDogs) (HOME)
    return function(dispatch){
        axios.get('http://localhost:3001/temperament')
        .then((response)=>{
            dispatch({type:'GET_TEMPERAMENTS', payload: response.data})
        }) 
        .catch(()=>{ alert('Error al traer temperamentos')})
    }
}


export function filterDogsByTemperament(payload){
    return{
        type: 'FILTER_DOGS_BY_TEMPERAMENT',
        payload
    }
}



//accion para filtrar los perros creados por el usuario
export function filterDogsByCreated(value){
    return {
        type: 'FILTER_DOGS_BY_CREATED',
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
