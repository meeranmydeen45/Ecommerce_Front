import React from 'react'
import axios from 'axios'


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

    const handleCheckBoxSelection = e => {
        this.setState({productSize: e.target.id})
    }

    const handleImageChange = e => {

        if(!e.target.files && e.target.files.length === 0){
           this.setState({ImageFile: undefined}) 
           return
        }
        this.setState({previousFile : this.state.ImageFile})
        this.setState({ImageFile: e.target.files[0]})
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
         
          

         axios.post(`https://localhost:44348/api/home/register`, formData)
         .then(res => {
            alert(res.data)
         }).catch(err => {
             console.log(err)
         })
         
    }


return(
   <div className="container-fluid" style={{background:"lightblue", height:"600px"}}>

   <div className="row">
    <div className="col-md-8">        
   <form onSubmit={handleFormSumbit}>

    <div className="form-group" style={{width:"300px", marginTop:"20px"}}>
        <label htmlFor="selectControl">Select the Category:</label>
        <select className="form-control" id="selectControl" onChange={handleDropDownChange}>
         <option>Motors</option>
         <option>Tubes</option>
         <option>Pipes</option>
         <option>Wires</option>
        </select>
   </div>

        <div className="form-group">
        <label htmlFor="name">ProductName:</label>
        <input type="text" className="form-control" 
        placeholder="Type ProductName" 
        name= "productName"
        value={this.state.productName}
        onChange={handleTextBoxChange}
        />
        </div>
         
         
        <div className="form-group">

         <label htmlFor="Sizes">Choose the Size:</label>
         <br/>

        <div className="form-check-inline">
            <label className="form-check-label">Small</label>
            <input type="radio" className="form-check-input ml-3" 
            name="size" id="small" 
            onChange ={handleCheckBoxSelection}
            />
        </div>

        <div className="form-check-inline">
            <label className="form-check-label">Medium</label>
            <input type="radio" className="form-check-input ml-3" 
            name="size" id="medium" 
            onChange = {handleCheckBoxSelection}
            />
        </div>

        <div className="form-check-inline">
            <label className="form-check-label">Large</label>
            <input type="radio" className="form-check-input ml-3" 
            name="size" id="large" 
            onChange = {handleCheckBoxSelection}
            />
        </div>
        </div>

        <div className="row">
            <div className="col-md-6">
                <div className="form-group">
                    <label htmlFor="Quantity">Total Quantity</label>
                    <input type="text" className="form-control" placeholder="Enter Quantity"
                    value={this.state.productQuantity}
                    name = "productQuantity"
                    onChange={handleTextBoxChange}
                    />
                </div>
            </div>
            <div className="col-md-6">
            <div className="form-group">
                    <label htmlFor="Price">Price per Piece</label>
                    <input type="text" className="form-control" placeholder="Enter Price of single Item"
                    value={this.state.productPrize}
                    name = "productPrize"
                    onChange={handleTextBoxChange}
                    />
                </div>
            </div>
        </div>

        <div className="form-group">
            <label htmlFor="imageUpload">UploadImage:</label>
            <input type="file" className="form-control-file border" onChange={handleImageChange}/>
        </div>

        <button type="submit" className="btn btn-primary btn-lg mt-4">Store</button>

   </form>
   </div>

   <div className="col-md-4">
       <label htmlFor="previewImage">PreviewImage of Uploaded File</label>
       <img src={this.state.previewImage} alt ="" style={{height:"300px"}}/>
    </div>

   </div>
   </div>
)

}



}

export default ProductEntry