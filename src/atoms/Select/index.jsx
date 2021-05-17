import React from 'react'

function SelectField(props){

     const { data, onChange } = props;
     let options=''
     
     if(data.length > 0)
     {
     
     if(data[0].categoryName)
     {
         //Its for Select-Category
         options = data.map((item,i) =>{
         return <option value={item.id}>{item.categoryName}</option>
        })
     }
     else if(data[0].productName){
        //Its for Select-Products
     options = data.map((item,i) =>{
     return <option value={item.id}>{item.productName}</option>
    })
    }
    else if(data[0].size){
        //For Sizes
            options = data.map((item,i) =>{
            return <option value={item.id}>{item.size}</option>
           })  
    }
    }

    return(
        <select onChange={onChange}>
            <option value="default">Choose Options</option>
           {options}
        </select>
    )
 

}
export default SelectField;