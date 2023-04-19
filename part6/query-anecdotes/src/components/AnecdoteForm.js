import { useMutation, useQueryClient } from 'react-query'
import { createAnecdote } from '../requests'
import { useNotificationDispatch } from '../NotificationContext'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (data) => {
      queryClient.invalidateQueries('anecdotes')
      dispatch({
        type: 'SHOW_NOTIFICATION',
        payload: {
          value: `New anecdote "${data.content}" is created`,
          dispatch: dispatch
        }
      })
    },
    onError: (error) => {
      dispatch({
        type: 'SHOW_NOTIFICATION',
        payload: {
          value: error.response.data.error || error.message,
          dispatch: dispatch
        }
      })
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('new anecdote')
    newAnecdoteMutation.mutate({ content, votes: 0 })
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
