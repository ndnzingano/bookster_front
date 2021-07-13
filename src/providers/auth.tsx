import { rawListeners } from "process";
import React, { createContext, useContext, useState } from "react";
import { setFlagsFromString } from "v8";
import { deleteBook, getAllBooks, postBook, updateBook, updateBookRatings } from "../services/servicesBooks";
import { getAllReviews, getReviewByBookId, getReviewByRating, postReview } from "../services/servicesReviews";
import { getUserByEmail, postUser } from "../services/servicesUser";
import { IBook, IBooks } from "../types/IBook";
import { IBooksterProvider } from "../types/IBooksterProvider";
import { IReview, IReviews } from "../types/IReview";
import { ILogin, IUser } from "../types/IUser";
import { getAuthorization } from "../utils/auth";
import {v4 as uuidv4 } from 'uuid'
import { useHistory } from "react-router-dom";


export const AuthContext = createContext<IBooksterProvider>({
  token: null,
  login: null,
  authorization: null,
  user: null,
  books: null,
  reviews:null,
  ratings: null,
  loading: null,
  bookDone: null,
  reviewDone: null, 
  bookUpdate: null, 
  setBookUpdate: null,
  setReviews: null,
  setUser: null,
  setAuthorization: null,
  setLogin: null,
  setToken: null,
  setBooks: null,
  setLoading: null,
  setRatings: null,
  setReviewDone: null,
  setBookDone: null,
  handleToken: null, 
  handleLogin: null,
  handleAddUser: null,
  handleGetAllBooks: null,
  handlePostBook: null,
  handlePostReview: null,
  handleUpdateBook: null,
  handleDeleteBook: null
});

export interface IRating {
  id: string,
  rating: []
}


export const AuthProvider = (props: any) => {

  // const faketoken =  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjZDNkM2VmLTc0ZWEtNDkxNy1iMGM2LTJlZjBmMjc4ZDhmYSIsIm5hbWUiOiJOYWRpbmUgWmluZ2FubyIsImlhdCI6MTYyNjA1MzE5NiwiZXhwIjoxNjI2MDU2Nzk2fQ.jLaaaDwYxNN55cWwJTaPNOML6oFWhUIKjNsF9gKsKmY"

  const history = useHistory()

  const [token, setToken] = useState(null) 
  const [login, setLogin] = useState<ILogin>({email: '', password: ''})
  const [authorization, setAuthorization] = useState(false)
  const [user, setUser] = useState<IUser>(
    {
      id: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      birthday: new Date
  })

  const [books, setBooks] = useState<IBooks>({
    books: []
  })

  const [bookUpdate, setBookUpdate] = useState<IBook>(null)

  const [reviews, setReviews] = useState<IReviews>({
    reviews: []
  })

  const [loading, setLoading] = useState(true)

  const [ratings, setRatings] = useState<IRating[]>([])

  const [bookDone, setBookDone] = useState(false)

  const [reviewDone, setReviewDone] = useState(false)

  async function handleToken(login: ILogin) {
		const response = await getAuthorization(login)
		.then((response) => {
				if (response) {
					setToken(response)

         
				} 
		}) 
		.catch(err =>{
      return false
    });
	}

  const handleLogin = async (login?: ILogin) => {
    if(!handleToken) {
      console.log('erro no token :>> ');
    } else {
      const response = await getUserByEmail(login, token)
      .then((response) => {
          if (response) {
            if (response.result.password === login.password) {
              setUser(response.result)
              setAuthorization(true)
            } else {
              setUser({
                id: '',
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                birthday: new Date
              })
              setAuthorization(false)
            }
  
          }
      }) 
      .catch(err => {
       
      });
    }



  }

  const handleAddUser = async (user: IUser) => {
    const response = await postUser(user)
		.then((response) => {
				if (response) {
					console.log('response :>> ', response);
				}
		}) 
		.catch(err => console.log('erro', err));
    console.log('user :>> ', user);

  }

  const handleGetAllBooks = async () => {
    let fake="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjZDNkM2VmLTc0ZWEtNDkxNy1iMGM2LTJlZjBmMjc4ZDhmYSIsIm5hbWUiOiJOYWRpbmUgWmluZ2FubyIsImlhdCI6MTYyNjE0NDA4NCwiZXhwIjoxNjI2MTQ3Njg0fQ.KIbhB-m8tYWxmU3Pa3lc9f9lbWHSYONyvvdhRM6YtLk"


       const response = await getAllBooks(token)
       .then((response) => {
           if (response) {
             setBooks(response)
           }
       }) 
       .catch(err => console.log('erro', err));
  };

   const handlePostBook = async (files: {}, book:IBook) => {

    book.id = uuidv4();
    const response = await postBook(token, files, book)
		.then((response) => {
				if (response) {
          setBookDone(true)
				}
		}) 
		.catch(err => console.log('erro', err));
	}

  const handlePostReview = async (review: IReview) => {
    const response = await  postReview(token, review)
		.then((response) => {
				if (response.status === 201) {
          setReviewDone(true)
        
				} else {
          setReviewDone(false)
        }
		}) 
		.catch(err => console.log('erro', err));
  }

  const handleUpdateBook = async (file: any, book: IBook) => {
    
    const response = updateBook(file, book, token)
    .then((response) => {
      if (response) {
        setBookUpdate(null)
        setBookDone(true)
      }}

    )
    .catch(error => { return error})
  }

  const handleDeleteBook = (book) => {
    const response = deleteBook(book, token)
    .then((response) => {
      if(response) {
        setBookUpdate(null)
        setBookDone(true)
      }

      }

    )
    .catch(error => { return error})
  }
  
  

  
  

    

  const states = {
    token, 
    login,
    authorization, 
    user,
    books,
    reviews,
    ratings, 
    loading, 
    bookDone,
    reviewDone,
    bookUpdate
  };
  const actions = {
    handleToken, 
    handleLogin, 
    handleAddUser,
    handleGetAllBooks,
    handleUpdateBook,
    // handleGetReviewByBookId,
    // handleRatings,
    handlePostBook,
    handlePostReview,
    handleDeleteBook,
    setToken,
    setLogin,
    setAuthorization, 
    setUser,
    setBooks,
    setReviews,
    setLoading,
    setRatings,
    setReviewDone,
    setBookUpdate,
    setBookDone
  }

  return (

    <AuthContext.Provider value={{...states, ...actions}}> 
    {props.children}
    </AuthContext.Provider>

  )
}

export const useAuth = () => useContext(AuthContext)