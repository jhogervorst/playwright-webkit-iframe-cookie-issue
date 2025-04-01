const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the pages directory
app.use(express.static(path.join(__dirname, 'pages')));

// Parent domain route (example.test)
app.get('/', (req, res) => {
  // Set the test cookie with SameSite=Lax
  res.setHeader('Set-Cookie', 'testCookie=value; SameSite=Lax; Domain=example.test');
  res.sendFile(path.join(__dirname, 'pages', 'main.html'));
});

// Iframe domain route (sub.example.test)
app.get('/iframe', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'iframe.html'));
});

// API endpoint for iframe to verify cookie presence in requests
app.get('/api/check-cookie', (req, res) => {
  const cookiePresent = req.headers.cookie && req.headers.cookie.includes('testCookie');
  res.json({ cookiePresent });
});

// Start server on port 80
const PORT = 80;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
