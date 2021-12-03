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
    
    const handleChange = (e) => {
     e.preventDefault()
     setName(e.target.value)
     //console.log(name)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(getNameDogs(name))
        setName('')
    }

    return (
        <div className={styles.container}>
            <div>
            <input  type="text" placeholder="Name ..." value={name} onChange={(e) => handleChange(e) }/>
            <button type='submit' onClick={(e)=> handleSubmit(e)} className={styles.search}><ImSearch/></button>
            </div>
            <div>
            <button onClick={(e) => {handleClick(e)}}  className={styles.refresh}>  Refresh  </button>
            </div>
        </div>
    )
}

export default SearchBar
