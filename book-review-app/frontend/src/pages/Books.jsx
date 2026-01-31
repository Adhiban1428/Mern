import { useState, useEffect } from 'react'
import { booksAPI } from '../api/api'
import BookCard from '../components/BookCard'
import './Books.css'

function Books() {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    fetchBooks()
  }, [])

  const fetchBooks = async () => {
    try {
      setLoading(true)
      const response = await booksAPI.getAll()
      setBooks(response.data || [])
      setError('')
    } catch (err) {
      setError('Failed to load books. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const filteredBooks = filter === 'all' ? books : books.filter(b => b.genre === filter)
  const genres = ['all', ...new Set(books.map(b => b.genre))]

  return (
    <div className="home">
      <div className="container">
        <h1 className="page-title">📚 BookVerse</h1>
        <p className="page-subtitle">Discover amazing books, share your thoughts, and connect with fellow readers</p>

        {/* Stats Section */}
        {!loading && (
          <div className="stats-section">
            <div className="stat-card">
              <div className="stat-number">{books.length}</div>
              <div className="stat-label">Books Available</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{genres.length - 1}</div>
              <div className="stat-label">Genres</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{books.reduce((sum, book) => sum + (book.totalReviews || 0), 0)}</div>
              <div className="stat-label">Total Reviews</div>
            </div>
          </div>
        )}

        {/* Filter */}
        <div className="filter-section">
          <label>🔍 Filter by Genre:</label>
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            {genres.map(genre => (
              <option key={genre} value={genre}>
                {genre === 'all' ? '🌟 All Books' : `📖 ${genre}`}
              </option>
            ))}
          </select>
        </div>

        {error && <div className="error-message">⚠️ {error}</div>}

        {loading ? (
          <div className="loading">📚 Loading amazing books...</div>
        ) : filteredBooks.length === 0 ? (
          <div className="empty-state">📭 No books found for this genre</div>
        ) : (
          <div className="books-grid">
            {filteredBooks.map(book => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Books