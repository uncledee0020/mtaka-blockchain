const express = require('express');
const { recordEvent, getChain } = require('./service');

const app = express();
app.use(express.json());

/**
 * Add blockchain record
 */
app.post('/record', (req, res) => {
  const data = req.body;

  const block = recordEvent(data);

  res.json({
    message: "Transaction recorded on blockchain successfully",
    block
  });
});

/**
 * Get blockchain
 */
app.get('/chain', (req, res) => {
  res.json(getChain());
});

app.listen(3000, () => {
  console.log('Blockchain running on port 3000');
});