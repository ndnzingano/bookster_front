import { ILogin } from "./IUser";

export interface IBooksterProvider {
  token: string;
  login: ILogin
  setToken: React.Dispatch<React.SetStateAction<any>>;
  setLogin: React.Dispatch<React.SetStateAction<any>>;
  handleToken: (login: ILogin) => void
} 