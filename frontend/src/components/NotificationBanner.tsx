import { Alert} from "@mui/material"
interface NotificationProps {
  notification: {message: string, type: 'error' | 'success' | ''}
}

const NotificationBanner = ({notification}: NotificationProps) => {


  return (
  <div data-testid="notification-banner" style={{ position: 'fixed', left: 0, right: 0, top: 0, zIndex: 1300}}>

      {notification.type === 'error' &&
      <Alert severity="error">{notification.message}</Alert>}

      {notification.type === 'success' &&
      <Alert severity="success">{notification.message}</Alert>}

  </div>

  )
}

export default NotificationBanner;