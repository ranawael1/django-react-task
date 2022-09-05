import "./Login.css"
import { useState } from "react"
import { Link, useHistory, Redirect } from "react-router-dom"
import axios from 'axios'

const BASE_URL = "http://localhost:8000"
let tokenRequest = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
    headers: {
      'Content-Type': 'application/json',
      'accept': 'application/json'
    }
})
export default function Login() {
    const history = useHistory()
    const [userData, setUserData] = useState({
        email: null,
        password: null

    })
    const [userError, setUserError] = useState({
        msg: null,
    })
    
    const loginUser = (email, password) => {
        const loginBody = {email: email, password: password}
        return tokenRequest.post(`/user/login/`, loginBody)
            .then((response)=> {
            window.localStorage.setItem("token", response.data.token.access)
            window.localStorage.setItem('user', response.data.user)
            return Promise.resolve(response.data)
            })
            .catch((error)=>{
            return Promise.reject(error)
            })
    }  

    const onChange = (e) => {
        if (e.target.name === "email") {
            setUserData({
                ...userData,
                email: e.target.value
            })
        }
        else if (e.target.name === "password") {
            setUserData({
                ...userData,
                password: e.target.value
            })  
        }
        setUserError({msg:null})
    }

    const onSubmit = (e) => {
        e.preventDefault()
        if ((userData.email !== null && userData.email !== "") && (userData.password !== null&& userData.password !== "")){
            let email = userData.email
            let password = userData.password
            loginUser(email, password)
            .then((data)=>{
                history.push("/")
            })
            .catch((error)=> {
                setUserError({msg: error.response.data.error})
            })
        }
        else{
            setUserError({msg: "You must enter email and password!"})
        }
    }
    // if user already logged in redirect to home
    if(localStorage.getItem('token')){
        return <Redirect to=''/>
    }
    return (
        <div style={{ height: "85vh" }}>
            <form className="container loginForm col-10 col-md-5" onSubmit={(e) => onSubmit(e)}>
                <h1 className="text-center">Login </h1>
                <div className="form-group input-div my-2">
                    <label htmlFor="exampleInputEmail1">Email</label>
                   <div className="parent">
                       <input type="email"
                    className={`form-control input-field`}
                    name="email"
                    onChange={(e)=> onChange(e)}
                    />    
                 </div>    
                </div>
                <div className="form-group input-div my-2">
                    <label htmlFor="exampleInputEmail1">Password</label>
                   <div className="parent">
                       <input type="password"
                    className={`form-control input-field`}
                    name="password"
                    onChange={(e)=> onChange(e)}
                    />    
                 </div>    
                </div>
                {userError.msg&& <small className="text-danger">{userError.msg} </small>}
                <button type="submit" className="btn btn-success loginButton my-2" name="button">
                    Login</button>
                    <p className="my-1">Don't have account?</p>
                    <p style={{textAlign: 'center'}} >
                  <Link to="/signup"  className="text-link text-center text-decoration-none">Signup</Link>
                  </p>
            </form>
        </div>

    )
}