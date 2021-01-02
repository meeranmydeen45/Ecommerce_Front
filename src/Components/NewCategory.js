import React, { useState } from 'react'
import { connect } from 'react-redux';
import * as sdk from '../utils/sdk';


const NewCategory = () => {
const [ categoryName, setCategoryName] = useState('')

  
 const handleSubmit = e => {
    
    e.preventDefault()
   // const formData = new FormData()
   // formData.append('CategoryName', categoryName)

   sdk.handleCategoryFormSubmit(categoryName)
    .then(res => {
       alert(res.data)
    }).catch(err => {
        console.log(err)
    })
 }  

return(
<form onSubmit={handleSubmit}> 
<div className="newCategory">

 <div className="newCategory-inner">   
 <div style={{textAlign:'center'}}><b>Register Your New Category</b></div>
<input type="text" onChange={e => setCategoryName(e.target.value)} className="textBoxNewRegister"/>
<input type="submit" value="Save" className="buttonNewRegister"/>
<input type="button" value="Show" className="buttonNewRegister"/>
</div>

</div>
</form>

)


}

export default NewCategory