import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import './Navbar.css'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { isAuthenticated, user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
    setIsOpen(false)
  }

  return (
    <nav className="navbar">
      <div className="container">
        <div className="nav-content">
          <Link to="/" className="logo">
            📚 Booksy
          </Link>

          <button className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
            ☰
          </button>

          <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
            <li>
              <Link to="/" onClick={() => setIsOpen(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/books" onClick={() => setIsOpen(false)}>
                Books
              </Link>
            </li>
            {isAuthenticated ? (
              <>
                <li>
                  <Link to="/add-book" onClick={() => setIsOpen(false)}>
                    Add Book
                  </Link>
                </li>
                <li className="user-info">
                  Welcome, {user?.name || user?.username}
                </li>
                <li>
                  <button className="logout-btn" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login" onClick={() => setIsOpen(false)}>
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/signup" onClick={() => setIsOpen(false)}>
                    Signup
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar