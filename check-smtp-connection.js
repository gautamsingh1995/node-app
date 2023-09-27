const { SMTPConnection } = require('smtp-connection');

// Define the SMTP server configuration
const config = {
  host: 'your-smtp-server-hostname', // Replace with your SMTP server's hostname
  port: 587, // Replace with your SMTP server's port (usually 587 for TLS)
  secure: false, // Set to true if your SMTP server uses TLS
  auth: {
    user: 'your-email@example.com', // Replace with your email address
    pass: 'your-email-password',    // Replace with your email password
  },
};

// Create an SMTP connection
const connection = new SMTPConnection(config);

// Event handlers for the SMTP connection
connection.on('connect', () => {
  console.log('Connected to the SMTP server');
});

connection.on('error', (err) => {
  console.error('Error:', err);
});

connection.on('end', () => {
  console.log('Disconnected from the SMTP server');
});

// Establish the connection
connection.connect()
  .then(() => {
    console.log('Connection established successfully');
    // You can perform other tasks here, such as sending emails or testing the SMTP server
  })
  .catch((err) => {
    console.error('Connection error:', err);
  });
s