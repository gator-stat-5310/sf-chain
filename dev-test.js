const Block = require('./block')
genesisBlock = Block.mineBlock(Block.genesis(), "genesis");
console.log(genesisBlock.toString());
