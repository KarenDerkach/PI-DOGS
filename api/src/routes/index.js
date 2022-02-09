const express = require('express');
const router = express.Router();
//middleware permite leer el body de la peticion
router.use(express.json())
const axios = require('axios');
//TRAIGO LOS MODELOS
const { Dog, Temperament } = require('../db.js');
//TRAIGO LAS FUNCIONES CONTROLADORAS
const {getAllDogs, getDogsAPI } = require('./Controllers')
require('dotenv').config();


const {
    URL_IMG_DOGS,
  } = process.env;


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//************RUTAS************************ */
//  GET /dogs:
// Obtener un listado de las razas de perro
// Debe devolver solo los datos necesarios para la ruta principal (name, temperament, image)

// [ ] GET /dogs?name="...":
// Obtener un listado de las razas de perro que contengan la palabra ingresada como query parameter
// Si no existe ninguna raza de perro mostrar un mensaje adecuado

router.get('/dogs', async (req, res) => {
    const { name } = req.query;
    try{
        let foundDog = await getAllDogs();
        //console.log(foundDog)
        if (name) {
            const dog = foundDog.filter(dog => dog.name.toLowerCase().includes(name.toLowerCase()));
            if (dog.length > 0) {
                res.status(200).json(dog);
            } else {
             res.status(404).send('Dog not found whit this name');
            }
        } else {
            res.status(200).json(foundDog);
        }
    }catch(error){
        res.status(404).json(error);
    }     
})

/**[ ] GET /dogs/{idRaza}:
Obtener el detalle de una raza de perro en particular
Debe traer solo los datos pedidos en la ruta de detalle de raza de perro
Incluir los temperamentos asociados*/

router.get('/dogs/:idRaza', async (req, res) => {
    const { idRaza } = req.params;
    try {
        let dogId = await getAllDogs();
        if (dogId) {
            let foundDogId = await dogId.filter(dog => dog.id == idRaza);
            foundDogId.length ?
                res.status(200).json(foundDogId) :
                res.status(404).send('Dog Id not existing');
        } else {
            res.status(404).send('Not found');
        }
    } catch (error) {
        res.status(404).send(error);
    }
})



/*[ ] GET /temperament:
Obtener todos los temperamentos posibles
En una primera instancia deberán obtenerlos desde la API externa y guardarlos en su propia base de datos
 y luego ya utilizarlos desde allí*/

router.get('/temperament', async (req, res) => {
    try {
        const dataAPI = await getDogsAPI();
        const temperaments = dataAPI.map(elem => { // [temperament1, temperament2, temperament3]
            return elem.temperament;
        })
        //console.log(temperaments);
        const eachTemp = temperaments.toString().split(/\s*,\s*/).filter(e => e !== '');
        //console.log(eachTemp); //[temperamenta1, temperamentb1, temperamenta2, temperamentb2, temperamenta3, temperamentb3]
        for (elem of eachTemp) {
            Temperament.findOrCreate({
                where: {
                    name: elem,
                }
            })
        }
        const allTemperaments = await Temperament.findAll({
            order: [
                ['name', 'ASC']
            ]
        });
        //console.log(allTemperaments);
        res.status(200).send(allTemperaments);
    } catch (error) {
        res.status(404).send(error);
    }
})



/*[ ] POST /dog:
Recibe los datos recolectados desde el formulario controlado de la ruta de creación de raza de perro por body
Crea una raza de perro en la base de datos */

router.post('/dog', async (req, res) => {
    let { name, height_min, height_max, weight_min, weight_max, life_span, createInBd, temperament, image } = req.body; //datos del formulario controlado
    if(!image){
        try {
            image = await (await axios.get(URL_IMG_DOGS)).data.message;
        } catch (error) {
            console.log(error)
        }
    }
    
    if (name && height_min && height_max && weight_min && weight_max && life_span && temperament && image) {
        let dogsCreate = await Dog.create({
            name: name,
            height_min: parseInt(height_min),
            height_max: parseInt(height_max),
            weight_min: parseInt(weight_min),
            weight_max: parseInt(weight_max),
            life_span: life_span,
            image: image || URL_IMG_DOGS ,
            createInBd: createInBd,
        })
        
        let findTemperamentDB = await Temperament.findAll({ where: { name: temperament } })
        dogsCreate.addTemperament(findTemperamentDB); //agrego al perro creado el temperamento que selecciono el usuario
        res.status(200).send(dogsCreate)
    } else {
        res.status(404).send('Please, complete all the fields')
    }
})
//add agrega un elemento a la relacion y si lo vuelvo a agregar lo concatena
//set elimina todos los elementos de la relacion y luego los vuelve a agregar




module.exports = router;
