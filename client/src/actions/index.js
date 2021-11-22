import axios from 'axios';
//TRAIGO LA API_KEY
const { API_KEY }= process.env;

export function getDogs(){
    return function(dispatch){
        axios.get('https://api.thedogapi.com/v1/breeds', { headers: {'x-api-key': `${API_KEY}` }})
        .then(function(response){
            dispatch({type:'GET_DOGS', payload: response.data})
        })
        .catch(function(err){
            dispatch({type:'GET_DOGS_REJECTED', payload: err})
        })
    }
    

   
}
 // return async function(dispatch){
    //     const response = await axios.get('https://api.thedogapi.com/v1/breeds', { headers: {'x-api-key': `${API_KEY}` }})
    //  return dispatch({
    //     type: 'GET_DOGS',
    //     payload: response.data
    //  })  
    // }