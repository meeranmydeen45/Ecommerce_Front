import axios from 'axios'

export const handleCategoryFormSubmit = (categoryName) => { 
    return axios.post(`https://localhost:44348/api/home/addcategory`, {
        categoryName
    })
 }
