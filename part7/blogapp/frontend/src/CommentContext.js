import { createContext } from 'react'
import { useQuery } from 'react-query'
import blogService from './services/blogs'

const CommentContext = createContext()

export const CommentContextProvider = (props) => {
  const result = useQuery('comments', () => blogService.getComments(), {
    refetchOnWindowFocus: false
  })

  if (result.isLoading) {
    return <div>loading data...</div>
  }
  if (result.isError) {
    return <div>comments not available due to problems in server</div>
  }
  const comments = result.data

  return (
    <CommentContext.Provider value={comments}>
      {props.children}
    </CommentContext.Provider>
  )
}

export default CommentContext
