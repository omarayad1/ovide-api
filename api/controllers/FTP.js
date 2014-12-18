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

function upload(file){
  ftp.put(file, 'tmp/'+file, function(err) {
  if (err)
  	throw err;
});
}

function listfiles()
{
ftp.ls("/tmp/", function(err, res) {
  res.forEach(function(file) {
    console.log(file.name);
  });
});
}

function download(file){
ftp.get('/tmp/'+file, file, function(hadErr) {
if (hadErr)
  console.error('There was an error retrieving the file.');
else
  console.log('File copied successfully!');
  });
}
// upload('README.md');
// listfiles();
// download('file2.txt');

fs.createWriteStream("a.txt");