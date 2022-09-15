import './App.css';
import Login from './pages/Auth/Login/Login';
import Signup from './pages/Auth/Siginup/Signup';
import Home from './pages/Home/Home';
import Products from './pages/Products/Products';
import Cart from './pages/Cart/Cart';
import { BrowserRouter, Route, Switch } from "react-router-dom"


function App() {

  return (
    <BrowserRouter>
        <Switch>
        <Route exact path={"/login"} component={Login} />
        <Route exact path={"/signup"} component={Signup} />
        <Route exact path={"/products"} component={Products} />
        <Route exact path={"/cart"} component={Cart} />
        <Route exact path={"/"} component={Home} />
     
        </Switch>
        
      </BrowserRouter>
    
  );
}

export default App;