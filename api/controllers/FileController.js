/**
 * FileController
 *
 * @description :: Server-side logic for managing files
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */


// TODO - Create generic file to output JSON function?

var FTP = require("./FTP.js")
var JSftp = require("jsftp")
var fs = require("fs");

var ftp = new JSftp({
    host: process.env.FTP_HOST,
    user: process.env.FTP_USERNAME,
    port: 21, 
    pass: decodeURIComponent(process.env.FTP_PASSWORD)
});

module.exports = {

  // Create Function does the following:
  // 1) Create empty file  
  // 2) Add empty file to DB
  // 3) Upload empty file to FTP

  create: function (req, res) {
        fs.createWriteStream('tmp/' + req.body.filename);
        File.create({filename:req.body.filename}).exec(function(err, file) {
            res.send(JSON.stringify(req.body.filename));
        });
        FTP.upload(req.body.filename);      
    },

  // Read function does the following:
  // 1) Get file from FTP
  // 2) Output file as JSON
        
    read: function (req, res) {
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:9000');
	    console.log(req.params.id);
      FTP.download(req.params.id, function (){
            fs.readFile('./tmp/' + req.params.id, function(err, data) {
                if (err) console.log(err);
                else {
                  res.send(data);
                }
            })
        });
},

  // Update function does the following:
  // 1) Write string as file
  // 2) upload file to FTP
   update: function (req, res) { 
    // File.read(req.body).done(function(err, file) {
      // res.send(JSON.stringify(file));
    // });

    fs.writeFile('./tmp/' + req.body.filename, req.body.file_content, function (err) {
    if (err) return console.log(err);
    console.log('File updated');
    });
    FTP.upload(req.body.filename);

  },

  rename: function(req,res) {
    FTP.rename(req.body.filename_old,req.body.filename_new);
  },


  // Delete Function does the following:
  // 1) Destroy file entry on DB 
  // 2) Delete file from FTP
  // ADD - Should check if file exists on server before attempting delete

    delete: function(req, res) {
        File.destroy(req.body.filename).done(function(err) {
            if(err) {
                res.send("Error: " + err);
            } else {
                FTP.del_file(req.body.filename);
                res.send("File deleted");
            }
        });
    },

  // Get_files function does the following:
  // 1) Query FTP for files

    getFiles: function (req, res) {
        files = [];
        ftp.ls("ovide-static/", function(err, ftpres) {
            ftpres.forEach(function(file) {
                files.push(file.name);
            });
            res.send(JSON.stringify(files));
        });
    }


};
