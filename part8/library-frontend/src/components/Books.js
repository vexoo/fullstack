import { useState } from 'react'
import { useQuery, gql } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import { updateCache } from '../App'
import GenreButtons from './GenreButtons'

const Books = () => {
  const [filter, setFilter] = useState(null)

  const bookResult = useQuery(ALL_BOOKS, {
    variables: { genre: filter },
  })

  if (bookResult.loading) return <p>Loading...</p>
  if (bookResult.error) return <p>Error loading books</p>

  const books = bookResult.data.allBooks

  return (
    <div>
      <h2>books</h2>
      {filter ? (
        <div>
          in genre <b>{filter}</b>
        </div>
      ) : (
        <div></div>
      )}
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
        <GenreButtons setFilter={setFilter} />
      </div>
    </div>
  )
}

export default Books

/*
        {genres.map((genre) => (
          <button key={genre} onClick={() => handleFilterChange(genre)}>
            {genre}
          </button>
        ))}
        <button onClick={() => handleFilterChange(null)}>all genres</button>
				*/
