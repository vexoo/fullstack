import { useContext } from 'react'
import BlogContext from '../BlogContext'
import Blog from './Blog'

const BlogList = () => {
  const blogs = useContext(BlogContext)

  return (
    <div>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <div key={blog.id} className="blog">
            <Blog blog={blog} />
          </div>
        ))}
    </div>
  )
}

export default BlogList
