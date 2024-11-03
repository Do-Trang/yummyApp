const express = require('express');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 3000;
const IP = process.env.IP

app.use(express.json());
app.use(cors());

const authRouter = require('./routes/authRouter');
const verifyRouter = require('./routes/verifyRouter');

app.use('/auth', authRouter);
app.use('/verify', verifyRouter);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://${IP}:${PORT}`);
});
