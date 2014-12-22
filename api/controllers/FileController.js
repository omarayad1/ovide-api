/**
 * FileController
 *
 * @description :: Server-side logic for managing files
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */


var FTP = require("./FTP.js")
var JSftp = require("jsftp")
var fs = require("fs");

module.exports = {

    // Create Function should do the following:
    // *1) Create empty files (file)
    // *2) Upload empty file to FTP
    // *3) Add empty file to DB

    create: function (req, res) {

        fs.createWriteStream('tmp/' + req.body.filename);
        File.create({filename:req.body.filename}).exec(function(err, file) {
            res.send(JSON.stringify(req.body.filename));
        });
        FTP.upload(req.body.filename);
    },

    // Read function should do the following:
    // 1) *Get file from FTP
    // 3) Read attribs from DB

    read: function (req, res) {
        // File.read(req.body).done(function(err, file) {
          // res.send(JSON.stringify(file));
        // });
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:9000');
        FTP.download(req.body.filename, function (){
            fs.readFile('./tmp/' + req.body.filename, function(err, data) {
                if (err) console.log(err)
                else res.send(data)
            })
        });
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
        File.destroy(req.body.filename).done(function(err) {
            if(err) {
                res.send("Error: " + err);
            } else {
                res.send("File deleted");
            }
        });
        FTP.del_file(req.body.filename);
    },

    // Get_files function should do the following:
    // 1) Query DB for files

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
