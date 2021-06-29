import { IBooks } from "./IBook";
import { ILogin, IUser } from "./IUser";

export interface IBooksterProvider {
  token: string;
  login: ILogin;
  authorization: boolean;
  user: IUser;
  books: IBooks;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
  setAuthorization: React.Dispatch<React.SetStateAction<boolean>>;
  setToken: React.Dispatch<React.SetStateAction<any>>;
  setLogin: React.Dispatch<React.SetStateAction<any>>;
  setBooks: React.Dispatch<React.SetStateAction<IBooks>>;
  handleToken: (login: ILogin) => void;
  handleLogin: (login: ILogin) => void;
  handleAddUser: (user: IUser) => void;
  handleGetAllBooks: () => void;

} 