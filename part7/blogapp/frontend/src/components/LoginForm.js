import { useContext } from 'react'
import { Form, Button, InputGroup } from 'react-bootstrap'
import { useField } from '../hooks/index'
import blogService from '../services/blogs'
import loginService from '../services/login'
import Notification from './Notification'
import { useNotificationDispatch } from '../NotificationContext'
import { UserContext } from '../UserContext'

const LoginForm = () => {
  const username = useField('text')
  const password = useField('password')
  const notify = useNotificationDispatch()
  const { dispatch } = useContext(UserContext)

  const style = {
    marginTop: '10px'
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

      blogService.setToken(user.token)
      dispatch({ type: 'LOGIN', payload: { user } })
      notify({
        message: `Welcome ${user.name}`,
        color: 'green'
      })
      username.reset()
      password.reset()
    } catch (exception) {
      notify({
        message: 'Wrong username or password',
        color: 'red'
      })
    }
  }

  const showPassword = () => {
    password.setType(password.type === 'password' ? 'text' : 'password')
  }

  return (
    <div>
      <h2>Log in to application</h2>
      <Notification />
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>username:</Form.Label>
          <Form.Control
            type={username.type}
            value={username.value}
            onChange={username.onChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>password:</Form.Label>
          <InputGroup>
            <Form.Control
              type={password.type}
              value={password.value}
              onChange={password.onChange}
            />
            <Button
              variant="outline-secondary"
              type="button"
              onClick={showPassword}
            >
              {password.type === 'password' ? 'Show' : 'Hide'}
            </Button>
          </InputGroup>
        </Form.Group>
        <Button variant="primary" type="submit" id="login-button" style={style}>
          login
        </Button>
      </Form>
    </div>
  )
}

export default LoginForm
