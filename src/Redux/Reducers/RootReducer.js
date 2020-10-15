import {combineReducers} from 'redux'
import ProductReducer from './ProductReducer'
import CartReducer from './CartReducer'


export const RootReducer = combineReducers({
  Products: ProductReducer,
  CartItems: CartReducer
})