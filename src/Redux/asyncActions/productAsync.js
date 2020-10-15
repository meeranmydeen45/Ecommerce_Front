import {fetchData} from '../Actions/ProductAction'
import axios from 'axios'

export const getProductsList = () => async dispatch => {
   
   var res = await axios.get(`https://localhost:44348/api/home/getstocks`)
  
   dispatch(fetchData(res.data))



}