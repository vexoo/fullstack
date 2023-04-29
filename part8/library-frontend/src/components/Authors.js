import { useState } from 'react'
import Select from 'react-select'
import { useMutation } from '@apollo/client'
import { ALL_AUTHORS, UPDATE_BIRTHYEAR } from '../queries'

const Authors = ({ authors }) => {
  const [born, setBornTo] = useState('')
  const [selectedOption, setSelectedOption] = useState(null)

  const [updateBirthYear] = useMutation(UPDATE_BIRTHYEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  const submit = async (event) => {
    event.preventDefault()

    const parsedYear = parseInt(born)
    updateBirthYear({
      variables: {
        name: selectedOption.value,
        born: parsedYear
      }
    })
    setBornTo('')
  }

  const authorOptions = authors.map((author) => ({
    label: author.name,
    value: author.name
  }))

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h3>Set birthyear</h3>
        <form onSubmit={submit}>
          <Select
            defaultValue={selectedOption}
            onChange={setSelectedOption}
            options={authorOptions}
          />
          <div>
            born
            <input
              value={born}
              onChange={({ target }) => setBornTo(target.value)}
            />
          </div>
          <button type='submit'>update author</button>
        </form>
      </div>
    </div>
  )
}

export default Authors
