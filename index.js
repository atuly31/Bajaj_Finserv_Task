const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:3000'
  }));
  

const userId = "john_doe_17091999";
const email = "john@xyz.com";
const rollNumber = "ABCD123";

app.post('/bfhl', (req, res) => {
    try {
        const data = req.body.data || [];
        const numbers = data.filter(item => !isNaN(item));
        const alphabets = data.filter(item => /^[a-zA-Z]$/.test(item));

        const lowercaseAlphabets = alphabets.filter(char => char === char.toLowerCase());
        const highestLowercaseAlphabet = lowercaseAlphabets.length > 0 ? [lowercaseAlphabets.sort().pop()] : [];

        res.status(200).json({
            is_success: true,
            user_id: userId,
            email: email,
            roll_number: rollNumber,
            numbers: numbers,
            alphabets: alphabets,
            highest_lowercase_alphabet: highestLowercaseAlphabet
        });
    } catch (error) {
        res.status(500).json({ is_success: false, error: "Something went wrong!" });
    }
});


app.get('/bfhl', (req, res) => {
    res.status(200).json({
        operation_code: 1
    });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
