import axios from "axios";
import { useAuth } from "../providers/auth";
import { ILogin } from "../types/IUser";
import { instanceAuth } from "./instance";

export const getAuthorization = async(login: ILogin) => {

  const result = await instanceAuth.post('', login)
  console.log('result :>> ', result);
   
  return result.data.token

}