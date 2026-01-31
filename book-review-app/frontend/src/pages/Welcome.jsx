import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './Welcome.css'

function Welcome() {
  const [currentSlide, setCurrentSlide] = useState(0)
  
  const features = [
    {
      icon: '📚',
      title: 'Discover Books',
      description: 'Explore thousands of books across all genres'
    },
    {
      icon: '⭐',
      title: 'Rate & Review',
      description: 'Share your thoughts and help others find great reads'
    },
    {
      icon: '👥',
      title: 'Join Community',
      description: 'Connect with fellow book lovers and readers'
    }
  ]

  const testimonials = [
    {
      text: "Booksy helped me discover my new favorite author!",
      author: "Sarah M."
    },
    {
      text: "The best place to find honest book reviews.",
      author: "John D."
    },
    {
      text: "I love the community here. So many great recommendations!",
      author: "Emma L."
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="welcome">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Welcome to <span className="brand">Booksy</span>
            </h1>
            <p className="hero-subtitle">
              Your ultimate destination for book discovery, reviews, and literary discussions
            </p>
            <div className="hero-buttons">
              <Link to="/books" className="btn btn-primary btn-large">
                Explore Books
              </Link>
              <Link to="/signup" className="btn btn-secondary btn-large">
                Join Community
              </Link>
            </div>
          </div>
          <div className="hero-image">
            <div className="floating-books">
              <div className="book book-1">📖</div>
              <div className="book book-2">📚</div>
              <div className="book book-3">📓</div>
              <div className="book book-4">📔</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2 className="section-title">Why Choose Booksy?</h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">10K+</div>
              <div className="stat-label">Books</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">5K+</div>
              <div className="stat-label">Reviews</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">2K+</div>
              <div className="stat-label">Members</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">50+</div>
              <div className="stat-label">Genres</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <div className="container">
          <h2 className="section-title">What Our Readers Say</h2>
          <div className="testimonial-slider">
            <div className="testimonial-card">
              <p className="testimonial-text">"{testimonials[currentSlide].text}"</p>
              <div className="testimonial-author">- {testimonials[currentSlide].author}</div>
            </div>
            <div className="slider-dots">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`dot ${index === currentSlide ? 'active' : ''}`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Start Your Reading Journey?</h2>
            <p className="cta-text">Join thousands of book lovers and discover your next favorite read</p>
            <Link to="/signup" className="btn btn-primary btn-large">
              Get Started Free
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Welcome