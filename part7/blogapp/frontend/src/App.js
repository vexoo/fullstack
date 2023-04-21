import { useEffect, useRef, useContext } from 'react'
import BlogList from './components/BlogList'
import blogService from './services/blogs'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Login from './components/Login'
import Notification from './components/Notification'
import Toggleable from './components/Toggleable'
import { UserContext } from './UserContext'

const App = () => {
  const blogFormRef = useRef()
  const { dispatch } = useContext(UserContext)
  const { state } = useContext(UserContext)

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedBlogappUser')

    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      blogService.setToken(user.token)
      dispatch({ type: 'LOGIN', payload: { user } })
    }
  }, [])

  if (state.user === null) {
    return <LoginForm />
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification />
      <Login />
      <BlogList />
      <Toggleable buttonLabel="new blog" ref={blogFormRef}>
        <h3>Create a new blog</h3>
        <BlogForm blogFormRef={blogFormRef} />
      </Toggleable>
    </div>
  )
}

export default App
