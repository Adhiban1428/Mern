const express = require('express');
const { generateBookCover } = require('../utils/coverGenerator');

const router = express.Router();

// Generate cover for book
router.post('/generate', (req, res) => {
  try {
    const { title, author, genre } = req.body;
    
    if (!title || !author || !genre) {
      return res.status(400).json({ 
        message: 'Title, author, and genre are required' 
      });
    }
    
    const coverUrl = generateBookCover(title, author, genre);
    
    res.json({ coverUrl });
  } catch (error) {
    console.error('Cover generation error:', error);
    res.status(500).json({ message: 'Failed to generate cover' });
  }
});

module.exports = router;