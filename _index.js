const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
// const serverless = require("serverless-http");
// const router = express.Router();
const hostname = '0.0.0.0'
const port = process.env.PORT || 3000; // Use the port provided by Netlify

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
  res.send("App is running...");
});

// API endpoint (adjust this based on your actual /api logic)
app.get('/api', (req, res) => {
  fs.readFile(path.join(__dirname, 'public', 'db.json'), 'utf-8', (err, content) => {
    if (err) {
      console.error("Failed to read db.json:", err);
      return res.status(500).send('Error reading data');

    }
    try {
      const jsonData = JSON.parse(content);
      res.json(jsonData); 

    } catch (parseError) {
      console.error("Failed to parse db.json:", parseError);
      return res.status(500).send('Error parsing data');
    }
  });
});

// 404 handler
// app.use((req, res) => {
//   res.status(404).send("<h1>404 nothing is here</h1>");
// });
// app.use()

app.listen(port, hostname, () => {
  console.log(`Great our server is running on port ${port}`);
});