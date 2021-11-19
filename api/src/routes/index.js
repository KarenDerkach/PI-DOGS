const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios');
const { Dog, Temperament } = require('../db')
const API_KEY = process.env.API_KEY;

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//********************CREO FUNCIONES QUE ME VAN A TRAER INFO DE LA DB Y DE LA API****************** */
const getDogsDB = async () => {
    const dogs = await Dog.findAll({
        include: Temperament, //incluyo el modelo Temperament porq el modelo DOG no lo tiene
        atributes: ['name'],
        //es una validacion donde se constata que traiga los atributos de la tabla Temperament
        through: {
            atributes:[]
        }

     })
}

// const getDogsAPI= function() {  
//     return fetch(`https://dog.ceo/api/breeds`)
//       .then(r => r.json()) //a la respuesta  q recibi q es un JSON lo convierto en objeto JS llamado (recurso)
//       .then((recurso) => {
//         if(recurso.name !== undefined){  //si el json tiene una propiedad name q no sea undefined
//           const dogy = {
//             id: recurso.id,
//             name: recurso.name,
//             image: recurso.image.url,
//             temperament: recurso.temperament.map(elem => elem),
//             weight: recurso.weight.map(elem => elem),
//             height: recurso.height.map(elem => elem),
//             life_span: recurso.life_span,
//             breed_group: recurso.breed_group,
//           };
//             return dogy;
//         } else {
//           alert("Raza no encontrada");
//         }
//       });
//     }
const getDogsAPI = async () => {
    const getData = await axios.get(`https://dog.ceo/api/breeds?api_key=${API_KEY}`)
    const dataAPI = await getData.data.map(elem => {
           return{
            id: elem.id,
            name: elem.name,
            image: elem.image.url,
            temperament: elem.temperament.map(elem => elem),
            weight: elem.weight.map(elem => elem),
            height: elem.height.map(elem => elem),
            life_span: elem.life_span,
            breed_group: elem.breed_group,
           } 
    })
    return dataAPI;
}

// unimos las dos informaciones
const getAllDogs = async () => {
    const getInfoDB = await getDogsDB();
    const getInfoAPI = await getDogsAPI();
    const allDogs = getInfoDB.concat(getInfoAPI); // concatena las dos arrays
    return allDogs;
}
//******************************************************************************************************* */

//************RUTAS************************ */
//  GET /dogs:
// Obtener un listado de las razas de perro
// Debe devolver solo los datos necesarios para la ruta principal

// [ ] GET /dogs?name="...":
// Obtener un listado de las razas de perro que contengan la palabra ingresada como query parameter
// Si no existe ninguna raza de perro mostrar un mensaje adecuado

router.get('/dogs', async (req, res) => {
    const { name } = req.query;
    let findDog = await getAllDogs();
    if(name){
        const dog = findDog.filter(dog => dog.name.toLowerCase().include(name.toLocaleLowerCase()));
        if(dog){
            res.status(200).send(dog);
        }else{
            res.status(404).send('Dog not found');
        }
    }else{
        res.status(200).send(findDog);
    }
    
    
})


module.exports = router;
