const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');

app.use(express.json());

// Other middleware and setup

// Use user routes
app.use('/api/users', userRoutes);

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
