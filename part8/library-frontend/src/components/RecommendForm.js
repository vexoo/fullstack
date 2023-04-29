import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const RecommendForm = ({ faveGenre }) => {
  const bookResult = useQuery(ALL_BOOKS, {
    variables: { genre: faveGenre }
  })

  if (bookResult.loading) return <p>Loading...</p>
  if (bookResult.error) return <p>Error loading books</p>

  const books = bookResult.data.allBooks

  return (
    <div>
      <h2>recommendations</h2>
      <div>
        books in your favourite genre <b>{faveGenre}</b>
      </div>
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
    </div>
  )
}

export default RecommendForm
