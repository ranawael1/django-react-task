import { useState, useEffect} from "react"
import  { Redirect, useHistory } from 'react-router-dom'
import axios from 'axios'
import Navbar from "../../components/Navbar/Navbar"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faTrash } from "@fortawesome/free-solid-svg-icons"



const BASE_URL = "http://localhost:8000"
let productsRequest 

export default function Products() {
    let [products, setProucts] = useState(null)
    let [userOrder, setUserOrder] = useState(null)

     // onload get user details
    useEffect(() => {
        productsRequest = axios.create({
            baseURL: BASE_URL,
            timeout: 5000,
            headers: {
              'Content-Type': 'application/json',
              'accept': 'application/json',
              'Authorization': `Bearer ${window.localStorage.getItem("token")}`
        
            }
        })
        productsRequest.get(`/market/products/`)
            .then((response)=> {
                setProucts(response.data)
                return  productsRequest.get(`/market/products-order/`)
            })
            .then((response)=> {
                setUserOrder(response.data)
                return Promise.resolve(response.data)
            })
            .catch((error)=>{
                return Promise.reject(error)
            }) 
      }, [])

    const addOne = (id) => {
        return productsRequest.post(`/market/add/${id}`)
            .then((response)=> {
                return  productsRequest.get(`/market/products-order/`)
            })
            .then((response)=> {
                    setUserOrder(response.data)
                    return Promise.resolve(response.data)
                })
            .catch((error)=>{
            return Promise.reject(error)
            })
    }  
    const removeOne = (id) => {
        return productsRequest.post(`/market/remove/${id}`)
            .then((response)=> {
                return  productsRequest.get(`/market/products-order/`)
            })
            .then((response)=> {
                setUserOrder(response.data)
                return Promise.resolve(response.data)
            })
            .catch((error)=>{
            return Promise.reject(error)
            })
    }  
    const removeProduct = (id) => {
        return productsRequest.post(`/market/delete/${id}`)
            .then((response)=> {
                console.log(response.data)
                return  productsRequest.get(`/market/products-order/`)
            })
            .then((response)=> {
                setUserOrder(response.data)
                return Promise.resolve(response.data)
            })
            .catch((error)=>{
            return Promise.reject(error)
            })
    }  
    const addItem = (id)=>{
        addOne(id)
        .then((data)=>{
        })
        .catch((error)=> {
        })
    }
    const removeItem = (id)=>{
        removeOne(id)
        .then((data)=>{
        })
        .catch((error)=> {
        })     
    }
    const deleteProduct = (id)=>{
        removeProduct(id)
        .then((data)=>{
        })
        .catch((error)=> {
        })    
    }
    useEffect(() => { }, [ userOrder])
    return (
        <>
        
        <Navbar username={window.localStorage.getItem('user')} />
        <h1 className="m-2"> Products</h1>
        <div className='row'>  
        {products &&
        <>
        {products.map((product,index) =>  (
        <div className={'col-8 offset-2 offset-sm-0 col-sm-6 col-md-4 col-lg-3 moviesDiv text-center'} key={index}>
             
            <img src={`https://static.vecteezy.com/system/resources/previews/004/999/463/original/shopping-cart-icon-illustration-free-vector.jpg`} width="100px"></img>
            <h6 className=''>{product.name}</h6>
            <h6 className=''>{product.price} $</h6>
            {userOrder&& 
            <>
            {Object.keys(userOrder.products.filter(p => p.product.id=== product.id)).length > 0 ?
                <> 
                <FontAwesomeIcon icon={faPlus} onClick={()=>addItem(product.id)} />

                {userOrder.products.filter(pre => pre.product.id=== product.id).map(pre => (
                    <small className="mx-2">{pre.quantity}</small>
                ))}
                <FontAwesomeIcon icon={faMinus} onClick={()=>removeItem(product.id)}/>
                <FontAwesomeIcon className="mx-3" icon={faTrash} onClick={()=>deleteProduct(product.id)}/>
                </>
            : 
            <button  className="btn btn-warning my-2" onClick={()=>addItem(product.id)}>
            Add to cart</button>
            }</>
            
        }
        </div>
         ))} 
         </>
        }
        </div>
        </>
    )
}