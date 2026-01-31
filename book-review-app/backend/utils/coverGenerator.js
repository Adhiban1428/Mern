// Simple cover generator that creates unique covers based on book details
const generateBookCover = (title, author, genre) => {
  // Color schemes for different genres
  const genreColors = {
    'Fiction': ['#2C3E50', '#E74C3C', '#F39C12'],
    'Non-Fiction': ['#34495E', '#3498DB', '#95A5A6'],
    'Mystery': ['#1A1A1A', '#8E44AD', '#E67E22'],
    'Romance': ['#E91E63', '#FF6B9D', '#FFC0CB'],
    'Science Fiction': ['#0F3460', '#16537E', '#00D4FF'],
    'Fantasy': ['#4A148C', '#7B1FA2', '#AB47BC'],
    'Horror': ['#B71C1C', '#424242', '#FF5722'],
    'Biography': ['#5D4037', '#8D6E63', '#BCAAA4'],
    'History': ['#3E2723', '#6D4C41', '#A1887F'],
    'Self-Help': ['#1B5E20', '#4CAF50', '#81C784'],
    'default': ['#37474F', '#607D8B', '#90A4AE']
  };

  // Get colors for the genre
  const colors = genreColors[genre] || genreColors['default'];
  
  // Generate a hash from title to ensure consistency
  let hash = 0;
  for (let i = 0; i < title.length; i++) {
    const char = title.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  
  // Use hash to select colors
  const primaryColor = colors[Math.abs(hash) % colors.length];
  const secondaryColor = colors[(Math.abs(hash) + 1) % colors.length];
  const accentColor = colors[(Math.abs(hash) + 2) % colors.length];
  
  // Generate SVG cover
  const coverSvg = `
    <svg width="300" height="450" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${primaryColor};stop-opacity:1" />
          <stop offset="50%" style="stop-color:${secondaryColor};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${accentColor};stop-opacity:1" />
        </linearGradient>
        <style>
          .title-text { 
            font-family: 'Georgia', serif; 
            font-size: 24px; 
            font-weight: bold; 
            fill: white; 
            text-anchor: middle;
          }
          .author-text { 
            font-family: 'Arial', sans-serif; 
            font-size: 16px; 
            fill: #f0f0f0; 
            text-anchor: middle;
          }
          .genre-text { 
            font-family: 'Arial', sans-serif; 
            font-size: 12px; 
            fill: #cccccc; 
            text-anchor: middle;
            text-transform: uppercase;
            letter-spacing: 2px;
          }
        </style>
      </defs>
      
      <rect width="300" height="450" fill="url(#grad1)"/>
      
      ${getGenreDecorations(genre)}
      
      <text x="150" y="200" class="title-text">${title.length > 20 ? title.substring(0, 20) + '...' : title}</text>
      <text x="150" y="380" class="author-text">by ${author}</text>
      <text x="150" y="420" class="genre-text">${genre}</text>
    </svg>
  `;
  
  return `data:image/svg+xml;base64,${Buffer.from(coverSvg).toString('base64')}`;
};

function getGenreDecorations(genre) {
  const decorations = {
    'Mystery': '<circle cx="50" cy="80" r="20" fill="rgba(255,255,255,0.1)"/><circle cx="250" cy="350" r="15" fill="rgba(255,255,255,0.1)"/>',
    'Romance': '<path d="M150,100 C130,80 100,80 100,110 C100,140 150,180 150,180 C150,180 200,140 200,110 C200,80 170,80 150,100 Z" fill="rgba(255,255,255,0.2)"/>',
    'Science Fiction': '<polygon points="150,50 160,80 190,80 170,100 180,130 150,110 120,130 130,100 110,80 140,80" fill="rgba(255,255,255,0.2)"/>',
    'Fantasy': '<path d="M150,60 L155,75 L170,75 L158,85 L163,100 L150,90 L137,100 L142,85 L130,75 L145,75 Z" fill="rgba(255,255,255,0.3)"/>',
    'Horror': '<path d="M50,400 Q75,380 100,400 Q125,420 150,400 Q175,380 200,400 Q225,420 250,400" stroke="rgba(255,255,255,0.2)" stroke-width="2" fill="none"/>',
    'default': '<rect x="20" y="20" width="260" height="410" rx="10" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="2"/>'
  };
  
  return decorations[genre] || decorations['default'];
}

module.exports = { generateBookCover };