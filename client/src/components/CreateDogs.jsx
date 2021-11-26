import React from 'react'
import { Link } from 'react-router-dom'
import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {postDog, getListTemperaments} from '../actions/index'

function CreateDogs() {
    const dispatch = useDispatch()  //activo el dispatch para traerme las actions
    //const history = useHistory() // llamo a la funcion history para redireccionar
    const temperaments = useSelector(state => state.temperaments)//me traigo el estado global de temperamentos
     

    useEffect(() => {  //que renderize la lista de temperamentos
        dispatch(getListTemperaments())
    }, [dispatch])    

    const [input, setInput] = useState({
        name: '',
        height_min: '',
        height_max: '',
        weight_min: '',
        weight_max: '',
        life_span: '',
        temperament: [],
    })
    const [error, setError] = useState({})

    const validacion = function(input) {
      const error = {}
      if (!input.name) {
        error.name = 'Username is required';
      } 
      if (!input.height_min) {
        error.height_min = 'Height min is required';
      }else if (!/\d{1,2}/g.test(input.height_min)) {
        error.height_min = 'Height min must be a number';
      }
      if (!input.height_max) {
        error.height_max = 'Height max is required';
      }else if (!/\d{1,2}/g.test(input.height_max)) {
        error.height_max = 'Height max must be a number';
      }
      if (!input.weight_min) {
        error.weight_min = 'Weight min is required';
      }else if (!/\d{1,2}/g.test(input.weight_min)) {
        error.weight_min = 'Weight min must be a number';
      }
      if (!input.weight_max) {  
        error.weight_max = 'Weight max is required';
      }else if (!/\d{1,2}/g.test(input.weight_max)) {
        error.weight_max = 'Weight max must be a number';
      }

      if(input.height_min > input.height_max) {
        error.height_min = 'Height min must be less than height max';
      }
      if(input.weight_min > input.weight_max) {
        error.weight_min = 'Weight min must be less than weight max';
      }
      if(input.life_span < 0) {
        error.life_span = 'Life span must be positive';
      }
      return error;
    };
    
    const handleInputChange = (e) => {  //modifico mi estado input agregando lo q me pasan por input del form
        setInput((input)=>{
          const newInput={
            ...input,
            [e.target.name]: e.target.value
          }
          const error = validacion(newInput);
          setError(error);
          return newInput;
        })
        
    }
    const handleSelect = (e)=> {
        setInput({
            ...input,
            temperament: [...input.temperament, e.target.value] //agrego el temperamento seleccionado al array de temperamentos
        })
    }

    const handleDelete = (elem) => {
        setInput({
            ...input,
            temperament: input.temperament.filter(item => item !== elem) //elimino el temperamento seleccionado del array de temperamentos
        })
    }
    const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(postDog(input));
      console.log(input);
      alert("Mascota creada");
      setInput({
        name: "",
        height_min: "",
        height_max: "",
        weight_min: "",
        weight_max: "",
        life_span: "",
        temperament: [],
      });
    };



    return (
      <div>
        <h1>Crear tu propio perrito!</h1>
        <form onSubmit={(e)=>handleSubmit(e)}>
          <label>Nombre:</label>
          <input
            type="text"
            name="name"
            value={input.name}
            placeholder="Nombre..."
            onChange={(e)=>handleInputChange(e)}
          />
          {error.name && <p className="danger">{error.name}</p>}
          <div>
            <h5>Peso:</h5>
          <label>Min:</label>
          <input
            type="text"
            name="weight_min"
            value={input.weight_min}
            placeholder= "2"
            onChange={(e)=>handleInputChange(e)}
          />
          {error.weight_min && <p className="danger">{error.weight_min}</p>}
          <label>Max:</label>
          <input
            type="text"
            name="weight_max"
            value={input.weight_max}
            placeholder= "5"
            onChange={(e)=>handleInputChange(e)}
          />
          {error.weight_max && <p className="danger">{error.weight_max}</p>}
          </div>
          <div>
          <h5>Altura:</h5>
          <label>Min:</label>
          <input
            type="text"
            name="height_min"
            value={input.height_min}
            placeholder= "2"
            onChange={(e)=>handleInputChange(e)}/>
          {error.height_min && <p className="danger">{error.height_min}</p>}
            <label>Max:</label>
          <input
            type="text"
            name="height_max"
            value={input.height_max}
            placeholder= "3"
            onChange={(e)=>handleInputChange(e)}/>
          {error.height_max && <p className="danger">{error.height_max}</p>}
            </div>
            <div>
          <label>Años de Vida:</label>
          <input
            type="text"
            name="life_span"
            value={input.life_span}
            placeholder="años..."
            onChange={(e)=>handleInputChange(e)}
          />
          {error.life_span && <p className="danger">{error.life_span}</p>}
          </div>
          <label>Temperamentos:</label>
          <select onChange={(e)=>handleSelect(e)}>
            {temperaments?.map((temp) => {
              return (
                <option key={temp} value={temp}>
                  {temp}
                </option>
              );
            })}
          </select>
          <h5>Temperamentos Seleccionados:</h5> {/*muestro los temperamentos seleccionados*/}
          {input.temperament.map(elem =>
            <div key={elem}> <p>{elem}</p> 
            <button onClick={()=> handleDelete(elem)}>x</button>
            </div>
            )}   
          <div>
          <button type="submit" disabled={Object.keys(error).length > 0 ? true : false}>Crear Dog</button>
          </div>
        </form>
        <Link to="/home">
          <button>Volver </button>{" "}
        </Link>
      </div>
    );
}

export default CreateDogs
