const express = require('express');
const router = express.Router();
//TRAIGO LOS MODELOS
const { Dog, Temperament } = require('../db.js');
const {getAllDogs, getDogsAPI, getDogsDB } = require('./Controllers')
router.use(express.json())
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
        let findDog = await getAllDogs();
        if (name) {
            const dog = findDog.filter(dog => dog.name.toLowerCase().includes(name.toLowerCase()));
            dog ?  res.status(200).json(dog) : res.status(404).send('Dog not found');
        } else {
            res.status(200).json(findDog);
        }
    }catch(error){
        res.status(404).json("Dog not found whit this name");
    }     
})

/**[ ] GET /dogs/{idRaza}:
Obtener el detalle de una raza de perro en particular
Debe traer solo los datos pedidos en la ruta de detalle de raza de perro
Incluir los temperamentos asociados*/

router.get('/dogs/:idRaza', async (req, res) => {
        const { idRaza } = req.params;
     try{
        let dogId = await getAllDogs();
        if(dogId){
            let findDogId = await dogId.filter(dog => dog.id == idRaza);
            findDogId.length?
            res.status(200).json(findDogId) :
            res.status(404).send('Dog not found');
        }else{
            res.status(404).send('Dog not found');
        }
    }catch(error){
        res.status(404).send(error);
    }
})


/*[ ] GET /temperament:
Obtener todos los temperamentos posibles
En una primera instancia deberán obtenerlos desde la API externa y guardarlos en su propia base de datos
 y luego ya utilizarlos desde allí*/

router.get('/temperament', async (req, res) => {
   try{
   const dataAPI = await getDogsAPI();
    const temperaments = dataAPI.map(elem => { // [temperament1, temperament2, temperament3]
        return elem.temperament;
    })
    //console.log(temperaments);
    const eachtemp = temperaments.toString().split(/\s*,\s*/)
    const eachTempFilter = eachtemp.filter(e => e !== '');
    for(elem of eachTempFilter){
        Temperament.findOrCreate({ 
            where:{
                name: elem,
            }
        })
    }
    const allTemperaments = await Temperament.findAll({
        order: [
            ['name', 'ASC']
        ]
    });
    res.status(200).send(allTemperaments);
}catch(error){
    res.status(404).send(error);}
})



/*[ ] POST /dog:
Recibe los datos recolectados desde el formulario controlado de la ruta de creación de raza de perro por body
Crea una raza de perro en la base de datos */

router.post('/dog', async (req,res) => {
    let { name, height_min, height_max, weight_min, weight_max, life_span, createInBd, temperament } = req.body; //datos del formulario controlado
    if(name && height_min && height_max && weight_min && weight_max && life_span && temperament){
    let dogsCreate = await Dog.create({
        name: name,
        height_min: parseInt(height_min),
        height_max: parseInt(height_max),
        weight_min: parseInt(weight_min),
        weight_max: parseInt(weight_max),
        life_span: life_span,
        createInBd: createInBd,
    })
    let findTemperamentDB = await Temperament.findAll({ where:{name: temperament} })
    dogsCreate.addTemperament(findTemperamentDB); //agrego al perro creado el temperamento que selecciono el usuario
    res.status(200).send(dogsCreate)
    }else{
        res.status(404).send('Please, complete all the fields')
    }
})


module.exports = router;
