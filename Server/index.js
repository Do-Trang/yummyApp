const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

const PORT = process.env.PORT;
const IP = process.env.IP

app.use(express.json());
app.use(cors());

const authRouter = require('./routes/authRouter');
const verifyRouter = require('./routes/verifyRouter');
const profileRouter = require('./routes/profileRouter')

app.use('/auth', authRouter);
app.use('/verify', verifyRouter);
app.use('/profile', profileRouter);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://${IP}:${PORT}`);
});
