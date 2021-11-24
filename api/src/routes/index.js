const { Router } = require('express');
const router = Router();
//INSTALO MODULO AXIOS
const axios = require('axios');
//TRAIGO LOS MODELOS
const { Dog, Temperament } = require('../db.js');

//TRAIGO LA API_KEY
const { API_KEY }= process.env;

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//********************CREO FUNCIONES CONTROLADORAS QUE ME VAN A TRAER INFO DE LA DB Y DE LA API****************** */
const getDogsDB = async () =>{
    return await Dog.findAll({
        include: {
            model: Temperament, //incluyo el modelo Temperament porq el modelo DOG no lo tiene
            atributes: ['name'],
            through: {//es una validacion donde se constata que traiga los atributos de la tabla Temperament   
                atributes:[]
            },
        }  
     })
}
// console.log(getDogsDB());

const getDogsAPI = async () => {
    const getData = await axios.get('https://api.thedogapi.com/v1/breeds', { headers: {'x-api-key': `${API_KEY}` }})
    const dataAPI = await getData.data.map(elem => {
           return{
            id: elem.id,
            name: elem.name,
            image: elem.image.url,
            temperament: elem.temperament,
            weight: elem.weight.metric,
            height: elem.height.metric,
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
    let allDogs = await getInfoDB.concat(getInfoAPI); // concatena las dos arrays
   
    return allDogs;
}
//console.log(getAllDogs());

//******************************************************************************************************* */

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
    const allTemperaments = await Temperament.findAll();
    res.status(200).send(allTemperaments);
}catch(error){
    res.status(404).send(error);}
})



/*[ ] POST /dog:
Recibe los datos recolectados desde el formulario controlado de la ruta de creación de raza de perro por body
Crea una raza de perro en la base de datos */

router.post('/dog', async (req,res) => {
    let { name, height, weight, life_span, createInBd, temperament } = req.body; //datos del formulario controlado
    if(name && height && weight && life_span && createInBd && temperament){
    let dogsCreate = await Dog.create({
        name,
        height,
        weight,
        life_span,
        createInBd
    })
    let findTemperamentDB = await Temperament.findAll({
        where:{name : temperament}
    })
    dogsCreate.addTemperament(findTemperamentDB); //agrego al perro creado el temperamento que selecciono el usuario
    res.status(200).send('Dogs created successfully!')
    }else{
        res.status(404).send('Please, complete all the fields')
    }
})

module.exports = router;
