const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
const app = express();
require('dotenv').config();

const PORT = process.env.PORT;
const IP = process.env.IP;

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));
  

// Import các route
const authRouter = require('./routes/authRouter');
const verifyRouter = require('./routes/verifyRouter');
const profileRouter = require('./routes/profileRouter');
const foodRouter = require('./routes/foodRouter');
const restaurantRouter = require('./routes/restaurantRouter');
const swipedRestaurantRouter = require('./routes/swipedRestaurantRouter');
const swipedFoodRouter = require('./routes/swipedFoodRouter');
const relationRouter = require('./routes/relationRouter');
const pdfRouter = require('./routes/pdfRouter');


// Sử dụng các route
app.use('/auth', authRouter);
app.use('/verify', verifyRouter);
app.use('/profile', profileRouter);
app.use('/foods', foodRouter);
app.use('/restaurants', restaurantRouter);
app.use('/swiped-restaurants', swipedRestaurantRouter);
app.use('/swiped-foods', swipedFoodRouter);
app.use('/relations', relationRouter); 
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); 
app.use('/api/pdf', pdfRouter); 

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://${IP}:${PORT}`);
});