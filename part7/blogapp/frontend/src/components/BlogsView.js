import { useRef } from 'react'
import BlogList from './BlogList'
import Toggleable from './Toggleable'
import BlogForm from './BlogForm'

const BlogsView = () => {
  const blogFormRef = useRef()

  return (
    <div>
      <BlogList />
      <Toggleable buttonLabel="new blog" ref={blogFormRef}>
        <h3>Create a new blog</h3>
        <BlogForm blogFormRef={blogFormRef} />
      </Toggleable>
    </div>
  )
}

export default BlogsView
