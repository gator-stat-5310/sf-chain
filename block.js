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
}

module.exports = Block;