import { useContext } from 'react'
import { UserContext } from '../UserContext'
import { Link } from 'react-router-dom'

import { Navbar, Nav, Button } from 'react-bootstrap'

const NavMenu = () => {
  const padding = {
    padding: 5
  }

  const titleStyle = {
    marginBottom: '5px',
    paddingLeft: '10px',
    fontSize: '20px'
  }

  const { dispatch } = useContext(UserContext)
  const { state } = useContext(UserContext)

  const handleLogout = () => {
    window.localStorage.clear()
    dispatch({ type: 'LOGOUT' })
  }

  return (
    <Navbar expand="lg" bg="dark" variant="dark">
      <Nav className="me-auto">
        <Navbar.Brand style={titleStyle}>Blogapp</Navbar.Brand>
        <Nav.Link href="#" as="span">
          <Link style={padding} to="/">
            blogs
          </Link>
        </Nav.Link>
        <Nav.Link href="#" as="span">
          <Link style={padding} to="/users">
            users
          </Link>
        </Nav.Link>
      </Nav>
      <Nav className="ml-auto">
        <Nav.Link href="#" as="span">
          <em style={{ marginRight: '15px' }}>{state.user.name}</em>
          <Button
            variant="secondary"
            onClick={() => handleLogout()}
          >
            logout
          </Button>
        </Nav.Link>
      </Nav>
    </Navbar>
  )
}
export default NavMenu
