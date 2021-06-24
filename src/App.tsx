import React from 'react';
import { useEffect } from 'react';
import { useAuth } from './providers/auth';
import { getAllBooks } from './services/servicesBooks';
// import { getAuthorization } from './utils/auth';

function App() {

  const { handleToken, token, setLogin, login } = useAuth()

  // const login = {
  //   "email": "nadine.zingano@gmail.com",
  //   "password": "123nadine"
  // }

  useEffect(() => {
    if(token !== '')
      getAllBooks(token)
  }, [token])

  return (
    <div>
      <h1>hi</h1>
      <input type='text' 
      onBlur={(e) => setLogin({...login, email: e.target.value})}
      />
      <input type='text' 
      onBlur={(e) => setLogin({...login, password: e.target.value})}
      />
      <button
      onClick={() => handleToken(login)}      
      >
        click token
      </button>
    </div>
  );
}

export default App;
