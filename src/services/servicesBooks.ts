import axios from 'axios'
import { instance } from '../utils/instance';



export const getAllBooks = async (token: string) => {
  try {

      const response = await instance.get('/books',{ headers: {'x-auth-token': token}}) 

      return response.data
  } catch (error) {
      console.log('error :>> ', error);
  }




}