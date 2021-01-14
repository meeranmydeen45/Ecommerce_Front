import React from 'react'

function InputField(props){
     const { onChange, value } = props
     console.log(props.value)
    return(
        <input type="text" onChange={onChange} value={value}/>
    )
}

export default InputField