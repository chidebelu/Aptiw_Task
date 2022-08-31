import React, { useContext, useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import './Login.css'
import Navbar from '../../layouts/Navbar/Navbar'
import authContext from '../../../context/auth/authContext'
import Loader from '../../layouts/Loader/Loader'

export default function LoginPage() {

    const [data, setData] = useState({email: "", password:""})
    const context = useContext(authContext)
    const {isAuthenticated, loading, login} = context
    const history = useHistory()
    const onChange = (e) =>{
        e.preventDefault()
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit= (e) =>{
            e.preventDefault()
            login(data)
            setData({
                email:"",
                password:""
            })
    }

    useEffect(()=>{
        if(isAuthenticated){
            history.push("/dashboard")
        }
    })

    return (
        <>
        <Navbar/>
        {loading && <Loader/>}
        <div className=" app__login__container"> <br></br>
            <h2 className='slide-bck-center text-pop-up-top'>WELCOME</h2>
            <h5>Login to your account</h5>
            <form className='app__login-form scale-up-center ' onSubmit={onSubmit} >
                
                <p>
                    <label>Email address</label><br></br>
                    <input type="email" name="email" required onChange={onChange}/>
                </p>
                <p>
                    <label>Password</label><br></br>
                    <input type="password" name="password" required onChange={onChange} minLength={8} />
                </p>
                <br></br>
                <p>
                <input type="submit" name="submit" value="Login" id="submit" />
                </p>
            </form>
            <footer>
                <p><Link to="/">Back to Homepage</Link>.</p>
            </footer>
        </div>
        </>
      
    )

}