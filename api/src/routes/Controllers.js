//INSTALO Y REQUIERO EL MODULO DE AXIOS
const axios = require('axios');
//TRAIGO LOS MODELOS/ENTIDADES DE LA DB
const { Dog, Temperament } = require('../db.js');
//TRAIGO LA API_KEY
const { API_KEY, DATA_API }= process.env;

//********************CREO FUNCIONES CONTROLADORAS QUE ME VAN A TRAER INFO DE LA DB Y DE LA API****************** */
const getDogsDB = async () =>{
    var infoDB = await Dog.findAll({
        include: {
            model: Temperament, //incluyo el modelo Temperament porq el modelo DOG no lo tiene
            attributes: ['name'],
            through: {           //es una validacion donde se constata que traiga solo los atributos señalados de la tabla Temperament   
                attributes: [],
            },
        }  
     })
     //console.log(infoDB);
     return infoDB;
}


const getDogsAPI = async () => {
    const getData = await axios.get(DATA_API, { headers: {'x-api-key': `${API_KEY}` }})
    const dataAPI = await getData.data.map(elem => {
           return{
            id: elem.id,
            name: elem.name,
            image: elem.image.url,
            temperament: elem.temperament,
            weight_min: parseInt(elem.weight.metric.slice(0, 2).trim()),
            weight_max: parseInt(elem.weight.metric.slice(4).trim()),
            height_min: parseInt(elem.height.metric.slice(0, 2).trim()),
            height_max: parseInt(elem.height.metric.slice(4).trim()),
            life_span: elem.life_span,
            breed_group: elem.breed_group,
           } 
    })
    //console.log(dataAPI);
    return dataAPI;  
} 


// unimos las dos informaciones
const getAllDogs = async () => {
    let getInfoDB = await getDogsDB();
    let getInfoAPI = await getDogsAPI();
    let allDogs = await getInfoAPI.concat(getInfoDB);
    //console.log(allDogs);
    return allDogs;
}


module.exports ={
    getAllDogs, getDogsAPI, getDogsDB
}