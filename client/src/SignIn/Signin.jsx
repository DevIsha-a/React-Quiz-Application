import React, { useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { json, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import '../Signup/signup.css'
export const SignIn = () => {
  const [name, setemail] = useState('')
  const [password, setPassword] = useState('')
  const [type, setType] = useState('')
  const nav = useNavigate()
  const dispatch = useDispatch()
  const signinNow = async () => {
    let resp = await axios.post("/signin", { name, password, type })
   console.log(resp)
  

   if(resp.data.currentUser[0].name===name &&  resp.data.currentUser[0].password===password &&  resp.data.currentUser[0].type===type)
   {
    localStorage.setItem('jwt', resp.data.mytoken)
    dispatch({
      type: "Login",
      payload: {
        name: resp.data.currentUser[0].name,
        type: resp.data.currentUser[0].type,
        _id: resp.data.currentUser[0]._id
      }
    })
    nav('/')
    toast.success('Logged in!', {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 1000
    });
   }

else if(resp.data==='ni mila')
{
  toast.error('Invalid User credentials!', {
    position: toast.POSITION.BOTTOM_RIGHT,
    autoClose: 1000
  })
  return;
}
else{
  console.log("no response")
}
  
  }

  return (
    <div className="App">
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-md-4">
            <form id="loginform" >

              <div className="form-group">
                <label>Name</label>
                <input
                  type="email"
                  className="form-control"
                  id="EmailInput"
                  name="EmailInput"
                  aria-describedby="emailHelp"
                  placeholder="Enter user name"
                  onChange={(event) => setemail(event.target.value)}
                />

              </div>
              <div id='type' className="form-group">
                <label>User type</label>
                <select onChange={(e) => { setType(e.target.value) }} className="form-control sel " placeholder='select...'>
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


              <button type='button' onClick={() => signinNow()} className="btn btn-primary">
                Login
              </button>

            </form>
          </div>
        </div>
      </div>
    </div>

  )
}
