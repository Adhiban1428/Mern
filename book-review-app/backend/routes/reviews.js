const express = require('express');
const Review = require('../models/Review');
const Book = require('../models/Book');
const auth = require('../middleware/auth');

const router = express.Router();

// Get reviews for a book
router.get('/book/:bookId', async (req, res) => {
  try {
    const reviews = await Review.find({ book: req.params.bookId })
      .populate('user', 'username')
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create review (protected)
router.post('/', auth, async (req, res) => {
  try {
    const { bookId, rating, comment } = req.body;

    const existingReview = await Review.findOne({ book: bookId, user: req.userId });
    if (existingReview) {
      return res.status(400).json({ message: 'You have already reviewed this book' });
    }

    const review = new Review({
      book: bookId,
      user: req.userId,
      rating,
      comment
    });

    await review.save();

    // Update book's average rating
    const reviews = await Review.find({ book: bookId });
    const avgRating = reviews.reduce((sum, rev) => sum + rev.rating, 0) / reviews.length;
    
    await Book.findByIdAndUpdate(bookId, {
      averageRating: avgRating,
      totalReviews: reviews.length
    });

    const populatedReview = await Review.findById(review._id).populate('user', 'username');
    res.status(201).json(populatedReview);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;