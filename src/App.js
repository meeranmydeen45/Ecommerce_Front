import React from 'react';
import './App.css';
import Product from './Components/Product';
import Cart from './Components/Cart';
import { Provider } from 'react-redux'
import {store} from './Redux/Store'
import OrderComponent from './Components/OrderComponent'
import CardList from './Components/CartList'
import {BrowserRouter, Switch, Route, NavLink} from 'react-router-dom'
import ProductEntry from './Components/ProductEntry';



class App extends React.Component {
   

render(){
 

return (
  
<div className ="container-fluid">
<BrowserRouter>
<nav className="navbar navbar-expand-md bg-dark">
  <a href="/Logo" className="navbar-brand">Logo</a>
  <ul className="navbar-nav">
  <li className="nav-item"><NavLink to="/" className="nav-link">HomePage</NavLink></li>
    <li className="nav-item"><NavLink to="/register" className="nav-link">Product-Registration</NavLink></li>
    <li className="nav-item"><NavLink to="/order" className="nav-link">Delivery</NavLink></li>
    
    <li className="nav-item dropdown">
      <a href="/DropBox" className="nav-link dropdown-toggle" data-toggle="dropdown">DropBox</a>
      <div className="dropdown-menu">
       <a href="#" className="dropdown-item">Page 1</a>
       <a href="#" className="dropdown-item">Page 2</a>
       <NavLink to="/order" className="dropdown-item">Page 3</NavLink>
      </div>
      </li>
  </ul>
</nav>


     <div className="content">

      <Switch>
      <Provider store = {store}> 
      <Route path="/"/>
      <Route path="/register" component={ProductEntry}/>
      <Route path="/order" component={OrderComponent}/>
      <Route path ="/cardList" component={CardList}/>
      </Provider>
      </Switch>
       
      </div>  
      </BrowserRouter>
    </div>
  );


}
}

export default App;



