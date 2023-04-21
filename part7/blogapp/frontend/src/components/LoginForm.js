import { useState, useContext } from 'react'
import blogService from '../services/blogs'
import loginService from '../services/login'
import { useNotificationDispatch } from '../NotificationContext'
import { UserContext } from '../UserContext'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const notify = useNotificationDispatch()
  const { dispatch } = useContext(UserContext)

  const style = {
    marginLeft: '10px',
    marginBottom: '2px'
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

      blogService.setToken(user.token)
      dispatch({ type: 'LOGIN', payload: { user } })
      setUsername('')
      setPassword('')
    } catch (exception) {
      notify('Wrong username or password')
    }
  }

  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username:
          <input
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
            style={style}
          />
        </div>
        <div>
          password:
          <input
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
            style={style}
          />
        </div>
        <button id="login-button" type="submit">
          login
        </button>
      </form>
    </div>
  )
}

export default LoginForm
