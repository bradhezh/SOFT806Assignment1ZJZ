import {
  useState,
  useEffect,
} from 'react'
import {
  useNavigate,
} from 'react-router-dom'

import './style.css'
import config from '../../../config'
import Header from './Header'
import UserBar from './UserBar'
import Footer from './Footer'
import Notification from './Notification'

const MainPage = () => {
  const [user, setUser] = useState(null)

  const [notif, setNotif] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {(async () => {try {
    const loggedin = JSON.parse(localStorage.getItem('loggedin'))
    if (!loggedin) {
      navigate('/login')
      return
    }
    setUser(loggedin)

  } catch (err) {
    setNotif({
      type: 'error',
      message: err.response.data?.error || err.message,
    })
    setTimeout(() => setNotif(null), 5000)
  }})()}, [navigate])

  return (
    <div>
      <Header />
      <UserBar user={user} />
      <Notification notif={notif} />
      <Footer />
    </div>
  )
}

export default MainPage
