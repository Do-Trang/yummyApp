const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const authRouter = require('./routes/authRouter');
const verifyRouter = require('./routes/verifyRouter');

app.use('/auth', authRouter);
app.use('/verify', verifyRouter);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
