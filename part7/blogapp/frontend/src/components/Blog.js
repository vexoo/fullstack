import { useState, useContext } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import blogService from '../services/blogs'
import { UserContext } from '../UserContext'
import { useNotificationDispatch } from '../NotificationContext'

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [showDetails, setShowDetails] = useState(false)
  const { state } = useContext(UserContext)
  const queryClient = useQueryClient()
  const notify = useNotificationDispatch()

  const blogMutation = (funct, queryKey) => {
    return useMutation(funct, {
      onSuccess: () => {
        queryClient.invalidateQueries(queryKey)
      }
    })
  }

  const removeBlogMutation = blogMutation(blogService.remove, 'blogs')
  const likeBlogMutation = blogMutation(blogService.update, 'blogs')

  const toggleDetails = () => {
    setShowDetails(!showDetails)
  }

  const addLike = () => {
    const likedBlog = { ...blog, likes: blog.likes + 1, user: blog.user.id }
    likeBlogMutation.mutate(likedBlog, {
      onError: (error) => {
        notify({ message: error.response.data.error, color: 'red' })
      }
    })
  }

  const removeBlog = () => {
    if (window.confirm(`Remove blog '${blog.title}' by ${blog.author}?`)) {
      removeBlogMutation.mutate(blog, {
        onSuccess: () => {
          notify({ message: 'Blog removed', color: 'green' })
        },
        onError: (error) => {
          notify({ message: error.response.data.error, color: 'red' })
        }
      })
    }
  }
  return (
    <div style={blogStyle} className="blog">
      <div className="title">
        &apos;{blog.title}&apos; by {blog.author}
        <button
          id="details"
          style={{ marginLeft: '5px', marginBottom: '2px' }}
          onClick={toggleDetails}
        >
          {showDetails ? 'hide' : 'view'}
        </button>
      </div>
      {showDetails && (
        <div className="blog-details">
          <div>URL: {blog.url}</div>
          <div>
            likes: {blog.likes}
            <button
              id="addLike"
              style={{ marginLeft: '5px' }}
              onClick={addLike}
            >
              like
            </button>
          </div>
          <div>{blog.user.name}</div>
          {blog.user.username === state.user.username && (
            <button
              id="delete"
              style={{ marginTop: '2px' }}
              onClick={removeBlog}
            >
              delete
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default Blog
