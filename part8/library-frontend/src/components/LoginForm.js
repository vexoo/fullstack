import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation, useLazyQuery } from '@apollo/client'
import { LOGIN, ME } from '../queries'

const LoginForm = ({ setToken, setFave }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      //setError(error.graphQLErrors[0].message)
      console.log(error.graphQLErrors[0].message)
    }
  })

  const [getUser, userResult] = useLazyQuery(ME, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message)
    }
  })

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      navigate('/')
      localStorage.setItem('library-user-token', token)
      if (userResult.data) {
        setFave(userResult.data.me.favoriteGenre)
      }
    }
  }, [result.data]) // eslint-disable-line

  const submit = async (event) => {
    event.preventDefault()
    login({ variables: { username, password } })
    getUser()
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username{' '}
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password{' '}
          <input
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default LoginForm
