import PropTypes from 'prop-types'

const LoginForm = ({
    handleLogin,
    handleUsernameChange,
    handlePasswordChange,
    username,
    password
}) => {
    return (
        <div>
            <h2>Log in to application</h2>
            <form onSubmit={handleLogin}>
                <div>
                    username:
                    <input
                        type="text"
                        value={username}
                        name="Username"
                        onChange={handleUsernameChange}
                        style={{ marginLeft: '10px', marginBottom: '2px' }}
                    />
                </div>
                <div>
                    password:
                    <input
                        type="password"
                        value={password}
                        name="Password"
                        onChange={handlePasswordChange}
                        style={{ marginLeft: '10px', marginBottom: '2px' }}
                    />
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    )
}

LoginForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    handleUsernameChange: PropTypes.func.isRequired,
    handlePasswordChange: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
}

//Toggleable.displayNamy = 'Toggleable'

export default LoginForm