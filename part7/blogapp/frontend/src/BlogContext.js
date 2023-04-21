import { createContext } from 'react'
import { useQuery } from 'react-query'
import blogService from './services/blogs'

const BlogContext = createContext()

export const BlogContextProvider = (props) => {
  const result = useQuery('blogs', () => blogService.getAll(), {
    refetchOnWindowFocus: false
  })

  if (result.isLoading) {
    return <div>loading data...</div>
  }
  if (result.isError) {
    return <div>blog service not available due to problems in server</div>
  }
  const blogs = result.data

  return (
    <BlogContext.Provider value={blogs}>{props.children}</BlogContext.Provider>
  )
}

export default BlogContext
