import React, { createContext, useContext, useState } from "react";
import { getAllBooks } from "../services/servicesBooks";
import { getUserByEmail, postUser } from "../services/servicesUser";
import { IBooks } from "../types/IBook";
import { IBooksterProvider } from "../types/IBooksterProvider";
import { ILogin, IUser } from "../types/IUser";
import { getAuthorization } from "../utils/auth";

export const AuthContext = createContext<IBooksterProvider>({
  token: null,
  login: null,
  authorization: null,
  user: null,
  books: null,
  setUser: null,
  setAuthorization: null,
  setLogin: null,
  setToken: null,
  setBooks: null,
  handleToken: null, 
  handleLogin: null,
  handleAddUser: null,
  handleGetAllBooks: null
});


export const AuthProvider = (props: any) => {

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
       const faketoken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjZDNkM2VmLTc0ZWEtNDkxNy1iMGM2LTJlZjBmMjc4ZDhmYSIsIm5hbWUiOiJOYWRpbmUgWmluZ2FubyIsImlhdCI6MTYyNDkyODQ2MCwiZXhwIjoxNjI0OTMyMDYwfQ.yr5g5xzca-R2tukGTN-7X2reW-_kavvM48bOVO52Nn8'

       const response = await getAllBooks(faketoken)
       .then((response) => {
           if (response) {
             setBooks(response)
           }
       }) 
       .catch(err => console.log('erro', err));
  };
  
    

  const states = {
    token, 
    login,
    authorization, 
    user,
    books
  };
  const actions = {
    handleToken, 
    handleLogin, 
    handleAddUser,
    handleGetAllBooks,
    setToken,
    setLogin,
    setAuthorization, 
    setUser,
    setBooks
  }

  return (

    <AuthContext.Provider value={{...states, ...actions}}> 
    {props.children}
    </AuthContext.Provider>

  )
}

export const useAuth = () => useContext(AuthContext)