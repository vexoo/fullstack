import { useMutation, useQueryClient } from 'react-query'
import { useField } from '../hooks/index'
import blogService from '../services/blogs'
import { useNotificationDispatch } from '../NotificationContext'

const Comments = ({ blog }) => {
  const comment = useField('text')
  const queryClient = useQueryClient()
  const notify = useNotificationDispatch()

  const handleCommentSubmit = (event) => {
    event.preventDefault()
    newCommentMutation.mutate(blog.id)
    comment.reset()
  }

  const newCommentMutation = useMutation(
    (id) => blogService.comment(id, comment.value),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('blogs')
        notify({
          message: 'Comment added',
          color: 'green'
        })
      },
      onError: (error) => {
        const errorMsg = error.response.data.error || error.message
        notify({ message: errorMsg, color: 'red' })
      }
    }
  )

  return (
    <div>
      <h3>comments</h3>
      <form onSubmit={handleCommentSubmit}>
        <div>
          <input
            type={comment.type}
            value={comment.value}
            onChange={comment.onChange}
          />
        </div>
        <button type="submit">add comment</button>
      </form>

      {!blog.comments || blog.comments.length === 0 ? (
        <p>no comments found</p>
      ) : (
        <ul>
          {blog.comments.map((comm, key) => (
            <li key={key}>{comm}</li>
          ))}
        </ul>
      )}
    </div>
  )
}
export default Comments
