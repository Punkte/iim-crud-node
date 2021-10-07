import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import React, { useState, useEffect, useCallback } from 'react'

const defaultValue = {
  isLogged: !!Cookies.get('token'),
}
export const AuthContext = React.createContext({state: defaultValue});

const AuthProvider = ({children}) => {
  const [state, setState] = useState(defaultValue)
  const isLogged = !!Cookies.get('token')

  return (
    <AuthContext.Provider value={{
      state,
      isLogged,
      login: (token) => {
        if(jwtDecode(token).username) {
          Cookies.set('token', token)
          return setState({...state, isLogged: true})
        }
        return setState({...state, isLogged: false})
      },
      logout: () => {
        Cookies.remove('token');
        setState({...state, isLogged: false})
      }
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider