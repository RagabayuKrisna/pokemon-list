const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

let renameCount = {};

const fibonacci = (n, memo = {}) => {
    if (n in memo) return memo[n];
    if (n <= 1) return n;
    memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo);
    return memo[n];
};

app.get('/catch', (req, res) => {
    const success = Math.random() < 0.5;
    res.json({ success });
});
app.get('/release', (req, res) => {
    const number = Math.floor(Math.random() * 100) + 1;
    const isPrime = (num) => {
        if (num <= 1) return false;
        for (let i = 2; i <= Math.sqrt(num); i++) {
            if (num % i === 0) return false;
        }
        return true;
    };
    const prime = isPrime(number);
    res.json({ success: prime, number });
});
app.post('/rename', (req, res) => {
    const { name } = req.body;
    if (!renameCount[name]) renameCount[name] = 0;
    const newName = `${name}-${fibonacci(renameCount[name])}`;
    renameCount[name] += 1;
    res.json({ newName });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
