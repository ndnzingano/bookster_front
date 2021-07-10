import { IRating } from "../providers/auth";
import { IBook, IBooks } from "./IBook";
import { IReview, IReviews } from "./IReview";
import { ILogin, IUser } from "./IUser";

export interface IBooksterProvider {
  token: string;
  login: ILogin;
  authorization: boolean;
  user: IUser;
  books: IBooks;
  reviews: IReviews;
  ratings: IRating[];
  loading: boolean;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
  setAuthorization: React.Dispatch<React.SetStateAction<boolean>>;
  setToken: React.Dispatch<React.SetStateAction<any>>;
  setLogin: React.Dispatch<React.SetStateAction<any>>;
  setBooks: React.Dispatch<React.SetStateAction<IBooks>>;
  setReviews: React.Dispatch<React.SetStateAction<IReviews>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setRatings: React.Dispatch<React.SetStateAction<IRating[]>>;
  handleToken: (login: ILogin) => void;
  handleLogin: (login: ILogin) => void;
  handleAddUser: (user: IUser) => void;
  handleGetAllBooks: () => void;
  handleGetAllReviews: () => void;
  handleGetReviewByBookId: (id: string) => void;
  handleRatings: (id: string) => void;
  handlePostBook: (files: {}, book: IBook) => void;

} 