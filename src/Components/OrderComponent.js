import React from 'react'
import Product from './Product'
import Cart from './Cart'


export default function OrderComponent(){

return(
      <div className="row">

      <div className="col-md-8">
       <Product></Product>
      </div>
      
      <div className="col-md-4">
        <Cart></Cart>
      </div>
      
      </div>
    )
}