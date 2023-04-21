import { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { useNotificationDispatch } from '../NotificationContext'
import blogService from '../services/blogs'

const BlogForm = ({ blogFormRef }) => {
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: ''
  })

  const queryClient = useQueryClient()
  const notify = useNotificationDispatch()

  const newBlogMutation = useMutation(
    (newBlog) => blogService.create(newBlog),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries('blogs')
        notify(`New blog '${data.title}' by ${data.author} has been added`)
        blogFormRef.current.toggleVisibility()
      },
      onError: (error) => {
        const errorMsg = error.response.data.error || error.message
        notify(errorMsg)
      }
    }
  )

  /*
	 onSuccess: (data) => {
        queryClient.invalidateQueries('blogs')
        notify({
          message: `New blog '${data.title}' by ${data.author} has been added`,
          color: 'green'
        })
        blogFormRef.current.toggleVisibility()
      },
      onError: (error) => {
        const errorMsg = error.response.data.error || error.message
        notify({ message: errorMsg, color: 'red' })
      }
			*/

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setNewBlog({ ...newBlog, [name]: value })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    newBlogMutation.mutate(newBlog)
    setNewBlog({
      title: '',
      author: '',
      url: ''
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        Title:
        <input
          id="title"
          type="text"
          value={newBlog.title}
          name="title"
          onChange={handleInputChange}
        />
      </div>
      <div>
        Author:
        <input
          id="author"
          type="text"
          value={newBlog.author}
          name="author"
          onChange={handleInputChange}
        />
      </div>
      <div>
        URL:
        <input
          id="url"
          type="text"
          value={newBlog.url}
          name="url"
          onChange={handleInputChange}
        />
      </div>
      <button id="createBlog" style={{ marginTop: '10px' }} type="submit">
        create
      </button>
    </form>
  )
}

export default BlogForm
