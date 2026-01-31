import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { booksAPI } from '../api/api'
import ReviewCard from '../components/ReviewCard'
import './BookDetail.css'

function BookDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const [book, setBook] = useState(null)
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchBookDetail()
  }, [id])

  const fetchBookDetail = async () => {
    try {
      setLoading(true)
      const [bookResponse, reviewsResponse] = await Promise.all([
        booksAPI.getById(id),
        booksAPI.getReviews(id).catch(() => ({ data: [] }))
      ])
      setBook(bookResponse.data)
      setReviews(reviewsResponse.data || [])
      setError('')
    } catch (err) {
      setError('Failed to load book details.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="container"><p className="loading">Loading...</p></div>
  if (error) return <div className="container"><p className="error-message">{error}</p></div>
  if (!book) return <div className="container"><p>Book not found</p></div>

  return (
    <div className="book-detail">
      <div className="container">
        <Link to="/" className="back-link">← Back to Books</Link>

        <div className="detail-content">
          <div className="book-cover-section">
            <img src={book.coverImage} alt={book.title} className="book-cover" />
          </div>

          <div className="book-info-section">
            <h1 className="detail-title">{book.title}</h1>
            <p className="detail-author">by {book.author}</p>

            <div className="detail-meta">
              <span className="genre-badge">{book.genre}</span>
              <span className="year">{book.publishYear}</span>
            </div>

            <div className="detail-rating">
              <span className="stars">{'⭐'.repeat(Math.round(book.averageRating || 0))}</span>
              <span className="rating-value">{book.averageRating || 'N/A'} / 5</span>
              <span className="review-count">({book.totalReviews || 0} reviews)</span>
            </div>

            <div className="detail-description">
              <h3>Description</h3>
              <p>{book.description}</p>
            </div>

            {isAuthenticated && (
              <Link to={`/books/${id}/review`} className="btn btn-add-review">
                ✍️ Add Review
              </Link>
            )}
            {!isAuthenticated && (
              <button onClick={() => navigate('/login')} className="btn btn-add-review">
                Login to Add Review
              </button>
            )}
          </div>
        </div>

        <div className="reviews-section">
          <h2>Reviews ({reviews.length})</h2>
          {reviews.length === 0 ? (
            <p className="no-reviews">No reviews yet. Be the first to review!</p>
          ) : (
            reviews.map(review => (
              <ReviewCard key={review._id} review={review} />
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default BookDetail