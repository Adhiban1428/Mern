import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { booksAPI } from '../api/api'
import './AddBook.css'

function AddBook() {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: 'Fiction',
    description: '',
    coverImage: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [previewCover, setPreviewCover] = useState('')

  const genres = [
    'Fiction', 'Non-Fiction', 'Mystery', 'Romance', 'Science Fiction',
    'Fantasy', 'Horror', 'Biography', 'History', 'Self-Help'
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Generate preview when title, author, or genre changes
    if ((name === 'title' || name === 'author' || name === 'genre') && 
        formData.title && formData.author) {
      generatePreview({
        ...formData,
        [name]: value
      })
    }
  }

  const generatePreview = async (data) => {
    if (!data.title || !data.author || !data.genre) return
    
    try {
      const response = await fetch('/api/covers/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: data.title,
          author: data.author,
          genre: data.genre
        })
      })
      
      if (response.ok) {
        const result = await response.json()
        setPreviewCover(result.coverUrl)
      }
    } catch (err) {
      console.error('Preview generation failed:', err)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.title || !formData.author || !formData.description) {
      setError('Please fill in all required fields')
      return
    }

    setLoading(true)
    setError('')

    try {
      if (!isAuthenticated) {
        setError('Please login to add books')
        return
      }

      await booksAPI.create(formData)
      navigate('/books')
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add book')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="add-book">
      <div className="container">
        <h1>Add New Book</h1>
        
        <div className="add-book-content">
          <form onSubmit={handleSubmit} className="book-form">
            <div className="form-group">
              <label htmlFor="title">Title *</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="author">Author *</label>
              <input
                type="text"
                id="author"
                name="author"
                value={formData.author}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="genre">Genre *</label>
              <select
                id="genre"
                name="genre"
                value={formData.genre}
                onChange={handleChange}
                required
              >
                {genres.map(genre => (
                  <option key={genre} value={genre}>{genre}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="description">Description *</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="coverImage">Custom Cover URL (optional)</label>
              <input
                type="url"
                id="coverImage"
                name="coverImage"
                value={formData.coverImage}
                onChange={handleChange}
                placeholder="Leave empty to auto-generate cover"
              />
              <small>If left empty, a unique cover will be generated automatically</small>
            </div>

            {error && <div className="error-message">{error}</div>}

            <button type="submit" disabled={loading} className="btn btn-primary">
              {loading ? 'Adding Book...' : 'Add Book'}
            </button>
          </form>

          {previewCover && (
            <div className="cover-preview">
              <h3>Cover Preview</h3>
              <img src={previewCover} alt="Generated cover preview" />
              <p>This cover will be generated automatically if no custom URL is provided</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AddBook