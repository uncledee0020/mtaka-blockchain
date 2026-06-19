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

module.exports = { recordEvent, getChain };
