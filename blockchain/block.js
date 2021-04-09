const SHA256 = require('crypto-js/sha256');

class Block {
    constructor(timeStamp, lastHash, hash, data) {
        this.timeStamp = timeStamp; //current time
        this.lastHash = lastHash; //last hash of the block
        this.hash = hash; // hash_fn(data+last_hash)
        this.data = data; // real information
    } 

    toString() {
    return `Block -
    TimeStamp: ${this.timeStamp}
    LastHash : ${this.lastHash.substring(0,10)}
    Hash     : ${this.hash.substring(0,10)}
    Data     : ${this.data}`;
    }
	static genesis() {
		return new this('Genesis time','-----','fir57-h45h', []);
	}

    static mineBlock(lastBlock, data) {
        const timestamp = Date.now();
        const lastHash = lastBlock.hash;
        const hash = Block.hash(timestamp, lastHash, data);
        return new this(timestamp, lastHash, hash, data);
    }

    static hash(timeStamp, lashHash, data) {
        return SHA256(`${timeStamp}${lashHash}${data}`).toString();
    }

    static blockHash(block) {
        const { timeStamp, lastHash, data } = block;
        return Block.hash(timeStamp, lastHash, data);
    }
}

module.exports = Block;