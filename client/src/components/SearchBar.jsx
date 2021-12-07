import React from 'react'
import {useState} from 'react'
import {useDispatch} from 'react-redux'
import {getDogs, getNameDogs } from '../actions/index'
import styles from './styless/SearchBar.module.css' 
//ICONS
import {ImSearch} from 'react-icons/im'

function SearchBar() {
    const dispatch = useDispatch()

    const [name, setName] = useState('')
   
    const handleClick= (e)=> {
        e.preventDefault();
        dispatch(getDogs());
      }
    

    const handleSubmit = (e) => {
        e.preventDefault()
        if(name.length === 0){
            return alert('Please enter a valid name')
        }else{
            dispatch(getNameDogs(name))
            setName('')
        }
        
    }

    return (
        <div className={styles.container}>
            <form onSubmit={(e)=> handleSubmit(e)} >
            <input 
             type="text" 
             placeholder="Name ..."
             value={name}
             onChange={(e) => setName(e.target.value) }
            />
            <button type="submit" onClick={(e)=> handleSubmit(e)} className={styles.search}><ImSearch/></button>
            </form>

            <div>
            <button onClick={(e) => handleClick(e)}  className={styles.refresh}>  Refresh  </button>
            </div>
        </div>
    )
}

export default SearchBar
