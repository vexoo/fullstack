import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation, useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import { updateCache } from '../App'

const GenreButtons = ({ setFilter }) => {
  const { data, loading } = useQuery(ALL_BOOKS)

  const handleFilterChange = (genre) => {
    setFilter(genre)
  }

  if (loading) return null

  //const genres = new Set([].concat(...data.allBooks.map((b) => b.genres)))
  const genres = [...new Set([].concat(...data.allBooks.map((b) => b.genres)))]
  console.log(genres)

  return (
    <div>
      {genres.map((genre) => (
        <button key={genre} onClick={() => handleFilterChange(genre)}>
          {genre}
        </button>
      ))}
      <button onClick={() => handleFilterChange(null)}>all genres</button>
    </div>
  )
}

export default GenreButtons
