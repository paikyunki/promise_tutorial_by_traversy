/** @member {Object} */
var fs = require('graceful-fs');
var buf = fs.readFileSync('data.json', 'utf8');
console.log(buf);