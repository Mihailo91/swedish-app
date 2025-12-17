const express = require('express');
const dotenv = require('dotenv').config();
const {errorHandler} = require('./middleware/errorMiddleware');

const PORT = process.env.PORT || 5000;

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

//to accept form data
app.use(express.urlencoded({ extended: false }));

app.get('/health', (req, res) => {
  res.status(200).json({message : 'UP!'});
});

// Newsletter subscription route
app.use('/api/subscribe', require('./routes/newsletter'));

app.use (errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));