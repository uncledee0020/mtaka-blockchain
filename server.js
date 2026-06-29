const express = require('express');
const { 
  recordEvent, 
  getChain, 
  isValid, 
  getTotalCO2Saved, 
  getTotalDevicesRecycled, 
  getTotalRewards, 
  resetChain,
  getUserStats,
  getTotalUsersRecycled // <-- Add this line
} = require('./service');


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
    totalRewards: getTotalRewards(),
    totalUsersRecycled: getTotalUsersRecycled() // <-- Add this line
  });
});


app.get('/tamper', (req, res) => {
  const chain = getChain();
  if (chain.length > 1 
    // && chain[1].data
  ) {
    chain[1].data.reward = 9999; // change reward
  }

  res.json({
    message: "Blockchain tampered"
  });
});



app.get('/reset', (req, res) => { 
  resetChain();

  res.json({
    message: "Blockchain reset!"
  });
});

/**
 * Get aggregated stats for a specific user
 */
app.get('/user/:userId/stats', (req, res) => {
  const userId = req.params.userId;
  const stats = getUserStats(userId);
  res.json(stats);
});


app.listen(3000, () => {
  console.log('Blockchain running on port 3000');
});