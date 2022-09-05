import { useState, useEffect} from "react"
import  { Redirect, useHistory } from 'react-router-dom'
import axios from 'axios'

const BASE_URL = "http://localhost:8000"
let userRequest = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
    headers: {
      'Content-Type': 'application/json',
      'accept': 'application/json',
      'Authorization': `Bearer ${window.localStorage.getItem("token")}`
    }
})
export default function Home() {
    const [userData, setUserData]= useState({
        username: null
    })
    const history = useHistory()

    // onload get user details
    useEffect(() => {
        userRequest.get(`/user/home/`)
            .then((response)=> {
                setUserData({username: response.data.username})
            return Promise.resolve(response.data)
            })
            .catch((error)=>{
                window.localStorage.clear()
                history.push("/login")
                return Promise.reject(error)
            }) 
      }, [])

    const onClick = ()=>{
        window.localStorage.clear()
        history.push("/login")
    }
    // if unauthorized user
    if(!localStorage.getItem('token')){
        return <Redirect to='login'/>
    }
    return (
        <>
        <h1> Welcome home, {userData.username}!</h1>
        <button  className="btn btn-danger my-2" onClick={()=>onClick()}>
            logout</button>
        </>
    )
}