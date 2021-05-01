import { ADD_CART, REMOVE_CART, CART_ITEM_INCREMENT, CART_ITEM_DECREMENT } from '../Actions/ActionTypes';

const initialState = {
  items: [],
};

export default function CartReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_CART:
      return {
        ...state,
        items: action.payload,
      };

    case REMOVE_CART:
      return {
        ...state,
        items: action.payload,
      };

    case CART_ITEM_INCREMENT:
      return {
        ...state,
        items: action.payload,
      };

    case CART_ITEM_DECREMENT:
      return {
        ...state,
        items: action.payload,
      };

    default:
      return state;
  }
}
