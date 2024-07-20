import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'

import SigninPage from './components/SigninPage'
import LoginPage from './components/LoginPage'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  )
}

export default App
