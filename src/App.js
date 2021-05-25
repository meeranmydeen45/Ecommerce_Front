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
import StockPriceChange from './Components/StockPriceChange';
import Login from './Components/Login';
import NewUser from './Components/NewUser';
import PaymentPage from './Components/PaymentPage';
import ReversalPage from './Components/ReversalPage';
import SizesAddPage from './Components/SizesAddPage';
import CustomerAccountPage from './Components/CustomerAccountPage';
import GetPendingBillsPage from './Components/GetPendingBillsPage';
import ReprintBillPage from './Components/ReprintBillPage';
import CashPositionPage from './Components/CashPositionPage';
import AdminRoute from './Components/AdminRoute';
import UserRoute from './Components/UserRoute';
import PDFTableCreation from './Components/PDFTableCreation';
import ReceiptVoucherPage from './Components/ReceiptVoucherPage';
import GlobalCashCreditPage from './Components/GlobalCashCreditPage';
import GlobalCashDebitPage from './Components/GlobalCashDebitPage';
import ModifiedBillsPage from './Components/ModifiedBillsPage';
import ProdAddHistoryReportPage from './Components/ProdAddHistoryReportPage';
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
          <div className="div1navbarLogo">
            <div className="navbarLogo">
              <a href="#">Logo</a>
            </div>
          </div>

          <div className="div2afterLogo">
            <div>
              <NavLink activeClassName="active" to="/register">
                ProductEntry
              </NavLink>
            </div>
            <div>
              <NavLink activeClassName="active" to="/order">
                PlacerOrder
              </NavLink>
            </div>
            <div>
              <NavLink activeClassName="active" to="/payment">
                Payment
              </NavLink>
            </div>
            <div>
              <NavLink activeClassName="active" to="/reverse">
                Reverse Entry
              </NavLink>
            </div>
            <div>
              <NavLink activeClassName="active" to="/order">
                Reports
              </NavLink>
            </div>
            <div>
              <NavLink activeClassName="active" to="/prodaddhistoryreport">
                Product Add History Report
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
                  <NavLink to="/newsizes">Add-Sizes</NavLink>
                </div>
                <div className="dropdown-item">
                  <NavLink to="/stockpricechange">StockPrice-Edit</NavLink>
                </div>
                <div className="dropdown-item">
                  <NavLink to="/createcustomeraccount">Create-Cust-Account</NavLink>
                </div>
                <div className="dropdown-item">
                  <NavLink to="/getallpendingbills">Get-PendingBills</NavLink>
                </div>
                <div className="dropdown-item">
                  <NavLink to="/reprintbill">Reprint-Bill</NavLink>
                </div>
                <div className="dropdown-item">
                  <NavLink to="/cashposition">Cash-Position</NavLink>
                </div>
                <div className="dropdown-item">
                  <NavLink to="/newuser">NewUser</NavLink>
                </div>
                <div className="dropdown-item">
                  <NavLink to="/TestPrintPDF">TestPrintPDF</NavLink>
                </div>
                <div className="dropdown-item">
                  <NavLink to="/logout">LogOut</NavLink>
                </div>
              </div>
            </div>
            <div className="dropdown">
              <div className="dropdown-toggle" data-toggle="dropdown">
                Accounts
              </div>
              <div className="dropdown-menu">
                <div className="dropdown-item">
                  <NavLink to="/receiptvoucher">Receipt-Voucher</NavLink>
                </div>
                <div className="dropdown-item">
                  <NavLink to="/globalcashcredit">GlobalCash-Credit</NavLink>
                </div>
                <div className="dropdown-item">
                  <NavLink to="/globalcashdebit">GlobalCash-Debit</NavLink>
                </div>
                <div className="dropdown-item">
                  <NavLink to="/modifiedBillsPage">ModifiedBills</NavLink>
                </div>
              </div>
            </div>
            <div id="userNameText">Welcome {isUserAvailable.username} !</div>
          </div>
        </div>
      );
    } else {
      navbar = '';
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
                <AdminRoute path="/Payment" component={PaymentPage} />
                <AdminRoute path="/reverse" component={ReversalPage} />
                <AdminRoute path="/newcategory" component={NewCategory} />
                <AdminRoute path="/newproducts" component={NewProducts} />
                <AdminRoute path="/newsizes" component={SizesAddPage} />
                <AdminRoute path="/createcustomeraccount" component={CustomerAccountPage} />
                <AdminRoute path="/getallpendingbills" component={GetPendingBillsPage} />
                <AdminRoute path="/reprintbill" component={ReprintBillPage} />
                <AdminRoute path="/cashposition" component={CashPositionPage} />
                <AdminRoute path="/stockpricechange" component={StockPriceChange} />
                <AdminRoute path="/newuser" component={NewUser} />
                <AdminRoute path="/TestPrintPDF" component={PDFTableCreation} />
                <AdminRoute path="/receiptvoucher" component={ReceiptVoucherPage} />
                <AdminRoute path="/globalcashcredit" component={GlobalCashCreditPage} />
                <AdminRoute path="/globalcashdebit" component={GlobalCashDebitPage} />
                <AdminRoute path="/modifiedBillsPage" component={ModifiedBillsPage} />
                <AdminRoute path="/prodaddhistoryreport" component={ProdAddHistoryReportPage} />
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
