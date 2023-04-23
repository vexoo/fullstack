import { useContext } from 'react'
import { UserContext } from '../UserContext'
import { Link } from 'react-router-dom'
import Table from 'react-bootstrap/Table'

const UserList = () => {
  const { users } = useContext(UserContext)

  if (!users || users.isLoading) {
    return <p>loading...</p>
  }
  if (users.isError) {
    return <p>error with the server...</p>
  }

  return (
    <div>
      <h3>Users</h3>
      <Table striped>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user) => (
              <tr key={user.id}>
                <td>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </td>
                <td>{user.blogs.length}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  )
}

export default UserList
