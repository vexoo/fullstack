import { useEffect, useContext } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Blog from './components/Blog'
import blogService from './services/blogs'
import BlogsView from './components/BlogsView'
import LoginForm from './components/LoginForm'
import NavMenu from './components/NavMenu'
import Notification from './components/Notification'
import User from './components/User'
import UserList from './components/UserList'
import { UserContext } from './UserContext'

const App = () => {
  const { state, dispatch } = useContext(UserContext)

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedBlogappUser')

    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      blogService.setToken(user.token)
      dispatch({ type: 'LOGIN', payload: { user } })
    }
  }, [])

  if (state.user === null) {
    return (
      <div className="container">
        <LoginForm />
      </div>
    )
  }

  return (
    <div className="container">
      <Router>
        <NavMenu />
        <Notification />
        <Routes>
          <Route path="/users" element={<UserList />} />
          <Route path="/users/:id" element={<User />} />
          <Route path="/" element={<BlogsView />} />
          <Route path="/blogs/:id" element={<Blog />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
