// service.js
const Blockchain = require('./blockchain');
const Block = require('./block');

const mtakaChain = new Blockchain();

function recordEvent(data) {
  // Enforce structured schema mapping for M-Taka events
  const payload = {
    event: data.event || "COLLECTED", // e.g., COLLECTED, RECYCLED, REDEEMED
    userId: data.userId,
    deviceId: data.deviceId,
    deviceType: data.deviceType,      // e.g., Smartphone, Feature Phone
    reward: Number(data.reward) || 0, // Green credits
    co2Saved: Number(data.co2Saved) || 0, // In Kgs
    timestamp: new Date().toISOString()
  };

  const newBlock = new Block(
    mtakaChain.chain.length,
    new Date().toISOString(),
    payload
  );

  mtakaChain.addBlock(newBlock);
  return newBlock;
}

function getChain() {
  return mtakaChain.chain;
}

function isValid() {
  // Delegate to the class instance directly
  return mtakaChain.isChainValid();
}

function getTotalCO2Saved() {
  return mtakaChain.chain
    .filter(block => block.data?.event === "RECYCLED")
    .reduce((total, block) => total + (Number(block.data.co2Saved) || 0), 0);
}

function getTotalDevicesRecycled() {
  return mtakaChain.chain.filter(
    block => block.data?.event === "RECYCLED"
  ).length;
}

function getTotalRewards() {
  return mtakaChain.chain.reduce((total, block) => {
    return total + (Number(block.data?.reward) || 0);
  }, 0);
}

function resetChain() {
  mtakaChain.chain = [mtakaChain.createGenesisBlock()];
}

function getTotalUsersRecycled() {
  const uniqueUsers = new Set();
  
  mtakaChain.chain.forEach(block => {
    if (block.data && block.data.event === "RECYCLED" && block.data.userId) {
      uniqueUsers.add(block.data.userId);
    }
  });

  return uniqueUsers.size;
}

function getUserStats(userId) {
  // Filter for blocks belonging to this user that have a valid data object
  const userBlocks = mtakaChain.chain.filter(
    block => block.data && block.data.userId === userId
  );

  const totalDevicesRecycled = userBlocks.filter(
    block => block.data.event === "RECYCLED"
  ).length;

  const totalCo2Saved = userBlocks
    .filter(block => block.data.event === "RECYCLED")
    .reduce((total, block) => total + (Number(block.data.co2Saved) || 0), 0);

  const totalRewards = userBlocks.reduce(
    (total, block) => total + (Number(block.data.reward) || 0), 0
  );

  return {
    userId,
    totalDevicesRecycled,
    totalCo2Saved,
    totalRewards
  };
}


module.exports = { 
  recordEvent, 
  getChain, 
  isValid, 
  getTotalDevicesRecycled, 
  getTotalRewards, 
  getTotalCO2Saved,
  resetChain,
  getUserStats,
  getTotalUsersRecycled
};
