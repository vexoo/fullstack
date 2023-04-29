import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { useQuery, useApolloClient, useSubscription } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import LoginForm from './components/LoginForm'
import NewBook from './components/NewBook'
import RecommendForm from './components/RecommendForm'
import { ALL_AUTHORS, ALL_BOOKS, BOOK_ADDED } from './queries'

const App = () => {
  const [token, setToken] = useState(null)
  const [faveGenre, setFave] = useState(null)
  const client = useApolloClient()
  const authorsResult = useQuery(ALL_AUTHORS)
  const bookResult = useQuery(ALL_BOOKS)

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      const addedBook = data.data.bookAdded
      window.alert('Book added')
      client.cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
        return { allBooks: allBooks.concat(addedBook) }
      })
    }
  })

  if (authorsResult.loading || bookResult.loading) {
    return <div>loading...</div>
  }

  const logout = () => {
    setToken(null)
    setFave(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <Router>
        <div>
          <Link to='/'>
            <button>authors</button>
          </Link>
          <Link to='/books'>
            <button>books</button>
          </Link>
          {token ? (
            <div style={{ display: 'inline-block' }}>
              <Link to='/newBook'>
                <button>add book</button>
              </Link>
              <Link to='/recommend'>
                <button>recommend</button>
              </Link>
              <button onClick={logout}>logout</button>
            </div>
          ) : (
            <Link to='/login'>
              <button>login</button>
            </Link>
          )}
        </div>
        <Routes>
          <Route
            path='/'
            element={<Authors authors={authorsResult.data.allAuthors} />}
          />
          <Route path='/books' element={<Books />} />
          <Route path='/newBook' element={<NewBook />} />
          <Route
            path='/login'
            element={<LoginForm setToken={setToken} setFave={setFave} />}
          />
          <Route
            path='/recommend'
            element={<RecommendForm faveGenre={faveGenre} />}
          />
        </Routes>
      </Router>
    </div>
  )
}
export default App
