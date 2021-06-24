import React, { createContext, useContext, useState } from "react";
import { IBooksterProvider } from "../types/IBooksterProvider";
import { ILogin } from "../types/IUser";
import { getAuthorization } from "../utils/auth";

export const AuthContext = createContext<IBooksterProvider>({
  token: null,
  login: null,
  setLogin: null,
  setToken: null,
  handleToken: null
});


export const AuthProvider = (props: any) => {

  const [token, setToken] = useState('') 
  const [login, setLogin] = useState<ILogin>({email: '', password: ''})


  console.log('token :>> ', token);
  console.log('login :>> ', login);

  async function handleToken(login: ILogin) {
		const response = await getAuthorization(login)
		.then((response) => {
				if (response) {
					setToken(response)
				}
		}) 
		.catch(err => console.log('erro', err));
	}

    

  const states = {
    token, 
    login
  };
  const actions = {
    setToken,
    setLogin,
    handleToken
  }

  return (

    <AuthContext.Provider value={{...states, ...actions}}> 
    {props.children}
    </AuthContext.Provider>

  )
}

export const useAuth = () => useContext(AuthContext)