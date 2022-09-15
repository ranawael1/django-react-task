import React from 'react'
import { useState, useEffect} from "react"
import axios from 'axios'
import moment from 'moment'

import {
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Scatter,
  Line,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
const BASE_URL = "http://localhost:8000"
let userRequest = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
    headers: {
      'Content-Type': 'application/json',
      'accept': 'application/json',
    }
})


export default function Rechart() {
    const [lineData , setData] = useState()
    useEffect(() => {
    
        userRequest.get(`/market/one-data/`)
            .then((response)=> {
                setData(response.data)
                console.log(response.data)
                return Promise.resolve(response.data)
  
            })
            .catch((error)=>{
                return Promise.reject(error)
            }) 
      }, [])
      useEffect(() => { 
    
      }, [ lineData])
    return(
      <div className="container" style={{ height: "500px", width: "100%" }}>
      <h1 className="text-center" >Rechart</h1>
    <ResponsiveContainer width = '80%' height = {400} style={{margin : "0 auto" }}>
    <ScatterChart>
      <XAxis
        dataKey = 'time'
        domain = {['auto', 'auto']}
        name = 'Time'
        // type = 'string'
      />
      <YAxis dataKey = 'value' name = 'Value' />

      <Scatter
        data = {lineData}
        line = {{ stroke: '#111' }}
        lineJointType = 'monotoneX'
        lineType = 'joint'
        name = 'Values'
      />
    <Line type="monotone" dataKey="value" stroke="#82ca9d" />
 {/* <Line data = {data2} type="monotone" dataKey="pv" stroke="#82ca9d"/>  */}

    </ScatterChart>
  </ResponsiveContainer>
  </div>
)


}

