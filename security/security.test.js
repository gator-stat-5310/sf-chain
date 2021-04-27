const nodeRSA = require('node-rsa');
const Security = require('../security');


const nodeRSAInstance = new nodeRSA({b:1024});
const public_key = nodeRSAInstance.exportKey('public');
console.log(public_key);
const private_key = nodeRSAInstance.exportKey('private');
console.log(private_key);

//const encryptedData = encrypt("hello, The quick brown fox jumps over a lazy dog!", nodePKIS.publicKey)

//console.log(encryptedData);

//console.log(decrypt(encryptedData, nodePKIS.privateKey));

// const public_key = nodePKIS.exportKey('public');
// console.log(public_key);
// const private_key =nodePKIS.exportKey('private');
// console.log(private_key);
//
const securityInstance = new Security(public_key, private_key);
const encryptedData = securityInstance.encrypt("hello, The quick brown fox jumps over a lazy dog!")

console.log(encryptedData);

console.log(securityInstance.decrypt(encryptedData));