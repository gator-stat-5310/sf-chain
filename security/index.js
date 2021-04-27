const nodeRSA = require('node-rsa');

class Security
{
    constructor(publicKey, privateKey) {
        this.publicKey = publicKey;
        this.privateKey = privateKey;
    }

    encrypt(data){
        this.rsaKeys = new nodeRSA(this.publicKey);
        return this.rsaKeys.encrypt(data,'base64');
    }

    decrypt(data, privateKey){
        this.rsaKeys = new nodeRSA(this.privateKey);
        return this.rsaKeys.decrypt(data, 'utf8');
    }
}

module.exports = Security;