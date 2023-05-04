import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

const Protected = (props) => {
    const nav= useNavigate()
   
    useEffect(() => {
        let tkn= localStorage.getItem('jwt')
        if(!tkn){
            nav("/signin")
        }
    
    },[])
    
    
    const {Component}= props
  return (
    <div>
        <Component />
    </div>
    
  )
}

export default Protected