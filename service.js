const Blockchain = require('./blockchain');
const Block = require('./block');

const mtakaChain = new Blockchain();

function recordEvent(data) {
  const newBlock = new Block(
    mtakaChain.chain.length,
    new Date().toISOString(),
    data
  );

  mtakaChain.addBlock(newBlock);

  return newBlock;
}

function getChain() {
  return mtakaChain.chain;
}

function isValid() {
  for (let i=1; 1 < mtakaChain.chain.length; i++) {
    const currentBlock = mtakaChain.chain[i];
    const previousBlock = mtakaChain.chain[i - 1];

    if (currentBlock.hash !== currentBlock.calculateHash()) {
      return false;
    }

    if (currentBlock.previousHash !== previousBlock.hash) {
      return false;
    }
  }
  return true;
}

function getTotalCO2Saved() {
  return mtakaChain.chain
    .filter(block => block.data?.event ===  "RECYCLED")
    .reduce((total, block) => total + block.data.co2Saved, 0);
}

function getTotalDevicesRecycled() {
  return mtakaChain.chain.filter(
    block => block.data && block.data.event ===  "RECYCLED"
  ).length;
}

function getTotalRewards() {
  return mtakaChain.chain.reduce((total, block) => {
    if ( block.data && block.data.reward) {
      return total + block.data.reward;
    }
    return total;
  } , 0);
}

module.exports = { 
  recordEvent, 
  getChain, 
  isValid, 
  getTotalDevicesRecycled, 
  getTotalRewards, 
  getTotalCO2Saved };
