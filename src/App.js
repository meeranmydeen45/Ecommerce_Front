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
import ProdSaleHistoryReportPage from './Components/ProdSaleHistoryReportPage';
import ProdSaleProfitReportPage from './Components/ProdSaleProfitReportPage';
import ProdStockReportPage from './Components/ProdStockReportPage';
import ProdCostComparisonPage from './Components/ProdCostComparisonPage';
import ProdMonthProfitReportPage from './Components/ProdMonthProfitReportPage';
import CustomerAccountReportPage from './Components/CustomerAccountReportPage';
import CustomerTxHistoryReportPage from './Components/CustomerTxHistoryReportPage';
import Logout from '../src/Components/Logout';
import { getUser } from './shared/utils/helper';
import LogoutRoute from './Components/LogoutRoute';
import $ from 'jquery';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
    };
  }

  render() {
    let navbar = '';
    // $('.dropdown').on('show.bs.dropdown', function (e) {
    //   $(this).find('.dropdown-menu').first().stop(true, true).slideDown();
    // });
    const isUserAvailable = getUser();
    console.log(isUserAvailable);
    if (isUserAvailable) {
      navbar = (
        <div className="head-section">
          <div class="my-nav-container">
            <div className="my-logo">
              <a href="#">Logo</a>
            </div>

            <div className="my-nav-links">
              <ul>
                <li className="my-link">
                  <a href="#">Add</a>
                  <div className="my-dropdown">
                    <ul>
                      <li className="my-dropdown-link">
                        <a href="/newcategory">Catergory</a>
                      </li>
                      <li className="my-dropdown-link">
                        <a href="/newproducts">Products</a>
                      </li>
                      <li className="my-dropdown-link">
                        <a href="/newsizes">Sizes</a>
                      </li>
                      <li className="my-dropdown-link">
                        <a href="/stockpricechange">Stock Price Edit</a>
                      </li>
                      <li className="my-dropdown-link">
                        <a href="/createcustomeraccount">Create Ac</a>
                      </li>

                      <li className="my-dropdown-link">
                        <a href="/newuser">New User</a>
                      </li>
                    </ul>
                  </div>
                </li>

                <li className="my-link">
                  <a href="#">Credit</a>
                  <div className="my-dropdown">
                    <ul>
                      <li className="my-dropdown-link">
                        <NavLink to="/order">Place Order</NavLink>
                      </li>
                      <li className="my-dropdown-link">
                        <a href="/payment">Payment</a>
                      </li>
                      <li className="my-dropdown-link">
                        <a href="/receiptvoucher">Set Ac Credit</a>
                      </li>
                      <li className="my-dropdown-link">
                        <a href="/globalcashcredit">GlobalCash Credit</a>
                      </li>
                    </ul>
                  </div>
                </li>

                <li className="my-link">
                  <a href="#">Debit</a>
                  <div className="my-dropdown">
                    <ul>
                      <li className="my-dropdown-link">
                        <a href="/register">Prod Entry</a>
                      </li>
                      <li className="my-dropdown-link">
                        <a href="/reverse">Reverse</a>
                      </li>
                      <li className="my-dropdown-link">
                        <a href="/globalcashdebit">GlobalCash Debit</a>
                      </li>
                    </ul>
                  </div>
                </li>

                <li className="my-link">
                  <a href="#">Bills</a>
                  <div className="my-dropdown">
                    <ul>
                      <li className="my-dropdown-link">
                        <a href="/getallpendingbills">Pending</a>
                      </li>
                      <li className="my-dropdown-link">
                        <a href="/modifiedBillsPage">Modified</a>
                      </li>
                      <li className="my-dropdown-link">
                        <a href="/reprintbill">Reprint</a>
                      </li>
                    </ul>
                  </div>
                </li>

                <li className="my-link">
                  <a href="#">Reports</a>
                  <div className="my-dropdown">
                    <ul>
                      <li className="my-dropdown-link">
                        <a href="/prodaddhistoryreport">Purchase</a>
                      </li>
                      <li className="my-dropdown-link">
                        <a href="/prodsalehistory">Sale</a>
                      </li>
                      <li className="my-dropdown-link">
                        <a href="/prodsaleprofit">Prod Profit</a>
                      </li>
                      <li className="my-dropdown-link">
                        <a href="/prodstockreport">Stock</a>
                      </li>
                      <li className="my-dropdown-link">
                        <a href="/prodcostcomparison">Cost Comparison</a>
                      </li>
                      <li className="my-dropdown-link">
                        <a href="/monthProfit">Month Profit</a>
                      </li>
                      <li className="my-dropdown-link">
                        <a href="/customeracdetails">Account History</a>
                      </li>
                      <li className="my-dropdown-link">
                        <a href="/customertxhistory">Tx History</a>
                      </li>
                    </ul>
                  </div>
                </li>

                <li className="my-link">
                  <a href="#">Global</a>
                  <div className="my-dropdown">
                    <ul>
                      <li className="my-dropdown-link">
                        <a href="/cashposition">Cash-Position</a>
                      </li>
                      <li className="my-dropdown-link">
                        <a href="/logout">Logout</a>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>

            <div className="my-userName">Welcome {isUserAvailable.username}</div>
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
                <AdminRoute path="/receiptvoucher" component={ReceiptVoucherPage} />
                <AdminRoute path="/globalcashcredit" component={GlobalCashCreditPage} />
                <AdminRoute path="/globalcashdebit" component={GlobalCashDebitPage} />
                <AdminRoute path="/modifiedBillsPage" component={ModifiedBillsPage} />
                <AdminRoute path="/prodaddhistoryreport" component={ProdAddHistoryReportPage} />
                <AdminRoute path="/prodsalehistory" component={ProdSaleHistoryReportPage} />
                <AdminRoute path="/prodsaleprofit" component={ProdSaleProfitReportPage} />
                <AdminRoute path="/prodstockreport" component={ProdStockReportPage} />
                <AdminRoute path="/prodcostcomparison" component={ProdCostComparisonPage} />
                <AdminRoute path="/monthProfit" component={ProdMonthProfitReportPage} />
                <AdminRoute path="/customeracdetails" component={CustomerAccountReportPage} />
                <AdminRoute path="/customertxhistory" component={CustomerTxHistoryReportPage} />
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
