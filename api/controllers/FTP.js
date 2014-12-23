
var JSftp = require("jsftp");
var fs = require("fs");

var ftp = new JSftp({
    host: process.env.FTP_HOST,
    user: process.env.FTP_USERNAME,
    port: 21, 
    pass: decodeURIComponent(process.env.FTP_PASSWORD)
});

module.exports = {

  upload: function(file){
  ftp.put('./tmp/' + file, 'ovide-static/' + file, function(err) {
  if (err)
  	console.log(err);
  });
  },

  download: function(file,callback){
  
    ftp.get('ovide-static/' + file, './tmp/' + file, function(hadErr) {
    if (hadErr)
     console.log(hadErr);
    else
      callback()
     });
  },

  rename: function(file_old,file_new){
  
    ftp.rename('ovide-static/' + from, 'ovide-static/' + to, function(hadErr) {
    if (hadErr)
     console.log(hadErr);
     });
  },

  del_file: function(file){
  ftp.raw.dele('ovide-static/' + file, function(err, data) {
  if (err)
  throw err;
  console.log(data.text);
  });
}

}

