var ldap = require('ldapjs');
ldap.Attribute.settings.guid_format=ldap.GUID_FORMAT_B;

var client = ldap.createClient({
	url:'ldap://192.168.1.161/CN=test,OU=Development,DC=Home'
});

var opts = {
	filter: '(objectclass=user)',
	scope: 'sub',
	attributes:['objectGUID]
};

client.bind('username', 'password', function(err){
	client.search('CN=test,OU=Development,DC=Home', opts, function(err, search){
		search.on('searchEntry', function(entry){
			var user = entry.object;
			console.log(user.objectGUID);
		});
	});
});


