
import React, {useState, useEffect} from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Button } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import './header.css'
const Header = () => {
  // const [loggedInUser, setloggedInUser] = useState('')
    const nav = useNavigate()
    const loggedInUser = useSelector(state => state.user)
    // useEffect(() => {
    //  setloggedInUser(user)
    // }, [user)
    const dispatch = useDispatch()
    const Logout = () => {
      localStorage.removeItem("jwt")
        nav('/signin')
        dispatch({
            type: 'Logout',
            payload: loggedInUser
        })
    }
    return (<>
        <Navbar bg="light" expand="lg">
        <Container className='c'>
          <Navbar.Brand className='link' >React-Quiz-Application</Navbar.Brand>
         
         
             <Nav className="me-auto">
              {!(loggedInUser === "") ?
               <>  <Nav.Link className='link' to="/signin" as={Link} onClick={() => Logout()}>Logout</Nav.Link>
              <Navbar.Text className='t' color='red'>{loggedInUser} </Navbar.Text>
                </>
               :<>
               <Nav.Link className='link' to="/signin" as={Link} >Signin</Nav.Link>
               <Nav.Link className='link' to="/signup" as={Link} >Signup </Nav.Link> </> }
            </Nav> 
        </Container>
      </Navbar>
      </>
      );   
}

export default Header