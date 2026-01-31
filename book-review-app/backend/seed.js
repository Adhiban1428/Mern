require('dotenv').config();
const mongoose = require('mongoose');
const Book = require('./models/Book');
const connectDB = require('./db');

const sampleBooks = [
  {
    title: "The Lord of the Rings: The Fellowship of the Ring",
    author: "J.R.R. Tolkien",
    genre: "Fantasy",
    description: "An epic fantasy adventure following Frodo Baggins as he begins his quest to destroy the One Ring and save Middle-earth.",
    coverImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=400&fit=crop",
    averageRating: 4.8,
    totalReviews: 0
  },
  {
    title: "The Chronicles of Narnia: The Lion, the Witch and the Wardrobe",
    author: "C.S. Lewis",
    genre: "Fantasy",
    description: "Four children discover a magical world through an old wardrobe, where they must help Aslan defeat the White Witch.",
    coverImage: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=400&fit=crop",
    averageRating: 4.6,
    totalReviews: 0
  },
  {
    title: "Treasure Island",
    author: "Robert Louis Stevenson",
    genre: "Adventure",
    description: "A thrilling tale of pirates, treasure maps, and high-seas adventure following young Jim Hawkins.",
    coverImage: "https://images.unsplash.com/photo-1551029506-0807df4e2031?w=300&h=400&fit=crop",
    averageRating: 4.3,
    totalReviews: 0
  },
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    genre: "Fantasy",
    description: "Bilbo Baggins embarks on an unexpected journey with thirteen dwarves to reclaim their homeland from the dragon Smaug.",
    coverImage: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=300&h=400&fit=crop",
    averageRating: 4.7,
    totalReviews: 0
  },
  {
    title: "The Adventures of Tom Sawyer",
    author: "Mark Twain",
    genre: "Adventure",
    description: "Follow the mischievous Tom Sawyer through his adventures along the Mississippi River in this classic American tale.",
    coverImage: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop",
    averageRating: 4.2,
    totalReviews: 0
  },
  {
    title: "Harry Potter and the Philosopher's Stone",
    author: "J.K. Rowling",
    genre: "Fantasy",
    description: "A young wizard discovers his magical heritage and begins his education at Hogwarts School of Witchcraft and Wizardry.",
    coverImage: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop",
    averageRating: 4.9,
    totalReviews: 0
  },
  {
    title: "The Princess Bride",
    author: "William Goldman",
    genre: "Fantasy Adventure",
    description: "A tale of true love, high adventure, pirates, and revenge in the magical kingdom of Florin.",
    coverImage: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=400&fit=crop",
    averageRating: 4.5,
    totalReviews: 0
  },
  {
    title: "Percy Jackson: The Lightning Thief",
    author: "Rick Riordan",
    genre: "Fantasy Adventure",
    description: "A modern-day demigod discovers his heritage and must prevent a war between the Greek gods.",
    coverImage: "https://images.unsplash.com/photo-1495640388908-05fa85288e61?w=300&h=400&fit=crop",
    averageRating: 4.4,
    totalReviews: 0
  },
  {
    title: "The Golden Compass",
    author: "Philip Pullman",
    genre: "Fantasy Adventure",
    description: "Lyra Belacqua journeys through parallel worlds with her daemon companion in this epic fantasy adventure.",
    coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop",
    averageRating: 4.3,
    totalReviews: 0
  },
  {
    title: "Robinson Crusoe",
    author: "Daniel Defoe",
    genre: "Adventure",
    description: "The classic survival story of a man stranded on a deserted island for 28 years.",
    coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop",
    averageRating: 4.1,
    totalReviews: 0
  },
  {
    title: "Eragon",
    author: "Christopher Paolini",
    genre: "Fantasy",
    description: "A farm boy discovers a dragon egg and becomes a Dragon Rider, destined to overthrow an evil king.",
    coverImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=400&fit=crop",
    averageRating: 4.2,
    totalReviews: 0
  },
  {
    title: "The Maze Runner",
    author: "James Dashner",
    genre: "Dystopian Adventure",
    description: "Thomas wakes up in a mysterious maze with no memory, and must work with other boys to find a way out.",
    coverImage: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=400&fit=crop",
    averageRating: 4.0,
    totalReviews: 0
  }
];

const seedDatabase = async () => {
  try {
    await connectDB();
    
    // Clear existing books
    await Book.deleteMany({});
    console.log('Cleared existing books');
    
    // Insert sample books
    await Book.insertMany(sampleBooks);
    console.log('Sample books inserted successfully');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();