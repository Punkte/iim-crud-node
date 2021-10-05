import Cookies from 'js-cookie';
import React, { useState, useEffect, useCallback } from 'react'

const defaultValue = {
  isLogged: !!Cookies.get('token'),
}
export const AuthContext = React.createContext({state: defaultValue, toggleLogged: () => {}});

const AuthProvider = ({children}) => {
  const [state, setState] = useState(defaultValue)
  const isLogged = !!Cookies.get('token')

  return (
    <AuthContext.Provider value={{
      state,
      isLogged,
      toggleLogged: () => {
        setState({...state, isLogged: !state.isLogged})
      }
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider