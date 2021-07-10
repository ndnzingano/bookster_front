import { rawListeners } from "process";
import React, { createContext, useContext, useState } from "react";
import { setFlagsFromString } from "v8";
import { getAllBooks, postBook } from "../services/servicesBooks";
import { getAllReviews, getReviewByBookId } from "../services/servicesReviews";
import { getUserByEmail, postUser } from "../services/servicesUser";
import { IBook, IBooks } from "../types/IBook";
import { IBooksterProvider } from "../types/IBooksterProvider";
import { IReview, IReviews } from "../types/IReview";
import { ILogin, IUser } from "../types/IUser";
import { getAuthorization } from "../utils/auth";

export const AuthContext = createContext<IBooksterProvider>({
  token: null,
  login: null,
  authorization: null,
  user: null,
  books: null,
  reviews:null,
  ratings: null,
  loading: null,
  setReviews: null,
  setUser: null,
  setAuthorization: null,
  setLogin: null,
  setToken: null,
  setBooks: null,
  setLoading: null,
  setRatings: null,
  handleToken: null, 
  handleLogin: null,
  handleAddUser: null,
  handleGetAllBooks: null,
  handleGetAllReviews: null,
  handleGetReviewByBookId: null,
  handleRatings: null,
  handlePostBook: null
});

export interface IRating {
  id: string,
  rating: number
}


export const AuthProvider = (props: any) => {

  const faketoken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjZDNkM2VmLTc0ZWEtNDkxNy1iMGM2LTJlZjBmMjc4ZDhmYSIsIm5hbWUiOiJOYWRpbmUgWmluZ2FubyIsImlhdCI6MTYyNTk0MDQ1MiwiZXhwIjoxNjI1OTQ0MDUyfQ.CepgiI3cIhzK7TGQZy-gzHewiKcYfajz2M8CiF_b8o4"


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

  const [reviews, setReviews] = useState<IReviews>({
    reviews: []
  })

  const [loading, setLoading] = useState(true)

  const [ratings, setRatings] = useState<IRating[]>([])

  async function handleToken(login: ILogin) {
		const response = await getAuthorization(login)
		.then((response) => {
				if (response) {
					setToken(response)
				}
		}) 
		.catch(err => console.log('erro', err));
	}

  const handleLogin = async (login?: ILogin) => {
    await handleToken(login)

    if(!token) {
      console.log('erro no token :>> ');
      //criar msg de erro de login
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
      .catch(err => console.log('erro', err));
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

       const response = await getAllBooks(faketoken)
       .then((response) => {
           if (response) {
             setBooks(response)
           }
       }) 
       .catch(err => console.log('erro', err));
  };

  const handleGetReviewByBookId = async (id: string) => {
    
    const response = await getReviewByBookId(faketoken, id)
    .then((response) => {
        if (response.status === 200) {
          if(response.result.length > 1) {
              let total = 0;
              for(let i = 0; i < response.result.length; i++) {
                total += response.result[i].rating;
              }
              let avg = total / response.result.length;

              response.result.forEach(result => {
                let isInArray = ratings.filter(rating => rating.id === result.book)

                if(isInArray.length === 0) {
                  return ratings.push({
                    id: response.result[0].book,
                    rating: avg
                  })
                }              
             
              })
              
          } else {
            response.result.forEach(result => {
              let isInArray = ratings.filter(rating => rating.id === result.book)

              if(isInArray.length === 0) {
                return setRatings([...ratings, {
                  id: response.result[0].book,
                  rating: response.result[0].rating
                }])
                
              }              
           
            })          
          }

        }
    }) 
    .catch(err => err);
  }

  const handleGetAllReviews = async () => {
    
    const response = await getAllReviews(faketoken)
    .then((response) => {
        if (response) {
          // setBooks(response)
          // console.log('response :>> ', response);
         console.log('object :>> ', response.reviews.filter(review => {return review.book })); 


         response.reviews.filter(review => {return review.book})
          
        }
    }) 
    .catch(err => console.log('erro'));
  }

  const handleRatings = async (id: string) => {
    await handleGetReviewByBookId(id)
    if(ratings.length > 0) {
      // console.log('ratings :>> ', ratings);

      setLoading(false)
      return ratings
    }
  }

   const handlePostBook = async (files: {}, book:IBook) => {

    const response = await postBook(faketoken, files, book)
		.then((response) => {
				if (response) {
          console.log('response :>> ', response);
				}
		}) 
		.catch(err => console.log('erro', err));
	}
    

  
  

  
  

    

  const states = {
    token, 
    login,
    authorization, 
    user,
    books,
    reviews,
    ratings, 
    loading
  };
  const actions = {
    handleToken, 
    handleLogin, 
    handleAddUser,
    handleGetAllBooks,
    handleGetAllReviews,
    handleGetReviewByBookId,
    handleRatings,
    handlePostBook,
    setToken,
    setLogin,
    setAuthorization, 
    setUser,
    setBooks,
    setReviews,
    setLoading,
    setRatings
  }

  return (

    <AuthContext.Provider value={{...states, ...actions}}> 
    {props.children}
    </AuthContext.Provider>

  )
}

export const useAuth = () => useContext(AuthContext)