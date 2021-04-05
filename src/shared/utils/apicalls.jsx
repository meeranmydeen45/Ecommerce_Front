import axios from 'axios'

export const getCategoryList = () =>{
  
  return axios.get(`https://localhost:44348/api/home/getcategory`)
};

export const handleSaveNewProduct = (data) => {
  const productWithCategoryId = new FormData();
  productWithCategoryId.append('ProductName', data.name)
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
 data.append('customermobile', customerObj.mobileNumber)
 data.append('CustomerName', customerObj.custName)
 data.append('Customeraddress', customerObj.custAddress)
 data.append('CutomerId', customerObj.custId)
 data.append('Totalamount', customerObj.totalAmount)
return axios.post(`https://localhost:44348/api/home/customer-registration`, data)

}