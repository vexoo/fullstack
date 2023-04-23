import { useField } from '../hooks/index'
import { useMutation, useQueryClient } from 'react-query'
import { useNotificationDispatch } from '../NotificationContext'
import blogService from '../services/blogs'

const BlogForm = ({ blogFormRef }) => {
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  const queryClient = useQueryClient()
  const notify = useNotificationDispatch()

  const newBlogMutation = useMutation(
    (newBlog) => blogService.create(newBlog),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries('blogs')
        notify({
          message: `New blog '${data.title}' by ${data.author} has been added`,
          color: 'green'
        })
        title.reset()
        author.reset()
        url.reset()
        blogFormRef.current.toggleVisibility()
      },
      onError: (error) => {
        const errorMsg = error.response.data.error || error.message
        notify({ message: errorMsg, color: 'red' })
      }
    }
  )

  const handleSubmit = (event) => {
    event.preventDefault()
    const newBlog = {
      title: title.value,
      author: author.value,
      url: urlFix()
    }
    newBlogMutation.mutate(newBlog)
  }

  const urlFix = () => {
    if (!/^https?:\/\//i.test(url.value)) {
      const newUrl = 'http://' + url.value
      return newUrl
    } else return url.value
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        Title:
        <input
          id="title"
          type={title.type}
          value={title.value}
          name="title"
          onChange={title.onChange}
        />
      </div>
      <div>
        Author:
        <input
          id="author"
          type={author.type}
          value={author.value}
          name="author"
          onChange={author.onChange}
        />
      </div>
      <div>
        URL:
        <input
          id="url"
          type={url.type}
          value={url.value}
          name="url"
          onChange={url.onChange}
        />
      </div>
      <button id="createBlog" style={{ marginTop: '10px' }} type="submit">
        create
      </button>
    </form>
  )
}

export default BlogForm
