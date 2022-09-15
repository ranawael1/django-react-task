import { useState, useEffect} from "react"
import  { Link, Redirect, useHistory } from 'react-router-dom'
import axios from 'axios'
import Navbar from "../../components/Navbar/Navbar"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  } from "@fortawesome/free-solid-svg-icons"
import {React} from 'react'

const BASE_URL = "http://localhost:8000"
let productsRequest

export default function Cart() {
    let [products, setProucts] = useState(null)
    let [userOrder, setUserOrder] = useState(null)

    useEffect(() => {
        productsRequest= axios.create({
            baseURL: BASE_URL,
            timeout: 5000,
            headers: {
              'Content-Type': 'application/json',
              'accept': 'application/json',
              'Authorization': `Bearer ${window.localStorage.getItem("token")}`
        
            }
        })
        productsRequest.get(`/market/products-order/`)         
            .then((response)=> {
                console.log(response.data)
                setUserOrder(response.data)
                return Promise.resolve(response.data)
            })
            
            .catch((error)=>{
                return Promise.reject(error)
            }) 
      }, [])

    return (
        <>
        <Navbar username={window.localStorage.getItem('user')}/>
        <div className="container col-12 col-md-8 p-3 my-4">

        <div class="table-responsive text-]]">
            <h2>Order Summary</h2>
            {userOrder &&
         <>
          {Object.keys(userOrder.products).length === 0 ?
                
                    <dic colspan="6">
                        <p className="mr-auto">Your cart is empty!</p>
                        <Link className="btn btn-primary mr-auto" to="/products">Continue shopping</Link>
                    </dic>
                
            :
            <table class="table">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Item name</th>
                    <th scope="col">Price</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Total Item Price</th>
                </tr>
                </thead>
                <tbody>
                
        {userOrder.products.map((product,index) =>  (
                <tr>
                    <th scope="row">{index}</th>
                    <td>{product.product.name}</td>
                    <td>{product.product.price}</td>
                    <td>
                        <a href="{% url 'core:remove-single-item-from-cart' order_item.item.pk %}"><i class="fas fa-minus mr-2"></i></a>
                        {product.quantity}
                        <a href="{% url 'core:add-to-cart' order_item.item.pk %}"><i class="fas fa-plus ml-2"></i></a>
                    </td>
                    <td>
                
                    {product.product_price} $
                    <a href="{% url 'core:remove-from-cart' order_item.item.pk %}">
                        <i class="fas fa-trash float-right text-danger"></i>
                    </a>
                    </td>
                </tr>    
                ))
                }
                
               <> <tr>
                    <td colspan="4">
                        <b>Order Total</b>
                    </td>
                    <td>{userOrder.order.total_price}</td>
                </tr>

                <tr>
                    <td colspan="5">
                        <Link class="btn btn-primary float-right" to="/products">Continue shopping</Link>
                    </td>
                </tr>  </>

                </tbody>
            </table>}
            </>}

        </div>
        
       
        </div>
        </>
    )
}