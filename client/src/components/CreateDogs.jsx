import React from 'react'
import { useNavigate } from 'react-router-dom'
import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {postDog, getListTemperaments} from '../actions/index'
import imgdefault from '../img/createDog_1.jpg'
import style from './styless/CreateDogs.module.css'
import swal from 'sweetalert'
//ICONS
import {TiDelete} from 'react-icons/ti'

function CreateDogs() {
    const dispatch = useDispatch()  //activo el dispatch para traerme las actions
    const navigate = useNavigate() // para redireccionar
    const temperaments = useSelector(state => state.temperaments)//me traigo el estado global de temperamentos
    const [change, setChange] = useState(false);

    useEffect(() => {  //que renderize la lista de temperamentos
        dispatch(getListTemperaments())
    }, [dispatch,change])    

    const [input, setInput] = useState({
        name: '',
        height_min: '',
        height_max: '',
        weight_min: '',
        weight_max: '',
        life_span: '',
        image:'',
        temperament: [],
    })
    const [error, setError] = useState({})

    //-----------------------------------VALIDATION ERRORS---------------------------------------
    const validacion = function(input) {
      console.log(input)
      const error = {}
      if (!input.name) {
        error.name = 'Name is required';
      }
      if (!input.height_min) {
        error.height_min = 'Height Min is required';
      }
      if(input.height_min  < 0){
        error.height_min = 'Height Min must be greater than 0'
      }
      if (!input.height_max) {
        error.height_max = 'Height Max is required';
      }
      if (!input.weight_min) {
        error.weight_min = 'Weight Min is required';
      }
      if(input.weight_min < 0){
        error.weight_min = 'Weight Min must be greater than 0'
      }
      if (!input.weight_max) {  
        error.weight_max = 'Height Max is required';
      }

      if(  Number(input.height_max) < Number(input.height_min)) {
        error.height_max = 'Height Min must be less than Height Max';
      }
      if(Number(input.weight_min) > Number(input.weight_max)) {
        error.weight_min = 'Weight Min must be less than Weight Max';
      }
      if(input.life_span < 0) {
        error.life_span = 'Must be greater than 0';
      }
      return error;
    };
/////////////////////////////////////////////HANDLES////////////////////////////////////////////////////////////////////////////////    
    const handleInputChange = (e) => {  //modifico mi estado input agregando lo q me pasan por input del form
       e.preventDefault()
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
    //-----------------TEMPERAMENTS--------------------------------------------------
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

    //-------------------------------------------------------------------------------------

    const handleSubmit = (e) => {
        e.preventDefault()
      if(input.name &&
        input.height_min && 
        input.height_max &&
        input.weight_min &&
        input.weight_max &&
        input.life_span &&
        input.temperament) {
      dispatch(postDog(input));
      //console.log(input);
      swal("Congratulation","Your pet has been created!", "success")
      setInput({
        name: "",
        height_min: "",
        height_max: "",
        weight_min: "",
        weight_max: "",
        life_span: "",
        image: "",
        temperament: [],
      });
      setChange(!change)
      navigate('/home');
      }else {
        swal({
          text:'Please, fill all the fields',
          icon: 'error'
        })
    }
  };

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    return (
      <div className={style.bkg}>
      <div className={style.container}>
        
        <img className={style.imgDog} src={imgdefault} alt="dog" />

        <form onSubmit={(e)=>handleSubmit(e)} className={style.form}>
        
        {/**NOMBRE */}
        <div className={style.section}>
          <h5>Name</h5>
          <input 
            type="text"
            name="name"
            value={input.name}
            placeholder="Name..."
            onChange={(e)=>handleInputChange(e)}
            className={style.input}
            autoComplete="off"
          />
          {error.name && <p className={style.error}>{error.name}</p>}
        </div>

            
            {/**PESO */}
            <div className={style.section}>
            <h5>Weight</h5>
            <div className={style.font}>
          <label>Min:</label>
          <input
            type="number"
            name="weight_min"
            value={input.weight_min}
            placeholder= "2"
            onChange={(e)=>handleInputChange(e)}
            className={style.input}
            autoComplete="off"
          />
          {error.weight_min && <p className={style.error}>{error.weight_min}</p>}
            </div>
            <div className={style.font}>
          <label>Max</label>
          <input
            type="number"
            name="weight_max"
            value={input.weight_max}
            placeholder= "5"
            onChange={(e)=>handleInputChange(e)}
            className={style.input}
            autoComplete="off"
          />
          {error.weight_max && <p className={style.error}>{error.weight_max}</p>}
          </div>
          </div>

            {/**ALTURA */}
            <div className={style.section}>
          <h5>Height</h5>
          <div className={style.font}>
          <label>Min:</label>
          <input
            type="text"
            name="height_min"
            value={input.height_min}
            placeholder= "2"
            onChange={(e)=>handleInputChange(e)}
            className={style.input}
            autoComplete="off"
            />
          {error.height_min && <p className={style.error}>{error.height_min}</p>}
          </div>
          <div className={style.font}>
            <label>Max:</label>
          <input
            type="text"
            name="height_max"
            value={input.height_max}
            placeholder= "3"
            onChange={(e)=>handleInputChange(e)}
            className={style.input}
            autoComplete="off"
            />
          {error.height_max && <p className={style.error}>{error.height_max}</p>}
           </div>
          </div>
          

            <div className={style.section}>
            {/**VIDA */}
          <h5>Life Span</h5>
          <input
            type="number"
            name="life_span"
            value={input.life_span}
            placeholder="years..."
            onChange={(e)=>handleInputChange(e)}
            className={style.input}
            autoComplete="off"
          />
          {error.life_span && <p className={style.error}>{error.life_span}</p>}
          </div>

          <div className={style.section}>
            {/**IMAGEN */}
          <h5>Image</h5>
          <input
            type="url"
            name="image"
            value={input.image}
            placeholder="http://myimageontheweb.com.."
            onChange={(e)=>handleInputChange(e)}
            className={style.input}
            autoComplete="off"
          />
          </div>

          <div className={style.section}>
          {/**TEMPERAMENTOS */}
          <h5>Temperaments</h5>
          <select onChange={(e)=>handleSelect(e)} className={style.selectTemp}>
            {temperaments?.map((temp) => {
              return (
                <option key={temp.id} value={temp.name}>
                  {temp.name}
                </option>
              );
            })}
          </select>
          <div className={style.boxSelectTemp}>
          {/* Muestro los temperamentos seleccionados */}
          {input.temperament.map(elem =>
            <div className={style.temps} key={elem}> <p >{elem}</p> 
            <button onClick={()=> handleDelete(elem)} className={style.btnDelete}><TiDelete/></button>
            </div>
            )}   
          <div>
            </div>
            </div>
            </div>
            <button type="submit" disabled={Object.keys(error).length > 0 ? true : false} className={style.btnCreate}>Create Dog</button>
        </form>
       
          {/* <Link to="/home">
          <button className={style.btnReturn}>Return </button>
        </Link> */}
      </div>
      </div>
    );
}

export default CreateDogs
