import axios from 'axios'

export const getCategoryList = () =>{
  
  return axios.get(`https://localhost:44348/api/home/getcategory`)
};

export const getProductById = (categoryId) => {
  const data = new FormData()
  data.append('Id', categoryId)
  if(categoryId !== 'default')
  {
  return axios.post(`https://localhost:44348/api/home/getproductbyid`, data)
  }
  else{
    return null
  }
}

export const handleSaveNewProduct = (data, imageData) => {
  const productWithCategoryId = new FormData();
  productWithCategoryId.append('ProductName', data.name)
  productWithCategoryId.append('Imagefile', imageData)
  productWithCategoryId.append('CategoryId', data.id)
  return axios.post(`https://localhost:44348/api/home/addnewproduct`, productWithCategoryId)
}

export const getProductsforModal = (categoryId) => {
  const data = new FormData()
  data.append('Id', categoryId)
  return axios.post(`https://localhost:44348/api/home/getproductbyid`, data)
}


export const newUserRegistration = (userName, password) => {
 
  const data = new FormData()
  data.append('username', userName)
  data.append('password', password)
  return axios.post(`https://localhost:44348/api/home/newuser-registration`, data)

}

export const userValidation = (userName, password) => {

  const data = new FormData()
  data.append('username', userName)
  data.append('password', password)
  return axios.post(`https://localhost:44348/api/home/uservalidation`, data)
}

export const customerRegistration = (customerObj) => {
 const data = new FormData()
 data.append('customermobile', customerObj.customerMobile)
 data.append('CustomerName', customerObj.customerName)
 data.append('Customeraddress', customerObj.customerAddress)
 data.append('CustomerId', customerObj.customerId)
return axios.post(`https://localhost:44348/api/home/customer-registration`, data)

}

export const AddingSizeInDB = (size) => {
  const data = new FormData()
  data.append('Size', size)
  return axios.post(`https://localhost:44348/api/manage/addsizes`, data)
}

export const GetSizesInDB = () => {
  return axios.get(`https://localhost:44348/api/manage/getsizes`)
}