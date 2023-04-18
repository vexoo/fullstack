import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote, initializeAnecdotes } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useEffect } from 'react'

const AnecdoteList = () => {
  const dispatch = useDispatch()

  const anecdotes = useSelector(({ anecdotes, filter }) => {
    if (filter === null) {
      return anecdotes
    }
    return anecdotes.filter(anecdote =>
      anecdote.content.toLowerCase().includes(filter.toLowerCase())
    )
  })

  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [dispatch])

  const vote = (anecdote) => {
    dispatch(voteAnecdote(anecdote))
    const msg = `Voted for '${anecdote.content}'`
    dispatch(setNotification(msg, 5))
  }

  return [...anecdotes]
    .sort((a, b) => b.votes - a.votes)
    .map((anecdote) => (
      <div key={anecdote.id}>
        <div>{anecdote.content}</div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote)}>vote</button>
        </div>
      </div>
    ))
}

export default AnecdoteList