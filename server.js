const express = require('express');
const { recordEvent, getChain, isValid, getTotalCO2Saved, getTotalDevicesRecycled, getTotalRewards } = require('./service');

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

app.get('/validate', (req, res) => {
  res.json({
    valid: isValid()
  });
});

app.get('/user/:userId', (req, res) => {
  const chain = getChain();

  const result =  chain.filter(
    block => block.data && block.data.userId === req.params.userId
  );

  res.json(result);
});

app.get('/device/:deviceId', (req, res) => {
  const chain = getChain();

  const result =  chain.filter(
    block => block.data && block.data.deviceId === req.params.deviceId
  );
  
  res.json(result);
});

app.get('/stats', (req, res) => {
  res.json({
    totalCo2Saved: getTotalCO2Saved(),
    totalDevicesRecycled: getTotalDevicesRecycled(),
    totalRewards: getTotalRewards()
  });
});

app.listen(3000, () => {
  console.log('Blockchain running on port 3000');
});