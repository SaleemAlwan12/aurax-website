const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Helper: Get formatted date/time
function getDateTime() {
    const now = new Date();
    return now.toLocaleString('en-GB', { hour12: false });
}

// POST endpoint to receive contact form data
app.post('/contact', (req, res) => {
    const { name, email, message, location } = req.body;
    const dateTime = getDateTime();
    const row = `${name || ''} | ${email || ''} | ${message || ''} | ${dateTime} | ${location || ''}\n`;
    const filePath = path.join(__dirname, 'messages.txt');
    fs.appendFile(filePath, row, (err) => {
        if (err) {
            console.error('Error writing to file:', err);
            return res.status(500).json({ success: false, error: 'Failed to save message.' });
        }
        res.json({ success: true });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
}); 