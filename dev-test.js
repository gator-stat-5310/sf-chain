const Block = require('./block')
genesisBlock = Block.mineBlock(Block.genesis(), "genesis");
firstBlock = Block.mineBlock(genesisBlock, "first");
secondBlock = Block.mineBlock(firstBlock, "second");

console.log(genesisBlock.toString());
console.log(firstBlock.toString());
console.log(secondBlock.toString());
