import React from 'react'

function SelectField(props){
     const { data, onChange } = props;
     let options = data.map((item,i) =>{


         return <option value={item.id}>{item.categoryName}</option>
     })
     
    return(
        <select onChange={onChange}>
            <option value="">Choose Options</option>
           {options}
        </select>
    )
 

}
export default SelectField;