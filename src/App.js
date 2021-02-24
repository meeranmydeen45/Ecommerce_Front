import React from 'react';
import './App.css';
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
import { getUser } from './shared/utils/helper';
import LogoutRoute from './Components/LogoutRoute';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
    };
  }
  render() {
    let navbar = '';
    const isUserAvailable = getUser();
    console.log(isUserAvailable);
    if (isUserAvailable) {
      navbar = (
        <div className="navbarHead">
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
          <div className="navbarText">
            <NavLink activeClassName="active" to="/order">
              Reports
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

          <div className="navbarText" id="userNameText">
            Welcome {isUserAvailable.username} !
          </div>
        </div>
      );
    } else {
      navbar = (
        <div className="navbarHead">
          <div className="navbarText">
            <NavLink exact activeClassName="active" to="/">
              Login
            </NavLink>
          </div>
        </div>
      );
    }
    const updateUserName = () => {
      this.setState({ userName: '' });
    };

    return (
      <div className="containerBox">
        <BrowserRouter>
          {navbar}
          <div className="content">
            <Switch>
              <Provider store={store}>
                <UserRoute exact path="/" handleEvents={updateUserName} component={Login} />
                <AdminRoute path="/register" component={ProductEntry} />
                <AdminRoute path="/order" component={OrderComponent} />
                <AdminRoute path="/cardList" component={CardList} />
                <AdminRoute path="/newcategory" component={NewCategory} />
                <AdminRoute path="/newproducts" component={NewProducts} />
                <AdminRoute path="/newuser" component={NewUser} />
                <LogoutRoute path="/logout" handleEvents={updateUserName} component={Logout} />
              </Provider>
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
