var port = process.env.PORT || 3000,
    http = require('http'),
    fs = require('fs'),
    html = fs.readFileSync('index.html');

var log = function(entry) {
    fs.appendFileSync('/tmp/sample-app.log', new Date().toISOString() + ' - ' + entry + '\n');
};

const dns = require('dns');
// Function to verify DNS resolution
const verifyDNSResolve = (hostname) => {
  dns.resolve(hostname, (error, addresses) => {
    if (error) {
      console.error('DNS resolution failed:', error);
      return;
    }

    console.log('IP addresses:', addresses);
  });
};

// Usage
verifyDNSResolve('database-2.cvwop0tqqo96.us-east-1.rds.amazonaws.com');

const mysql = require('mysql');

// MySQL database configuration with connectTimeout property


const connection1 = mysql.createConnection({
  host: 'database-2.cvwop0tqqo96.us-east-1.rds.amazonaws.com',
  user: 'admin',
  password: 'test1234'
});

// Attempt to connect to the database
connection1.connect((error) => {
  if (error) {
    console.error('Error connecting to the database:', error);
    return;
  }

  console.log('Connected to the MySQL database.');
  // Perform any other database operations here

  // Close the connection
  connection1.end((error) => {
    if (error) {
      console.error('Error closing the database connection:', error);
      return;
    }

    console.log('Disconnected from the MySQL database.');
  });
});

var server = http.createServer(function (req, res) {
    if (req.method === 'POST') {
        var body = '';

        req.on('data', function(chunk) {
            body += chunk;
        });

        req.on('end', function() {
            const connection = mysql.createConnection({
              host: '10.0.151.148',
              user: 'admin',
              password: 'test1234'
            });

            // Attempt to connect to the database
            connection.connect((error) => {
              if (error) {
                console.error('Error connecting to the database:', error);
                return;
              }

              console.log('Connected to the MySQL database.');
              // Perform any other database operations here

              // Close the connection
              connection.end((error) => {
                if (error) {
                  console.error('Error closing the database connection:', error);
                  return;
                }

                console.log('Disconnected from the MySQL database.');
              });
            });
            if (req.url === '/') {
                log('Received message: ' + body);
            } else if (req.url = '/scheduled') {
                log('Received task ' + req.headers['x-aws-sqsd-taskname'] + ' scheduled at ' + req.headers['x-aws-sqsd-scheduled-at']);
            }

            res.writeHead(200, 'OK', {'Content-Type': 'text/plain'});
            res.end();
        });
    } else {
        res.writeHead(200);
        res.write(html);
        res.end();
    }
});

// Listen on port 3000, IP defaults to 127.0.0.1
server.listen(port);

// Put a friendly message on the terminal
console.log('Server running at http://127.0.0.1:' + port + '/');
