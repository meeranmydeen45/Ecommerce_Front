import React from 'react';
import './App.css';
import Product from './Components/Product';
import Cart from './Components/Cart';
import { Provider } from 'react-redux'
import {store} from './Redux/Store'
import OrderComponent from './Components/OrderComponent'
import CardList from './Components/CartList'
import {BrowserRouter, Switch, Route, NavLink} from 'react-router-dom'
import ProductEntry from './Components/ProductEntry'
import NewCategory from './Components/NewCategory'
import NewProducts from './Components/NewProducts'



class App extends React.Component {
   

render(){
 
 
 

return (
  
<div className="containerBox">
<BrowserRouter>
     <div className="navbarHead">
       <div className="navbarText"><NavLink to="/">Home</NavLink></div>
       <div className="navbarText"><NavLink to="/register">ProductEntry</NavLink></div>
       <div className="navbarText"><NavLink to="/order">PlacerOrder</NavLink></div>
       <div className="dropdown">
  <div className="dropdown-toggle" data-toggle="dropdown">
    MenuItems
  </div>
  <div className="dropdown-menu">
    <div className="dropdown-item"><NavLink to="/newcategory">Add-Catergory</NavLink></div>
    <div className="dropdown-item"><NavLink to="/newproducts">Add-Products</NavLink></div>
  </div>
</div>
      
     </div>
     
     <div className="content">

      <Switch>
      <Provider store = {store}> 
      <Route path="/"/>
      <Route path="/register" component={ProductEntry}/>
      <Route path="/order" component={OrderComponent}/>
      <Route path ="/cardList" component={CardList}/>
      <Route path ="/newcategory" component={NewCategory}/>
      <Route path ="/newproducts" component={NewProducts}/>
      </Provider>
      </Switch>
       
      </div>  
      </BrowserRouter>
    </div>
  );


}
}

export default App;



