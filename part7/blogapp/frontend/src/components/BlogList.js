import { useContext } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { useNotificationDispatch } from '../NotificationContext'
import blogService from '../services/blogs'
import BlogContext from '../BlogContext'
import Blog from './Blog'

const BlogList = () => {
  const notify = useNotificationDispatch()
  const blogs = useContext(BlogContext)
  const queryClient = useQueryClient()

  const blogMutation = (funct, queryKey) => {
    return useMutation(funct, {
      onSuccess: () => {
        queryClient.invalidateQueries(queryKey)
      }
    })
  }

  const removeBlogMutation = blogMutation(blogService.remove, 'blogs')
  const likeBlogMutation = blogMutation(blogService.update, 'blogs')

  const handleLikes = (likedBlog) => {
    likeBlogMutation.mutate(likedBlog, {
      onError: (error) => {
        notify(error.response.data.error)
      }
    })
  }

  const handleRemoval = (blog) => {
    removeBlogMutation.mutate(blog, {
      onSuccess: () => {
        notify('Blog removed')
      },
      onError: (error) => {
        notify(error.response.data.error)
      }
    })
  }

  return (
    <div>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <div key={blog.id} className="blog">
            <Blog
              blog={blog}
              handleLikes={handleLikes}
              handleRemoval={handleRemoval}
            />
          </div>
        ))}
    </div>
  )
}

export default BlogList
