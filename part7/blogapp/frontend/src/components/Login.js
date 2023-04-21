import { useContext } from 'react'
import { UserContext } from '../UserContext'

const Login = () => {
  const { dispatch } = useContext(UserContext)
  const { state } = useContext(UserContext)

  const handleLogout = () => {
    window.localStorage.clear()
    dispatch({ type: 'LOGOUT' })
  }

  return (
    <div>
      <p>
        {state.user.name} logged in -
        <button
          id="logout-button"
          style={{ marginLeft: '5px' }}
          onClick={() => handleLogout()}
        >
          logout
        </button>
      </p>
    </div>
  )
}

export default Login
