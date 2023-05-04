import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import "./signup.css"
export const Signup = () => {
    const [name, setname] = useState('')
    const [email, setemail] = useState('')
    const [password, setPassword] = useState('')
    const [type, setType]= useState('')
    const nav= useNavigate()
    const register = async () => {
nav('/')
        await axios.post("/signup", { name, email, password, type })
        toast.success('signed Up!', {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 1000       });
    }

    return (
        <div className="App">
        <div className="container">
          <div className="row d-flex justify-content-center">
            <div className="col-md-4">
              <form id="loginform" >
              <div className="form-group">
                  <label>Your Name</label>
                  <input
                    type="name"
                    className="form-control"
                    id="NameInput"
                    name="NameInput"
                    aria-describedby="emailHelp"
                    placeholder="Enter Your Name"
                    onChange={(event) => setname(event.target.value)}
                  />
                  
                </div>
                <div className="form-group">
                  <label>Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="EmailInput"
                    name="EmailInput"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                    onChange={(event) => setemail(event.target.value)}
                  />
                 
                </div>
                <div className="form-group">
                  <label>User Type</label>
                  <select  onChange={(e)=>{setType(e.target.value)}}  className="form-control sel" placeholder='select...'>
                    <option ></option>
                    <option value='staff'>Staff</option>
                    <option value='student'>student</option>
                    
                  </select>
               
                 
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                    placeholder="Password"
                    onChange={(event) => setPassword(event.target.value)}
                  /> </div>
                
  
                <button type='button' onClick={()=>{register()}} className="btn btn-primary">
                  Submit
                </button>
                <Link to='/Login/' >Click here to login</Link> 
  
              </form>
              <ToastContainer></ToastContainer>
            </div>
          </div>
        </div>
      </div>
    )
}
