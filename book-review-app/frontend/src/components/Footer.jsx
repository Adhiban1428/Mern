import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">Booksy</div>
        <div className="footer-links">
          <a href="/">Home</a>
          <a href="/books">Books</a>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
        </div>
        <p>&copy; 2025 Booksy. All rights reserved.</p>
        <p>Your ultimate book review destination</p>
      </div>
    </footer>
  )
}

export default Footer