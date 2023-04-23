import { Alert } from 'react-bootstrap'
import { useNotificationValue } from '../NotificationContext'

const Notification = () => {
  const notification = useNotificationValue()

  if (!notification) return null

  const variant = notification.color === 'green' ? 'success' : 'danger'

  return <Alert variant={variant}>{notification.message}</Alert>
}

export default Notification
