import React from 'react';
import './App.css';
import Product from './Components/Product';
import Cart from './Components/Cart';
import { Provider } from 'react-redux';
import { store } from './Redux/Store';
import OrderComponent from './Components/OrderComponent';
import CardList from './Components/CartList';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import ProductEntry from './Components/ProductEntry';
import NewCategory from './Components/NewCategory';
import NewProducts from './Components/NewProducts';
import Login from './Components/Login';
import NewUser from './Components/NewUser';
import AdminRoute from './Components/AdminRoute';
import UserRoute from './Components/UserRoute';
import Logout from '../src/Components/Logout';

class App extends React.Component {
  render() {
    return (
      <div className="containerBox">
        <BrowserRouter>
          <div className="navbarHead">
            <div className="navbarText">
              <NavLink exact activeClassName="active" to="/">
                Home
              </NavLink>
            </div>
            <div className="navbarText">
              <NavLink activeClassName="active" to="/register">
                ProductEntry
              </NavLink>
            </div>
            <div className="navbarText">
              <NavLink activeClassName="active" to="/order">
                PlacerOrder
              </NavLink>
            </div>
            <div className="dropdown">
              <div className="dropdown-toggle" data-toggle="dropdown">
                MenuItems
              </div>
              <div className="dropdown-menu">
                <div className="dropdown-item">
                  <NavLink to="/newcategory">Add-Catergory</NavLink>
                </div>
                <div className="dropdown-item">
                  <NavLink to="/newproducts">Add-Products</NavLink>
                </div>
                <div className="dropdown-item">
                  <NavLink to="/newuser">NewUser</NavLink>
                </div>
                <div className="dropdown-item">
                  <NavLink to="/logout">LogOut</NavLink>
                </div>
              </div>
            </div>
          </div>

          <div className="content">
            <Switch>
              <Provider store={store}>
                <UserRoute exact path="/" component={Login} />
                <AdminRoute path="/register" component={ProductEntry} />
                <AdminRoute path="/order" component={OrderComponent} />
                <AdminRoute path="/cardList" component={CardList} />
                <AdminRoute path="/newcategory" component={NewCategory} />
                <AdminRoute path="/newproducts" component={NewProducts} />
                <AdminRoute path="/newuser" component={NewUser} />
                <Route path="/logout" component={Logout} />
              </Provider>
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
