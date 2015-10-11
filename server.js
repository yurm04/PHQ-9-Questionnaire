// server.js --------------------------
var express = require('express'),
    app     = express();

// serve files from /public
app.use(express.static('./public'))

// Create basic server
app.listen(3000, function() {
  console.log('Connected to server...');
});

/*
  Had to set up server because Chrome doesn't like it
  when you don't serve js files over HTTP -_-
 */