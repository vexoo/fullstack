import React, { createContext, useReducer } from 'react'

const UserContext = createContext()

const initialState = {
  user: null
}

const userReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload.user
      }
    case 'LOGOUT':
      return {
        ...state,
        user: null
      }
    default:
      return state
  }
}

const UserContextProvider = ({ props }) => {
  console.log(props)
  const [state, dispatch] = useReducer(userReducer, initialState)

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {props.children}
    </UserContext.Provider>
  )
}

export { UserContext, UserContextProvider }
