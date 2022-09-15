import "../Login/Login.css"
import axios from 'axios'
import { useState} from "react"
import { Link, useHistory, Redirect } from "react-router-dom"

const BASE_URL = "http://localhost:8000"
let tokenRequest = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
    headers: {
      'Content-Type': 'application/json',
      'accept': 'application/json'
    }
})
export default function Signup() {
    const history = useHistory()
    const [userData, setUserData] = useState({
        username: null,
        email: null,
        password: null,
        password2: null

    })
    const [userError, setUserError] = useState({
        msg: null,
    })
    
    const registerUser = (username,email, password, password2) => {
        const registerBody = {username: username, email: email, password: password, password2: password2}
        return tokenRequest.post(`/user/register/`, registerBody)
            .then((response)=> {
            window.localStorage.setItem("token", response.data.token.access)
            window.localStorage.setItem("refresh-token", response.data.token.refresh)
            window.localStorage.setItem('user', response.data.user)
            return Promise.resolve(response.data)
            })
            .catch((error)=>{
            return Promise.reject(error)
            })
      }

    const onChange = (e) => {
        if (e.target.name === "username") {
            setUserData({
                ...userData,
                username: e.target.value
            })
        }
        else if (e.target.name === "email") {
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
        else if (e.target.name === "password2") {
            setUserData({
                ...userData,
                password2: e.target.value
            })
        }
        setUserError({msg:null})
    }

    const onSubmit = (e) => {
        e.preventDefault()
        let checkEmail = userData.email !== null && userData.email !== ""
        let checkUser = userData.username !== null && userData.username !== ""
        let checkpsw = userData.password !== null && userData.password !== ""
        let checkpsw2 = userData.password2 !== null && userData.password2 !== ""
        if (checkEmail && checkUser && checkpsw && checkpsw2){
            let username = userData.username
            let email = userData.email
            let password = userData.password
            let password2 = userData.password2
            registerUser(username,email, password, password2)
            .then((data)=>{
                history.push("/");
            })
            .catch((error)=> {
                setUserError({msg: error.response.data.error})
            })
        }
        else{
            setUserError({msg: "Please enter all fields!"})
        }

    }
    
    // if user already logged in redirect to home
    if(localStorage.getItem('token')){
        return <Redirect to=''/>
    }
    return (
        <div style={{ height: "85vh" }}>
            <form className="container  loginForm col-10 col-md-5" onSubmit={(e) => onSubmit(e)}>
                <h1 className="text-center">Signup </h1>
                <div className="form-group input-div my-2">
                    <label htmlFor="exampleInputEmail1">Username</label>
                   <div className="parent">
                       <input type="text"
                    className={`form-control input-field`}
                    name="username"
                    onChange={(e)=> onChange(e)}
                    required
                    />    
                 </div>    
                </div>
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
                <div className="form-group input-div my-2">
                    <label htmlFor="exampleInputEmail1">Confirm password</label>
                   <div className="parent">
                       <input type="password"
                    className={`form-control input-field`}
                    name="password2"
                    onChange={(e)=> onChange(e)}
                    />    
                 </div>
                </div>
              
            {userError.msg&& <small className="text-danger">{userError.msg} </small>}

                <button type="submit" className="btn btn-primary loginButton my-2" name="button">
                    Siginup</button>
                    <p className="my-1">Already have account?</p>
                    <p style={{textAlign: 'center'}} >
                  <Link to="/login"  className="text-link text-center text-decoration-none">Login</Link>
                  </p>
            </form>
        </div>

    )
}