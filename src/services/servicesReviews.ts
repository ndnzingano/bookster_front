import axios from 'axios'
import { instance } from '../utils/instance';



export const getAllReviews = async (token: string) => {
  try {

      const response = await instance.get('/reviews/',{
          headers: {'x-auth-token': token}
        }) 

      return response.data
  } catch (error) {
  }
}

export const getReviewByBookId = async (token: string, id:string) => {
  try {

      const response = await instance.get('/reviews/book/',{
          params : {
            book: id
          },
          headers: {'x-auth-token': token}
        }) 

      return response.data
  } catch (error) {
  }
}

