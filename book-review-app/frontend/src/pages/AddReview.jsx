import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { booksAPI } from '../api/api'
import './AddReview.css'

function AddReview() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    rating: 5,
    comment: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'rating' ? parseInt(value) : value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!formData.comment.trim()) {
      setError('Comment is required')
      return
    }

    if (formData.comment.length < 5) {
      setError('Comment must be at least 5 characters')
      return
    }

    try {
      setLoading(true)
      await booksAPI.addReview(id, formData)
      navigate(`/books/${id}`)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add review')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="add-review">
      <div className="container">
        <h1>Add Your Review</h1>

        <form onSubmit={handleSubmit} className="review-form">
          <div className="form-group">
            <label htmlFor="rating">Rating *</label>
            <select
              id="rating"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
            >
              {[1, 2, 3, 4, 5].map(num => (
                <option key={num} value={num}>{num} Stars</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="comment">Your Review *</label>
            <textarea
              id="comment"
              name="comment"
              value={formData.comment}
              onChange={handleChange}
              rows={6}
              placeholder="Share your thoughts about this book..."
            />
            <p className="char-count">{formData.comment.length} / 1000</p>
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="form-actions">
            <button type="submit" disabled={loading} className="btn btn-primary">
              {loading ? 'Submitting...' : 'Submit Review'}
            </button>
            <button
              type="button"
              onClick={() => navigate(`/books/${id}`)}
              className="btn btn-secondary"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddReview