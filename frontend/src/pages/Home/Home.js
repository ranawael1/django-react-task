import  { Redirect } from 'react-router-dom'



export default function Home() {
    if(!localStorage.getItem('token')){
        return <Redirect to='login'/>
    }
    return (
        <>
        <h1> Welcome home !</h1>
        </>
    )
}