import React, { createContext, useContext, useState } from "react";
import { getUserByEmail, postUser } from "../services/servicesUser";
import { IBooksterProvider } from "../types/IBooksterProvider";
import { ILogin, IUser } from "../types/IUser";
import { getAuthorization } from "../utils/auth";

export const AuthContext = createContext<IBooksterProvider>({
  token: null,
  login: null,
  authorization: null,
  user: null,
  setUser: null,
  setAuthorization: null,
  setLogin: null,
  setToken: null,
  handleToken: null, 
  handleLogin: null,
  handleAddUser: null
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

  console.log('authorization :>> ', authorization);
  console.log('user :>> ', user);
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
    

  const states = {
    token, 
    login,
    authorization, 
    user
  };
  const actions = {
    handleToken, 
    handleLogin, 
    handleAddUser,
    setToken,
    setLogin,
    setAuthorization, 
    setUser
  }

  return (

    <AuthContext.Provider value={{...states, ...actions}}> 
    {props.children}
    </AuthContext.Provider>

  )
}

export const useAuth = () => useContext(AuthContext)