import React from 'react'
import axios from 'axios'
import $ from 'jquery'



class ProductEntry extends React.Component {
    
    constructor(props){
    super(props)
    this.state = {

        ImageFile: undefined,
        previewImage: undefined,
        previousFile : null,
        categoryValue:"",
        productName:"",
        productSize:"",
        productQuantity:"",
        productPrize:""
        
    }
}
    
componentDidUpdate(){
    
    if(!this.state.ImageFile){
        //this.setState({previewImage: undefined})
        return
    }
    const imageUrl = URL.createObjectURL(this.state.ImageFile)
    if(this.state.previousFile !== this.state.ImageFile  ){
    this.setState({previewImage: imageUrl, previousFile : this.state.ImageFile})
    }
     
}


render(){

    
    const handleDropDownChange = e => {

     this.setState({categoryValue:e.target.value})
     
    }

    const handleTextBoxChange = e => {
       this.setState({[e.target.name]: e.target.value})
       
    }

    const handleImageChange = e => { 

        if(!e.target.files && e.target.files.length === 0){
           this.setState({ImageFile: undefined}) 
           return
        }
        this.setState({previousFile : this.state.ImageFile})
        this.setState({ImageFile: e.target.files[0]})
    }

    const handleModel = e => {
     var modal =  document.getElementById('modalBackground')
     modal.style.display = 'block'
       
    }

    const closeModal = e => {
        var modal =  document.getElementById('modalBackground')
        modal.style.display = 'none'

    }

    const tableSelect = e => {
     var modal =  document.getElementById('modalBackground')
     modal.style.display = 'none'
     this.setState({productName:'LED'})
    }

    const handleFormSumbit = e => {
       
        
         e.preventDefault()
        const formData = new FormData()

        formData.append('Catergory', this.state.categoryValue) 
        formData.append('Name', this.state.productName)
        formData.append('Size', this.state.productSize)
        formData.append('Quantity', this.state.productQuantity)
        formData.append('Cost', this.state.productPrize)
        formData.append('ImageFile', this.state.ImageFile)
         
         console.log(this.state.categoryValue)
          
         
         axios.post(`https://localhost:44348/api/home/register`, formData)
         .then(res => {
            alert(res.data)
         }).catch(err => {
             console.log(err)
         })
         
    }


return(
  <div>
      
  <div id="divHead">
    Product Entry
  </div>

  <div id="divBody">
  <div id="left-Section"> 
   <form onSubmit={handleFormSumbit}>

   <div id="div4">
   <div id="div4-1"><label>Select Category</label></div>
   <div id="div4-2">
   <select onChange={handleDropDownChange} id="selectCategory">
         <option>Motors</option>
         <option>Tubes</option>
         <option>Pipes</option>
         <option>Wires</option>
        </select>
    </div>
   <div id="div4-3"></div>
   <div id="div4-4"></div>
   </div>

   <div id="div4">
   <div id="div4-1"><label>ProductName</label></div>
   <div id="div4-2"><input type="text" onChange={handleTextBoxChange} name="productName" value={this.state.productName}/></div>
   <div id="div4-3" style={{textAlign:'left'}}>
       <input type="button" value="--" onClick={handleModel}/>
       </div>
   <div id="div4-4"></div>
   </div>

   <div id="div4">
   <div id="div4-1"><label>ProductSize</label></div>
   <div id="div4-2"><input type="text" onChange={handleTextBoxChange} name="productSize"/></div>
   <div id="div4-3" style={{textAlign:'left'}}><input type="button" value="--"/></div>
   <div id="div4-4"></div>
   </div>
   
<div id="div4">
<div id="div4-1"><label>UnitPrice</label></div>
<div id="div4-2"><input type="text" onChange={handleTextBoxChange} name="productPrize"/></div>
<div id="div4-3"></div>
<div id="div4-4"></div>
</div>

<div id="div4">
<div id="div4-1"><label>TotalNumbers</label></div>
<div id="div4-2"><input type="text" onChange={handleTextBoxChange} name="productQuantity"/></div>
<div id="div4-3"><label>TotalCost</label></div>
<div id="div4-4"><label>$45,000</label></div>
</div>

<div id="div4">
<div id="div4-1"><label>FileUpload</label></div>
<div id="div4-2"><input type="file" onChange={handleImageChange}/></div>
<div id="div4-3"></div>
<div id="div4-4"></div>
</div>

<div>
<input type="submit" value="Store" className="btn btn-primary"/>
</div>

   </form>
   </div>

   <div id="right-Section">
       <label htmlFor="previewImage">PreviewImage of Uploaded File</label>
       <img src={this.state.previewImage} alt ="" style={{height:"300px"}}/>
    </div>

 </div>
 
    <div id="modalBackground">
     <div id="myModal">
       <div id="divModalClose"><span onClick={closeModal}>&times;</span></div>
       <div id="divModalHeader">
           <input type="text" id="searchTextBox" placeholder="TypeHere"/>
           <input type="button" value="Search"/>
       </div>
       <div id="divModalBody">
           <table id="tableProductModal">
               <thead>
                   <tr>
                       <th></th>
                       <th>ProductName</th>
                   </tr>
               </thead>
               <tbody>
                   <tr>
                       <td><input type="button" value="select" onClick={tableSelect}/></td>
                       <td>LED Lights</td>
                   </tr>
               </tbody>
          </table>
       </div>
     </div>
    </div>

    </div>
)

}



}

export default ProductEntry