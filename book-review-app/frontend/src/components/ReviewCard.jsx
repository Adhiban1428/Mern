import './ReviewCard.css'

function ReviewCard({ review }) {
  return (
    <div className="review-card">
      <div className="review-header">
        <h4 className="reviewer-name">{review.user?.name || 'Anonymous'}</h4>
        <span className="review-rating">{'⭐'.repeat(review.rating)}</span>
      </div>
      <p className="review-comment">{review.comment}</p>
      <p className="review-date">{new Date(review.createdAt).toLocaleDateString()}</p>
    </div>
  )
}

export default ReviewCard