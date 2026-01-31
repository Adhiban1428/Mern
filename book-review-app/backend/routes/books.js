const express = require('express');
const Book = require('../models/Book');
const auth = require('../middleware/auth');
const { generateBookCover } = require('../utils/coverGenerator');

const router = express.Router();

// Get all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    
    // Generate covers for books that don't have them
    const updatedBooks = books.map(book => {
      if (!book.coverImage || book.coverImage === '') {
        book.coverImage = generateBookCover(book.title, book.author, book.genre);
      }
      return book;
    });
    
    res.json(updatedBooks);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single book
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    
    // Generate cover if missing
    if (!book.coverImage || book.coverImage === '') {
      book.coverImage = generateBookCover(book.title, book.author, book.genre);
    }
    
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create book (protected)
router.post('/', auth, async (req, res) => {
  try {
    const { title, author, genre, description, coverImage } = req.body;
    
    // Generate cover if not provided
    let finalCoverImage = coverImage;
    if (!coverImage || coverImage.trim() === '') {
      finalCoverImage = generateBookCover(title, author, genre);
    }
    
    const book = new Book({
      title,
      author,
      genre,
      description,
      coverImage: finalCoverImage
    });

    await book.save();
    res.status(201).json(book);
  } catch (error) {
    console.error('Book creation error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add review to book (protected)
router.post('/:id/reviews', auth, async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const bookId = req.params.id;

    // Check if book exists
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    // Check if user already reviewed this book
    const Review = require('../models/Review');
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
    console.error('Add review error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;