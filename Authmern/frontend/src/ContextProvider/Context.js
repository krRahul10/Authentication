import React, { useState } from 'react'
import { createContext } from 'react'

export const LoginContext = createContext("")

const Context = ({children}) => {
    const [logindata, setLoginData] = useState("")
  return (
    <div>
      <LoginContext.Provider value={{logindata, setLoginData}}>
        {children}
      </LoginContext.Provider>
    </div>
  )
}

export default Context
