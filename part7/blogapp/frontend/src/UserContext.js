import React, { createContext, useReducer } from 'react'
import { useQuery } from 'react-query'
import userService from './services/users'

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

const UserContextProvider = (props) => {
  const [state, dispatch] = useReducer(userReducer, initialState)

  const result = useQuery('users', () => userService.getAll(), {
    refetchOnWindowFocus: false
  })

  const users = result.data

  return (
    <UserContext.Provider value={{ state, dispatch, users }}>
      {props.children}
    </UserContext.Provider>
  )
}

export { UserContext, UserContextProvider }
