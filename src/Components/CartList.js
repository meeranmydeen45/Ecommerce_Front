import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { removeCart, cartItemIncrement, cartItemDecrement } from '../Redux/Actions/CartAction'

function CartList({cartItems, removeCart, cartItemIncrement,  cartItemDecrement}){
     
    const baseUrl = "https://localhost:44348/Images/"
    
    let totalCost = cartItems.reduce((sum, item) => sum + item.cost * item.Quantity, 0)
    let totalProducts = cartItems.reduce((sum, item) => sum + item.Quantity, 0)

    const handleClick = (cartItems) => {
        AlertMessage();
    //  axios.post(`https://localhost:44348/api/home/pruchase`, cartItems).then(res => {
    //      alert("Transaction Completed IN REactjs")
         
    //  })

    }

    const cartList = cartItems.map((item, i)=> {
       
        return (
            <tr key={i}>
                <td>{item.productName} <img src={baseUrl+"/"+item.productImage} alt="NA" style={{width:"50px", height:"50px"}}/></td>
                <td>{item.size}</td>
                <td>{item.cost}</td>

                <td>
                    <a href="" onClick={()=> cartItemDecrement(item, cartItems)}>-
                    </a>
                    {item.Quantity}
                    <a href=""onClick={()=> cartItemIncrement(item, cartItems)}>+
                    </a>
                </td>
                
                <td><button className="btn btn-success" onClick={() => removeCart(item, cartItems)}>X</button></td>
            </tr>
        )
    })


    return(

        <div className="div-Cart">
            
        Added Item in Cart {totalProducts}
        
        <table className="cartTable" id="cartTable">
            <thead>
                <tr>
                    <th>Product Name</th>
                    <th>Size</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Remove</th>
                </tr>
            </thead>
            <tbody>
                {cartList}
            </tbody>
            </table>
            Total Cost to Pay {totalCost}
            <input type="button" class="btn btn-info" value="Store" onClick={() => handleClick(cartItems)}/>
    </div>


         )


}

function AlertMessage()
{
   
  // doc.text(10,10, "PDF Message")
 //  doc.save("zia.pdf")
   
}

const mapStateToProps = (state) => {

    return {
       cartItems: state.CartItems.items 
    }
   
   }
   
   const mapDispatchToProps = {
       removeCart,
       cartItemIncrement,
       cartItemDecrement
   }


export default connect(mapStateToProps, mapDispatchToProps) (CartList)