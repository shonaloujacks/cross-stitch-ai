import { Alert} from "@mui/material"
interface NotificationProps {
  notification: {message: string, type: 'error' | 'success' | ''}
}

const NotificationBanner = ({notification}: NotificationProps) => {


  return (
  <div>

      {notification.type === 'error' &&
      <Alert severity="error">{notification.message}</Alert>}

      {notification.type === 'success' &&
      <Alert severity="success">{notification.message}</Alert>}

  </div>
 

    



  )
}

export default NotificationBanner;