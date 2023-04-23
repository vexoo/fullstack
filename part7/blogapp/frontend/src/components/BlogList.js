import { useContext } from 'react'
import { Link } from 'react-router-dom'
import Table from 'react-bootstrap/Table'
import BlogContext from '../BlogContext'

const BlogList = () => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    marginBottom: 5
  }

  const blogs = useContext(BlogContext)

  return (
    <div>
      <h3>Blogs</h3>
      <Table striped>
        <thead>
          <tr>
            <th></th>
            <th>Author</th>
          </tr>
        </thead>
        <tbody>
          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <tr key={blog.id} style={blogStyle} className="blog">
                <td>
                  <Link to={`/blogs/${blog.id}`}>&apos;{blog.title}&apos;</Link>
                </td>
                <td>{blog.author}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  )
}

export default BlogList
