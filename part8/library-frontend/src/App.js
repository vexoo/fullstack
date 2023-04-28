import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Select from 'react-select'
import { gql, useQuery, useApolloClient, useSubscription } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import LoginForm from './components/LoginForm'
import NewBook from './components/NewBook'
import RecommendForm from './components/RecommendForm'
import { ALL_AUTHORS, ALL_BOOKS, BOOK_ADDED } from './queries'

export const updateCache = (cache, query, addedBook) => {
  // helper that is used to eliminate saving same person twice
  const uniqByName = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.name
      return seen.has(k) ? false : seen.add(k)
    })
  }
  cache.updateQuery(query, ({ allBooks }) => {
    return { allBooks: uniqByName(allBooks.concat(addedBook)) }
  })
}

const App = () => {
  const [token, setToken] = useState(null)
  const [faveGenre, setFave] = useState(null)
  const client = useApolloClient()
  const authorsResult = useQuery(ALL_AUTHORS)
  const bookResult = useQuery(ALL_BOOKS)

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      console.log(data)
      const addedBook = data.data.bookAdded

      updateCache(client.cache, { query: ALL_BOOKS }, addedBook)
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

/*
<Route
            path='/books'
            element={<Books books={bookResult.data.allBooks} genres={genres} />}
          />
					*/
export default App
