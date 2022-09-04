import './App.css';
// import Signup from './pages/Signup/Signup';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import { BrowserRouter, Route, Switch, Link, Router } from "react-router-dom"

function App() {

  return (
    <BrowserRouter>
      <div className='container mt-5 py-5'style={{minHeight:"100vh"}} >
        <Switch>
        <Route exact path={"/login"} component={Login} />
        <Route exact path={"/"} component={Home} />
     
        </Switch>
      </div>
        
      </BrowserRouter>
  );
}

export default App;