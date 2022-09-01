import React, {useContext, useEffect} from 'react';
import './Navbar.css';
import userImage from "../../../assets/images.png"
import { Link } from 'react-router-dom';
import authContext from '../../../context/auth/authContext';

const Navbar = () => {
  const context = useContext(authContext)
  const {isAuthenticated, user, logout} = context
  const onClick = (e) =>{
    e.preventDefault()
    logout()
  }
  console.log(user)

  const loggedIn = (
    <>
    <nav className='app__navbar'>
    <div className='app__navbar-logo'>
      <h1>Dictionary</h1>
    </div>
    <ul className='app__navbar-link'>
    <li ><Link to="/favourites">Favourites</Link></li>
    </ul>
    <div className='app__navbar-user-image'>
      <img src= {userImage} alt="loading_Image"/>
    </div>
    <div className='app__navbar-user-name'>
    <h3>{user.firstname + " " + user.lastname}</h3>
    </div>
    <div className='app__navbar-user-logout'>
     <Link to="/"> <input type="text" value="Logout" onClick={onClick}/> </Link>
    </div>
    
  </nav>
    </>)

  const loggedOut = (
    <>
    <nav className='app__navbar'>
    <div className='app__navbar-logo'>
      <h2>Dictionary</h2>
    </div>
    <ul className='app__navbar-link'>
      <li ><Link to="/favourites">Favourites</Link></li>
    </ul>
    <div className='app__navbar-login'>
      <Link to= "/login">Login</Link>
    </div>
    <div className='app__navbar-signup'>
    <Link to= "/signup">Signup</Link>
    </div>
    
  </nav>
    </>
  
  )
  return (
    <>
    
      <ul>
          {isAuthenticated? loggedIn : loggedOut} 
      </ul>
    
    </>
  )
  };

export default Navbar;