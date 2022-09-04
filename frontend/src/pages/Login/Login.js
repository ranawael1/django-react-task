import { useState } from "react"
import "./Login.css"
import axios from 'axios';
import { useHistory, useLocation } from "react-router-dom";


const BASE_URL = "https://localhost:8000"
let tokenRequest = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
    headers: {
      'Content-Type': 'application/json',
      'accept': 'application/json'
    }
})

function useQueryParams () {
    return new URLSearchParams(useLocation().search);
  }

export default function Login() {
    const queryParams = useQueryParams();
    const history = useHistory();
    const [userData, setUserData] = useState({
        email: null,
        password: null

    })

    const loginUser = (email, password) => {
        const loginBody = {email: email, password: password}
        return tokenRequest.post(`/api/token/`, loginBody)
          .then((response)=> {
            window.localStorage.setItem("token", response.data.access);
            window.localStorage.setItem('user', res.config.data);
            return Promise.resolve(response.data);
          }).catch((error)=>{
            return Promise.reject(error);
          });
      }
      

      
    const onChange = (e) => {

        if (e.target.name === "username") {
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

    }
    const onSubmit = (e) => {
        e.preventDefault()
        console.log(userData)
        let email = userData.email
        let password = userData.password
        loginUser(email, password).then((data)=>{
            setUserData({email: email})
            history.push("/");
        }).catch((error)=> {
            console.log(error)
          })

    }
  
    return (
        <div style={{ height: "85vh" }}>
            <form className="container  loginForm col-10 col-md-5" onSubmit={(e) => onSubmit(e)}>
                <h1>Login </h1>
                <div className="form-group input-div my-2">
                    <label htmlFor="exampleInputEmail1">Email</label>
                   <div className="parent">
                       <input type="text"
                    className={`form-control input-field`}
                    name="username"
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
              

                <button type="submit" className="btn btn-success loginButton" name="button">
                    Login</button>
            </form>

        </div>

    )
}