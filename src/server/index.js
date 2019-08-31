const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.listen(3000, function(){
  console.log('Example app listening on port 3000!');
});

app.get('/api/users', function(req, res){
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify([
    { name: 'Admin', email: 'admin@mail.com' },
    { name: 'Manager', email: 'manager@mail.com' },
    { name: 'Dima', email: 'dima@mail.com'}
  ]));
});

app.get('/*', function(req, res){
  res.send(`<!DOCTYPE html>
  <html lang="en">
  <head>
    <title>Document</title>
  </head>
  <body>
    <div id="root"></div>
    <script src="http://localhost:8080/dist/main.js"></script>  
  </body>
  </html>`);
});