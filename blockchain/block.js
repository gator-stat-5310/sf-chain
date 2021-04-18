const SHA256 = require('crypto-js/sha256');
const { DIFFICULTY, MINE_RATE } = require('../config');


class Block {
    constructor(timeStamp, lastHash, hash, data, nonce, difficulty) {
        this.timeStamp = timeStamp; //current time
        this.lastHash = lastHash; //last hash of the block
        this.hash = hash; // hash_fn(data+last_hash)
        this.data = data; // real information
        this.nonce = nonce;
        this.difficulty = difficulty || DIFFICULTY;
    }

    toString() {
        return `Block -
    TimeStamp : ${this.timeStamp}
    LastHash  : ${this.lastHash.substring(0, 10)}
    Hash      : ${this.hash.substring(0, 10)}
    Nonce     : ${this.nonce}
    Difficulty: ${this.difficulty} 
    Data      : ${this.data}`;
    }
    static genesis() {
        return new this('Genesis time', '-----', 'fir57-h45h', [], 0, DIFFICULTY);
    }

    static mineBlock(lastBlock, data) {
        let hash, timestamp;
        const lastHash = lastBlock.hash;
        let { difficulty } = lastBlock;
        let nonce = 0;

        do {
            nonce++;
            timestamp = Date.now();
            difficulty = Block.adjustDifficulty(lastBlock, timestamp);
            hash = Block.hash(timestamp, lastHash, data, nonce, difficulty);
        } while (hash.substring(0, difficulty) !== '0'.repeat(difficulty));

        return new this(timestamp, lastHash, hash, data, nonce, difficulty);
    }

    static hash(timeStamp, lashHash, data, nonce, difficulty) {
        return SHA256(`${timeStamp}${lashHash}${data}${nonce}${difficulty}`).toString();
    }

    static blockHash(block) {
        const { timeStamp, lastHash, data, nonce, difficulty } = block;
        return Block.hash(timeStamp, lastHash, data, nonce, difficulty);
    }

    static adjustDifficulty(lastBlock, currentTime) {
        let { difficulty } = lastBlock;
        difficulty = lastBlock.timeStamp + MINE_RATE > currentTime ?
            difficulty + 1 : difficulty - 1;
        return difficulty;
    }
}

module.exports = Block;