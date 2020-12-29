import React from 'react'

function NewCategory(){

return(
<div className="newCategory">
 <div className="newCategory-inner">   
 <div style={{textAlign:'center'}}><b>Register Your New Category</b></div>
<input type="text" className="textBoxNewRegister"/>
<input type="button" value="Save" className="buttonNewRegister"/>
</div>
</div>

)


}

export default NewCategory