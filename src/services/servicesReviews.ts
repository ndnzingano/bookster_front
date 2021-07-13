import axios from 'axios'
import { IReview, IReviews } from '../types/IReview';
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

export const getReviewByRating = async (token: string, id:string) => {
  try {

      const response = await instance.get(`/reviews/ratings/${id}`,{
          headers: {'x-auth-token': token}
        }) 
        // console.log('response.data :>> ', response.data);

      return response.data
  } catch (error) {
  }
}


export const postReview = async (token: string, review: IReview) => {
  try {

      const response = await instance.post('/reviews/', review,{
          headers: {'x-auth-token': token}
        }) 

      return response.data
  } catch (error) {
  }
}

