import { ADD_CART, REMOVE_CART, CART_ITEM_INCREMENT, CART_ITEM_DECREMENT } from '../Actions/ActionTypes'


export const addToCart = (item, indexArray, cartItems) => {
    
    const itemsList = [...cartItems]
    let isAlreadInCart = false

    itemsList.forEach((element, i) => {
      if(item.id === element.id && item.listOfstocksBySize[indexArray[item.id-1].SizeIndex].size === element.size)
      {
         if(element.totalQuantity > element.Quantity)
         {
        itemsList[i].Quantity = element.Quantity + 1
         }
        else{
            alert("Stock Exceeds")
        }
        isAlreadInCart = true

      }
        
    });

    if(isAlreadInCart === false){
        const cartItem = {}
        cartItem.id = item.id
        cartItem.productName = item.productName
        cartItem.productImage = item.productImage
        cartItem.size = item.listOfstocksBySize[indexArray[item.id-1].SizeIndex].size
        cartItem.totalQuantity = item.listOfstocksBySize[indexArray[item.id-1].SizeIndex].quantity
        cartItem.cost = item.listOfstocksBySize[indexArray[item.id-1].SizeIndex].cost


        itemsList.push({...cartItem, Quantity: 1})

    }
    return {
        type: ADD_CART,
        payload: itemsList
    }

}


export const removeCart = (item, cartItems) => {
      
    const itemsList = cartItems.filter(cartItem => cartItem.id !== item.id || cartItem.size !== item.size)


    return{
        type: REMOVE_CART,
        payload: itemsList
    }
}


export const cartItemIncrement = (item, cartItems) => {
    
const cartItemList = [...cartItems]


cartItemList.forEach((element, index) => {

    if(element.id === item.id && element.size === item.size)
    {
        if(item.totalQuantity > item.Quantity)
        {
            cartItemList[index].Quantity = item.Quantity + 1
        }
        else{
            alert("Stock Exceeds")
        }
    }
})
return {
    type: CART_ITEM_INCREMENT,
    payload: cartItemList
}
}



export const cartItemDecrement = (item, cartItems) => {
    
    let cartItemList = [...cartItems]
   
    cartItemList.forEach((element, index) => {
     if(element.id === item.id && element.size === item.size){
             if(item.Quantity === 1){

                cartItemList =  cartItemList.filter(x => x.id !== item.id || x.size !== item.size)
            }
             else{
                cartItemList[index].Quantity = cartItemList[index].Quantity - 1
             
             }
        }
    })
    
    return {
        type:CART_ITEM_DECREMENT,
        payload: cartItemList
    }
    }