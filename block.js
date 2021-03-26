class Block {
    constructor(timeStamp, lastHash, hash, data) {
        this.timeStamp = timeStamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
    } 
    toString() {
    `Block-
    TimeStamp: ${this.timeStamp}
    LastHash : ${this.lastHash.substring(0,10)}
    Hash     : ${this.hash.substring(0,10)}
    Data     : ${this.data}`;
    }
	static genesis() {
		return new this('Genesis time','-----','fir57-h45h', []);
		
	}
}

Block.genesis()
module.exports = Block;