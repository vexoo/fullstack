import { useContext } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { UserContext } from '../UserContext'
import { useParams } from 'react-router-dom'

const User = () => {
  const id = useParams().id
  const { users } = useContext(UserContext)
  const user = users.find((n) => n.id === id)

  if (!user) {
    return <div>User for some reason does not exist</div>
  }

  if (user.blogs.length === 0) return <div>no blogs found</div>

  return (
    <div>
      <h2>{user.name}</h2>
      <p>
        <strong>added blogs</strong>
      </p>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default User
