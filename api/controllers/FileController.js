/**
 * FileController
 *
 * @description :: Server-side logic for managing files
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var JSftp = require("jsftp");

var ftp = new JSftp({
    host: process.env.FTP_HOST,
    user: process.env.FTP_USERNAME,
    port: 21, 
    pass: process.env.FTP_PASSWORD
});


ftp.getPutSocket(remotePath, function(err, socket) {
    socket.write(data, function(err) {
        console.log('good');
        socket.end();
    });
});

function upload(file){
  ftp.put(buffer, 'path/to/remote/file.txt', function(hadError) {
  if (!hadError)
    console.log("File transferred successfully!");
});
}




module.exports = {

  create: function (req, res) {
    File.create(req.body).done(function(err, file) {
      res.send(JSON.stringify(file));
    });
	},

   read: function (req, res) {
    File.read(req.body).done(function(err, file) {
      res.send(JSON.stringify(file));
    });
	},

   update: function (req, res) { //fix
    File.read(req.body).done(function(err, file) {
      res.send(JSON.stringify(file));
    });
  },

  delete: function(req, res) {
    File.destroy(req.body).done(function(err) {
      // if(err) {
      //   res.send("Error: "+err);
      // } else {
      //   res.send("File deleted");
      // }
    })
	},

  get_files: function (req, res) {
    
  },

};
