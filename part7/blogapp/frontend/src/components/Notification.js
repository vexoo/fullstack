import { useNotificationValue } from '../NotificationContext'

const Notification = () => {
  const notification = useNotificationValue()

  //make two styles, one for green -> no error and one for red -> error

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
    color: 'green'
  }

  const redStyle = {
    ...style,
    color: 'red'
  }

  if (!notification) return null

  return <div style={style}>{notification}</div>
  /*return (
    <div style={notification.color === 'red' ? redStyle : style}>
      {notification.message}
    </div>
  )*/
}

export default Notification
