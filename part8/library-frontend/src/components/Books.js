import { useState, useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = () => {
  const bookResult = useQuery(ALL_BOOKS)
  const [getBooksByGenre, genreResult] = useLazyQuery(ALL_BOOKS, {
    fetchPolicy: 'no-cache'
  })
  const [genre, setGenre] = useState('all')
  const [books, setBooks] = useState(null)

  useEffect(() => {
    if (bookResult.data) {
      setBooks(bookResult.data.allBooks)
    }
  }, [bookResult.data])

  useEffect(() => {
    if (genreResult.data) {
      setBooks(genreResult.data.allBooks)
    }
  }, [genreResult.data])

  if (!books) {
    return null
  }

  if (bookResult.loading || genreResult.loading) {
    return <div>loading...</div>
  }

  if (bookResult.error || genreResult.error) {
    return <div>Error loading from database</div>
  }

  const { allBooks } = bookResult.data

  const genres = [...new Set(allBooks.flatMap((b) => b.genres))].concat('all')

  const handleGenreChange = (genre) => {
    setGenre(genre)

    if (genre === 'all') {
      setBooks(allBooks)
      return
    }

    getBooksByGenre({ variables: { genre: genre } })
  }

  return (
    <div>
      <h2>books</h2>
      <p>
        in genre <b>{genre}</b>
      </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {genres.map((genre) => (
          <button key={genre} onClick={() => handleGenreChange(genre)}>
            {genre}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Books
