
var JSftp = require("jsftp");
var fs = require("fs");

var ftp = new JSftp({
    host: process.env.FTP_HOST,
    user: process.env.FTP_USERNAME,
    port: 21, 
    pass: process.env.FTP_PASSWORD
});

// Auth done automatically, no need for this now?
/*function auth()
{
ftp.auth('username', 'pass', function(hadErr) {
if (hadErr)
console.log("Error in Authentication")
	throw hadErr;
});
}*/

// module.exports.ftp = ftp;

module.exports = {

  upload:function(file){
  ftp.put('tmp/'+file, '/ovide-static/'+file, function(err) {
  if (err)
  	console.log(err);
  });
  },

  download:function(file){
  ftp.get('/ovide-static/'+file, 'tmp/' +file, function(hadErr) {
  if (hadErr)
   console.error('There was an error retrieving the file.');
  else
   console.log('File copied successfully!');
   });
  },

  del_file:function(file){
  ftp.raw.dele(/ovide-static/+file, function(err, data) {
  if (err)
  throw err;
  console.log(data.text);
  });
}

}

