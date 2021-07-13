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
  bookDone: boolean;
  reviewDone: boolean;
  bookUpdate: IBook;

  setBookUpdate: React.Dispatch<React.SetStateAction<IBook>>;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
  setAuthorization: React.Dispatch<React.SetStateAction<boolean>>;
  setToken: React.Dispatch<React.SetStateAction<any>>;
  setLogin: React.Dispatch<React.SetStateAction<any>>;
  setBooks: React.Dispatch<React.SetStateAction<IBooks>>;
  setReviews: React.Dispatch<React.SetStateAction<IReviews>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setRatings: React.Dispatch<React.SetStateAction<IRating[]>>;
  setReviewDone: React.Dispatch<React.SetStateAction<boolean>>
  setBookDone: React.Dispatch<React.SetStateAction<boolean>>

  handleToken: (login: ILogin) => void;
  handleLogin: (login: ILogin) => void;
  handleAddUser: (user: IUser) => void;
  handleGetAllBooks: () => void;
  handlePostBook: (files: {}, book: IBook) => void;
  handlePostReview: (review: IReview) => void;
  handleUpdateBook:  (files: {}, book: IBook) => void;
  handleDeleteBook: (book: IBook) => void


} 