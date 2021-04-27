

const clietConnection = authenticateDN('uid=admin,ou=system', 'secret');
//searchDN(clietConnection);
addUser(clietConnection, 'cn=dad,ou=users,ou=system');
searchDN(clietConnection);