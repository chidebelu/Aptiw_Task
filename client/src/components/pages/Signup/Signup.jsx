import React, {useState, useContext, useEffect} from 'react'
import { Link, useHistory } from 'react-router-dom'
import './Signup.css'
import Navbar from '../../layouts/Navbar/Navbar'
import Loader from '../../layouts/Loader/Loader'
import authContext from '../../../context/auth/authContext'

export default function SignUpPage() {
    const [data, setData] = useState({firstname: "", middlename:"", lastname:"", email:"", password:"", confirmpassword:""})
    const context = useContext(authContext)
    const {signup, loading, isAuthenticated} = context
    const history = useHistory()
    const { password, confirmpassword} = data
    
    useEffect(()=>{
        if(isAuthenticated){
            history.push("/dashboard")
        }
        //eslint-disable-next-line
    },[isAuthenticated, history])

    const onChange = (e)=>{
        e.preventDefault()
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = (e) =>{
        e.preventDefault()
        if(password !== confirmpassword){
            return
        }
        else{
            signup(data)
        setData({
            firstname: "", middlename:"", lastname:"",email: "", password:"", confirmpassword:""
        })
        }
        
      }

    return (
        <>
        <Navbar/>

        {loading && <Loader/>}
        <div className=" app__signup__container"> <br></br>
            <h2 className='slide-bck-center text-pop-up-top'>WELCOME</h2>
            <h5>Login to your account</h5>
            <form className='app__signup-form scale-up-center' onSubmit={onSubmit} >
                
                <p>
                    <label>First Name</label><br></br>
                    <input type="text" name="firstname" required onChange={onChange}/>
                </p>
                <p>
                    <label>Middle Name</label><br></br>
                    <input type="text" name="middlename" required onChange={onChange}/>
                </p>
                <br></br>
                <p>
                    <label>Last Name</label><br></br>
                    <input type="text" name="lastname" required onChange={onChange}/>
                </p>
                <p>
                    <label>Email address</label><br></br>
                    <input type="email" name="email" required onChange={onChange} />
                </p>
                <p>
                    <label>Password</label><br></br>
                    <input type="password" name="password" required onChange={onChange}/>
                </p>
                <br></br>
                <p>
                    <label>Confirm Password</label><br></br>
                    <input type="password" name="confirmpassword" required onChange={onChange}/>
                </p>
                <p>
                    <input type="checkbox" name="checkbox" id="checkbox" required /> <span>I agree to all statements in <a href="https://google.com" >terms of service</a></span>.
                </p> <br></br>
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