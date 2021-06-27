import axios from "axios";
import { ILogin, IUser } from "../types/IUser";
import { instance } from "../utils/instance";

export const getUserByEmail = async (login: ILogin, token: string) => {
  try {

    const response = await instance.get('/users/search/',{ 
      params: {
        email: login.email
      },
      headers: {'x-auth-token': token}
    }) 

    return response.data
    
  } catch (error) {
      console.log('error :>> ', error);
  }
}

export const postUser = async (user: IUser) => {
  try {

      const response = await instance.post('/user', user) 

      return response.data
  } catch (error) {
      console.log('error :>> ', error);
  }
}