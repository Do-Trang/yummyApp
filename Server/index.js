const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

const PORT = process.env.PORT;
const IP = process.env.IP;

app.use(express.json());
app.use(cors());

// Import các route
const authRouter = require('./routes/authRouter');
const verifyRouter = require('./routes/verifyRouter');
const profileRouter = require('./routes/profileRouter');
const foodRouter = require('./routes/foodRouter');
const restaurantRouter = require('./routes/restaurantRouter');
const swipedRestaurantRouter = require('./routes/swipedRestaurantRouter');
const swipedFoodRouter = require('./routes/swipedFoodRouter');
const relationRouter = require('./routes/relationRouter');


// Sử dụng các route
app.use('/auth', authRouter);
app.use('/verify', verifyRouter);
app.use('/profile', profileRouter);
app.use('/foods', foodRouter);
app.use('/restaurants', restaurantRouter);
app.use('/swiped-restaurants', swipedRestaurantRouter);
app.use('/swiped-foods', swipedFoodRouter);
app.use('/relations', relationRouter); 

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://${IP}:${PORT}`);
});