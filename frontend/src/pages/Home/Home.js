import { useState, useEffect} from "react"
import  { Redirect, useHistory } from 'react-router-dom'
import axios from 'axios'
import Navbar from "../../components/Navbar/Navbar"
import NivoChart from "../../components/charts/NivoChart"
import Timeseries from "../../components/charts/Timeseries"
import Rechart from "../../components/charts/Rechart"


const BASE_URL = "http://localhost:8000"
// let requestService = axios.create({
//     baseURL: BASE_URL,

// })
// requestService.interceptors.request.use(
//     (config) => {
//       const token = TokenService.getAccessToken();
//       if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//       }
//       return config;
//     },
//     (error) => {
//       Promise.reject(error);
//     },
//   );

export default function Home() {
    const [userData, setUserData]= useState({
        username: null
    })
    const [lineData , setData] = useState()
    const history = useHistory()

    // onload get user details
    useEffect(() => {
        let userRequest = axios.create({
            baseURL: BASE_URL,
            timeout: 5000,
            headers: {
              'Content-Type': 'application/json',
              'accept': 'application/json',
              'Authorization': `Bearer ${window.localStorage.getItem("token")}`
            }
        })
      userRequest.get(`/user/home/`)
          .then((response)=> {
            setUserData({username: response.data.username})
              setData(response.data)
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
        {userData &&
        <>
        <Navbar username={userData.username}/>
        <h1> Welcome home, {userData.username}!</h1>
        <button  className="btn btn-danger my-2" onClick={()=>onClick()}>
            logout</button>

            <NivoChart />
            <Timeseries/>
            <Rechart/>
        </>
        }
        </>
    )
}