var DB_USER = process.env.DB_USER; 
var DB_PASS = process.env.DB_PASS;
var DB_NAME = process.env.DB_NAME;

module.exports = {
	url : 'mongodb://'+DB_USER+':'+DB_PASS+'@ds141328.mlab.com:41328/'+DB_NAME
}