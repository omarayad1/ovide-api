/**
 * FileController
 *
 * @description :: Server-side logic for managing files
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */


var JSftp = require("jsftp");
var fs = require("fs");


var ftp = new JSftp({
    host: process.env.FTP_HOST,
    user: process.env.FTP_USERNAME,
    port: 21, 
    pass: process.env.FTP_PASSWORD
});


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

function del_file(file){
  ftp.raw.dele(/tmp/+file, function(err, data) {
    if (err)
        throw err;

    console.log(data.text);
});
}


module.exports = {

  // Create Function should do the following:
  // *1) Create empty files (file + TB)  
  // *2) Upload empty file to FTP
  // *3) Add empty file to DB

  create: function (req, res) {

    fs.createWriteStream(req.params.id);
    File.create({filename:req.params.id}).exec(function(err, file) {
    res.send(JSON.stringify(req.params.id));
    });
    upload(req.params.id);
      
	},

  // Read function should do the following:
  // 1) *Get file from FTP
  // 3) Read attribs from DB

   read: function (req, res) {
    // File.read(req.body).done(function(err, file) {
      // res.send(JSON.stringify(file));
    // });
    download(req.params.id);
	},

  // Update function should do the following:
  // 1) Create empty file  
  // 2) Upload empty file to FTP
  // 3) Store empty file on DB
   update: function (req, res) { 
    File.read(req.body).done(function(err, file) {
      res.send(JSON.stringify(file));
    });
  },

  // Delete Function should do the following:
  // 1) *Destroy file entry on DB 
  // 2) *Delete file + TB from FTP
  // Should check if file exists on server before attempting delete

  delete: function(req, res) {
    File.destroy(req.params.id).done(function(err) {
      if(err) {
        res.send("Error: "+err);
      } else {
        res.send("File deleted");
      }
    })
      del_file(req.params.id);
	},

  // Get_files function should do the following:
  // 1) Query DB for files

  get_files: function (req, res) {
    
  },

};
