import React from 'react'
import { removeCart } from '../Redux/Actions/CartAction'
import { connect } from 'react-redux'


class Cart extends React.Component{

    render(){
        const { cartItems, removeCart }  = this.props
        const baseUrl = "https://localhost:44348/Images/"
        
         let totalCost = cartItems.reduce((sum, item) => sum + item.cost * item.Quantity, 0)
        let totalProducts = cartItems.reduce((sum, item) => sum + item.Quantity, 0)
        const cartList = cartItems.map((item, i)=> {
           
            return (
                <tr key={i}>
                    <td>{item.productName} <img src={baseUrl+"/"+item.productImage} alt="NA" style={{width:"50px", height:"50px"}}/></td>
                    <td>{item.size}</td>
                    <td>{item.cost}</td>
                    <td>{item.Quantity}</td>
                    <td><button className="btn btn-success" onClick={() => removeCart(item, cartItems)}>X</button></td>
                </tr>
            )
        })

        return(
            <div className="div-Cart">
            
                Added Item in Cart {totalProducts}
                
                <table className="cartTable">
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
                    Total Cost to Pay ${totalCost}
            </div>
        )
    }
}


const mapStateToProps = (state) => {

 return {
    cartItems: state.CartItems.items 
 }

}

const mapDispatchToProps = {
    removeCart 
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)