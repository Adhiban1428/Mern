import { Link } from 'react-router-dom'
import './BookCard.css'

function BookCard({ book }) {
  const handleImageError = (e) => {
    // Fallback to a simple placeholder if cover fails to load
    e.target.src = `data:image/svg+xml;base64,${btoa(`
      <svg width="300" height="450" xmlns="http://www.w3.org/2000/svg">
        <rect width="300" height="450" fill="#666"/>
        <text x="150" y="200" text-anchor="middle" fill="white" font-size="20">${book.title}</text>
        <text x="150" y="250" text-anchor="middle" fill="#ccc" font-size="16">${book.author}</text>
      </svg>
    `)}`;
  };

  return (
    <div className="book-card">
      <img 
        src={book.coverImage || '/placeholder-cover.jpg'} 
        alt={book.title} 
        className="book-image"
        onError={handleImageError}
      />
      <div className="book-info">
        <h3 className="book-title">{book.title}</h3>
        <p className="book-author">{book.author}</p>
        <div className="book-rating">
          <span className="stars">{'⭐'.repeat(Math.round(book.averageRating || book.rating || 0))}</span>
          <span className="rating-text">{book.averageRating || book.rating || 'N/A'} ({book.totalReviews || book.reviewCount || 0})</span>
        </div>
        <p className="book-genre">{book.genre}</p>
        <Link to={`/books/${book._id}`} className="btn btn-primary">
          View Details
        </Link>
      </div>
    </div>
  )
}

export default BookCard