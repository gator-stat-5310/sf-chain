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
        const hash = 'todo-hash';
        return new this(timestamp, lastHash, hash, data);
    }
}

Block.genesis()
module.exports = Block;