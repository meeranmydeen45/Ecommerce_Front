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

export const GetBillData = (billNumber) => {
  let formData = new FormData();
      formData.append('Billnumber', billNumber);
      return axios.post(`https://localhost:44348/api/manage/getbilldata`, formData)
}

export const PostReverseEntryData = (obj) =>{
  let formData = new FormData();
  formData.append('Billnumber', obj.Billnumber)
  formData.append('Productid', obj.Productid)
  formData.append('Size', obj.Size)
  formData.append('Quantity', obj.Quantity)
  formData.append('Saleprice', obj.Saleprice)
  
  return axios.post(`https://localhost:44348/api/reverse/reverseentry`, formData)
}

export const GetCustomerById = (id) => {
  let formData = new FormData();
  formData.append('CustomerId', id)
  return axios.post(`https://localhost:44348/api/manage/getcustomerbyid`, formData)
}

export const CreateCustomerAccount = (custId, custName, custMobile) => {
  let formData = new FormData();
  formData.append('Customerid',custId)
  formData.append('Customername', custName)
  formData.append('Customermobile', custMobile)
  return axios.post(`https://localhost:44348/api/manage/createcustomeraccount`, formData)
}

export const GetCustomerAccountDetails = (custId) => {
  let formData = new FormData();
  formData.append('Customerid',custId)
  return axios.post(`https://localhost:44348/api/manage/getcustomeraccount`, formData)
}

export const GetGlobalCashAPI = () => {
  return axios.get(`https://localhost:44348/api/manage/getglobalcash`)
}

export const GetAllPendingBillsAPI = () => {
  
    return axios.get(`https://localhost:44348/api/manage/getallpendingbills`)
}

export const GetPendingBillByCustomerAPI = (txtValue, searchCriteria) => {
  let formData = new FormData();
  formData.append('TextBoxValue', txtValue)
  formData.append('SearchCriteria',searchCriteria)
  return axios.post(`https://localhost:44348/api/manage/getpendingbillsbycustomer`, formData)
}

export const GetBillPdfAPI = (billNumber) =>{
  let formData = new FormData();
  formData.append('Billnumber', billNumber)
  return axios.post(`https://localhost:44348/api/manage/getpdfbillbyno`, formData)
}

export const GeneatePDFwithBase64 = (base64Data) => {
  let base64 = base64Data;
      base64 = base64.replace(/^[^,]+,/, '');
      base64 = base64.replace(/\s/g, '');
      let byteCharacter = atob(base64);

      let byteNumber = new Array(byteCharacter.length);

      for (var i = 0; i < byteCharacter.length; i++) {
        byteNumber[i] = byteCharacter.charCodeAt(i);
      }
      
      var byteArray = new Uint8Array(byteNumber);

      var blob = new Blob([byteArray], { type: 'application/pdf;base64' });
      var fileURL = URL.createObjectURL(blob);
      window.open(fileURL, '_target');
}

export const getCustomerAccountAPI = (searchValue) => {

return axios.get(`https://localhost:44348/api/manage/getaccountdetails/?SearchValue=${searchValue}`)

}

export const setCustomerAccountCreditAPI = (customerID, creditAmount) =>{
  let formData = new FormData();
  formData.append('Availableamount', creditAmount)
  formData.append('Customerid', customerID)
  return axios.post(`https://localhost:44348/api/manage/credittocustaccount`, formData)
}