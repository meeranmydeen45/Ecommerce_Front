import { ADD_CART, REMOVE_CART, CART_ITEM_INCREMENT, CART_ITEM_DECREMENT } from '../Actions/ActionTypes';

export const addToCart = (item, indexArray, cartItems, indexs) => {
  //const index = index;
  const itemsList = [...cartItems];
  let isAlreadInCart = false;

  itemsList.forEach((element, i) => {
    if (item.id === element.id && item.listOfstocksBySize[indexArray[indexs].SizeIndex].size === element.size) {
      if (element.totalQuantity > element.Quantity) {
        itemsList[i].Quantity = element.Quantity + 1;
        itemsList[i].totalCost = itemsList[i].Quantity * itemsList[i].cost;
      } else {
        alert('Stock Exceeds');
      }
      isAlreadInCart = true;
    }
  });

  if (isAlreadInCart === false) {
    const cartItem = {};
    cartItem.id = item.id;
    cartItem.productName = item.productName;
    cartItem.productImage = item.productImage;
    cartItem.size = item.listOfstocksBySize[indexArray[indexs].SizeIndex].size;
    cartItem.totalQuantity = item.listOfstocksBySize[indexArray[indexs].SizeIndex].quantity;
    cartItem.cost = item.listOfstocksBySize[indexArray[indexs].SizeIndex].cost;
    cartItem.totalCost = item.listOfstocksBySize[indexArray[indexs].SizeIndex].cost;

    itemsList.push({ ...cartItem, Quantity: 1 });
  }
  return {
    type: ADD_CART,
    payload: itemsList,
  };
};

export const removeCart = (item, cartItems, removeAll) => {
  let itemsList = [];
  if (!removeAll) {
    itemsList = cartItems.filter((cartItem) => cartItem.id !== item.id || cartItem.size !== item.size);
  }

  return {
    type: REMOVE_CART,
    payload: itemsList,
  };
};

export const cartItemIncrement = (item, cartItems) => {
  const cartItemList = [...cartItems];

  cartItemList.forEach((element, index) => {
    if (element.id === item.id && element.size === item.size) {
      if (item.totalQuantity > item.Quantity) {
        cartItemList[index].Quantity = item.Quantity + 1;
      } else {
        alert('Stock Exceeds');
      }
    }
  });
  return {
    type: CART_ITEM_INCREMENT,
    payload: cartItemList,
  };
};

export const cartItemDecrement = (item, cartItems) => {
  let cartItemList = [...cartItems];

  cartItemList.forEach((element, index) => {
    if (element.id === item.id && element.size === item.size) {
      if (item.Quantity === 1) {
        cartItemList = cartItemList.filter((x) => x.id !== item.id || x.size !== item.size);
      } else {
        cartItemList[index].Quantity = cartItemList[index].Quantity - 1;
      }
    }
  });

  return {
    type: CART_ITEM_DECREMENT,
    payload: cartItemList,
  };
};
