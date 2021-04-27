const express = require('express');
const NodeRSA = require('node-rsa');

const app = express();
const ldap = require('ldapjs');


// app.listen(3000, function (){
//     console.log("authenticate server started");
// });

class LDAPService
{
    constructor(urlPath= 'ldap://127.0.0.1:10389') {
        this.client = this.securedConnection('ldaps', './server/ldap.pem');
    }

    normalConnection(urlPath= 'ldap://127.0.0.1:10389'){
        this.client = ldap.createClient({
        url:urlPath
    });
    }

    securedConnection(protocol, caPEMPath, host, ldapport) {
        const opts = {
            ca: [fs.readFileSync(caPEMPath)],
            host: '127.0.0.1',
            reconnect: true,
            rejectUnauthorized: false // for self-signed
        };

        const client = ldap.createClient({
            url: protocol + host + ":" + ldapport,
            tlsOptions: opts
        });
        return client;
    };

    authenticateDN(username, password)
    {
        this.client.bind(username, password, function (err){
            if (err)
            {
                console.log("error in connection "+ err);
                throw new TypeError('failed to connect');
            }
            console.log("admin authentication successful");
        });
    }

    securedAuthenticationDN(){
        const controls = this.client.controls;

        this.client.starttls(opts, controls, function (err, res) {

        if (err)
        {
            console.log("error in connection "+ err);
            throw new TypeError('failed to connect');
        }

        this.client.bind(username, password, function (err){
            if (err)
            {
                console.log("error in connection "+ err);
                throw new TypeError('failed to connect');
            }
        });
        console.log.info("StartTTLS connection established.");
    });
    }



    searchDN(searchString='ou=users,ou=system', optFilter='(objectClass=*)', optScope= 'sub', optAttributes=['cn', 'userCertificate', 'userPKCS12'])
    {
        //filter:(&(uid=1)(cn=john)) and condition
        //filter:(|(uid=1)(cn=john)) or condition

        // const opts = {
        //     filter: '(objectClass=*)',
        //     scope: 'sub',
        //     attributes: ['cn']
        // };

        const opts = {
            filter: optFilter,
            scope: optScope,
            attributes: optAttributes
        };
        this.searchUser(searchString, opts);
    }

    searchUser(searchString='ou=users,ou=system', opts){
        this.client.search(searchString, opts, (err, res) => {
            if (err){
                console.log("error searching a dn");
                throw new TypeError('failed to connect');
            }

            res.on('searchEntry', (entry) => {
                console.log('entry: ' + JSON.stringify(entry.object));
            });
            res.on('searchReference', (referral) => {
                console.log('referral: ' + referral.uris.join());
            });
            res.on('error', (err) => {
                console.error('error: ' + err.message);
            });
            res.on('end', (result) => {
                console.log('status: ' + result.status);
            });
        });
    }

    addUser(userPathString, emailsString='gks007@shsu.edu')
    {
        const nodeRSA = new NodeRSA({b:1024});
        const public_key = nodeRSA.exportKey('public');
        const private_key = nodeRSA.exportKey('private');
        const signature = nodeRSA.sign(userPathString, 'base64', 'base64');
        const verification = nodeRSA.verify(userPathString, signature, 'base64', 'base64');

        const entry = {
            sn: 'sur',
            //email:  emailsString,
            objectClass: 'inetOrgPerson',
            //userCertificate:public_key
            userPKCS12:public_key
        };
        //console.log(entry);
        console.log("add user: "+userPathString);

        this.client.add(userPathString, entry, (err) => {
            if (err)
            {
                console.log("failed to add a user")
                throw new TypeError('failed to connect');
            }
            console.log("user added: "+ userPathString);
            console.log("public key added: "+ public_key);
            console.log("private key added: "+ private_key);
            console.log("signature: " + signature);
            console.log("verification: " + verification);
        });

        return private_key;
    }

    deleteUser(userString='cn=foo, o=example'){
        this.client.del(userString, (err) => {
            if (err){
                throw TypeError('failed to delete user: '+userString);
            }
            console.log("user delted successfully: "+ userString);
            return true;
        });
    }

    //operatorType could be add, replace, delete
    modifyUser(userString='cn=foo, o=example', operatorType='add', key='', values=['']){
        const change = new ldap.Change({
            operation: operatorType,
            modification: {
                key: values
            }
        });

        this.client.modify(userString, change, (err) => {
            if (err){
                return TypeError("failed to modify: "+ userString);
            }
        });
    }
    modifyUserDN(oldUserString, newUserString){
        this.client.modifyDN(oldUserString, newUserString, (err) => {
            if (err){
                return TypeError("failed to modify userDN to: "+ newUserString);
            }
        });
    }
}

module.exports = LDAPService;