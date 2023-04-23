import { useState, useContext } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { Link, useNavigate, useParams } from 'react-router-dom'
import BlogContext from '../BlogContext'
import blogService from '../services/blogs'
import Comments from './Comments'
import { UserContext } from '../UserContext'
import { useNotificationDispatch } from '../NotificationContext'

const Blog = () => {
  const { state } = useContext(UserContext)
  const queryClient = useQueryClient()
  const notify = useNotificationDispatch()
  const navitage = useNavigate()

  const id = useParams().id
  const blogs = useContext(BlogContext)

  const blog = blogs.find((n) => n.id === id)

  const blogMutation = (funct, queryKey) => {
    return useMutation(funct, {
      onSuccess: () => {
        queryClient.invalidateQueries(queryKey)
      }
    })
  }

  const removeBlogMutation = blogMutation(blogService.remove, 'blogs')
  const likeBlogMutation = blogMutation(blogService.update, 'blogs')

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
          navitage('/')
        },
        onError: (error) => {
          notify({ message: error.response.data.error, color: 'red' })
        }
      })
    }
  }

  if (!blog) {
    return null
  }

  return (
    <div>
      <h2>
        &apos;{blog.title}&apos;, by {blog.author}
      </h2>
      <div className="blog-details">
        <div>
          URL: <a href={blog.url}>{blog.url}</a>
        </div>
        <div>
          likes: {blog.likes}
          <button id="addLike" style={{ marginLeft: '5px' }} onClick={addLike}>
            like
          </button>
        </div>
        <div>added by {blog.user.name}</div>
        {blog.user.username === state.user.username && (
          <button id="delete" style={{ marginTop: '2px' }} onClick={removeBlog}>
            delete
          </button>
        )}
      </div>
      <Comments blog={blog} />
    </div>
  )
}
export default Blog
