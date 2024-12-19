const http = require("http");
const path = require("path");
const fs = require("fs");
const hostname = '0.0.0.0';
const port = 8080;

const server = http.createServer((req, res) => {
    if (req.url === '/') {  
        res.writeHead(302, { Location: 'https://nodejsfinal.netlify.app' });
        res.end();
      }
    
    else if (req.url === '/') {
        // read public.html file from public folder
        fs.readFile(path.join(__dirname, 'public', 'index.html'),
                    (err, content) => {
                                    
                                    if (err) throw err;
                                    res.writeHead(200, { 'Content-Type': 'text/html' });
                                    res.end(content);
                        }
              );
     }

     else if(req.url === '/style.css'){
        fs.readFile(path.join(__dirname, 'public', 'style.css'),
                    (err, content) => {
                                    if(err)throw err;
                                    res.writeHead(200,{'Content-Type':'text/css'});
                                    res.end(content);
                    }
                );
     }

     else if(req.url === '/script.js'){
        fs.readFile(path.join(__dirname, 'public', 'script.js'),
                    (err, content) => {
                                    if(err)throw err;
                                    res.writeHead(200,{'Content-Type':'text/javascript'});
                                    res.end(content);
                    }
                );
     }

     else if (req.url.startsWith('/image/')) {
        const imagePath = path.join(__dirname, 'public', req.url); // Construct the image path
        // console.log(imagePath);
    
        // Check if the file exists
        fs.access(imagePath, fs.constants.F_OK, (err) => {
          if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Image not found');
          } else {
            // Read and serve the image
            fs.readFile(imagePath, (err, data) => {
              if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Error reading image');
              } else {
                const contentType = getContentType(imagePath); // Determine content type
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(data);
              }
            });
          }
        });
      }

    else if (req.url==='/api')
    {
        fs.readFile(
            path.join(__dirname, 'public', 'db.json'),'utf-8',
                    (err, content) => {
                                    
                                    if (err) throw err;
                                    // Please note the content-type here is application/json
                                    res.writeHead(200, { 'Content-Type': 'application/json' });
                                    res.end(content);
                        }
              );
    }
    else{
        res.end("<h1> 404 nothing is here</h1>");
    }

});

function getContentType(filePath) {
    const extname = path.extname(filePath);
    switch (extname) {
      case '.jpg':
        return 'impage/jpg';
      case '.png':
        return 'image/png';
      default:
        return 'application/octet-stream';
    }
  }

// it will first try to look for
// environment variable, if not found then go for 5959
const PORT= process.env.PORT || port;

// // port, callback
server.listen(PORT,hostname, ()=> console.log(`Great our server is running on port ${PORT} `));
