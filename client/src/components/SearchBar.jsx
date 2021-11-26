import React from 'react'
import {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { getNameDogs } from '../actions/index'

function SearchBar() {
    const dispatch = useDispatch()
    const [name, setName] = useState('')
    
    const handleChange = (e) => {
     e.preventDefault()
     setName(e.target.value)
     console.log(name)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(getNameDogs(name))
        setName('')
    }

    return (
        <div>
            <input type="text" placeholder="Buscar ..." value={name} onChange={(e) => handleChange(e)}/>
            <button type='submit' onClick={(e)=> handleSubmit(e)}>Buscar</button>
        </div>
    )
}

export default SearchBar
