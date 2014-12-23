/**
 * VerilogController
 *
 * @description :: Server-side logic for managing verilogs
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

 var AMQP = require("./AMQP.js")
 var fs = require('fs')


module.exports = {

// - Return log message from AMQP as JSON directly
   compile: function (req, res) {
        AMQP.rpc_send("compile_verilog.compile_to_vvp('" + req.body.filename + "','" + req.body.filename_tb + "')", function(response) {
            res.send(JSON.stringify(response))
        });

    },

// - Return log message from AMQP as JSON directly
    check_syntax: function (req, res) {
        AMQP.rpc_send("lint_verilog.check_for_errors('" + req.body.filename + "')", function(response) {
            res.send(JSON.stringify(response))
        });
    },

// - Ask MQ server to generate testbench (which should be uploaded on FTP automatically)
// - Retrieve file from FTP
// - Output as JSON

   generate_testbench: function (req, res) {
        AMQP.rpc_send("generate_testbench.generate_testbench('" + req.body.filename + "')", function(response) {
            res.send(JSON.stringify(response))
        
         var tb_name = req.params.id + '_tb.v';

         FTP.download(tb_name);

         var tb_str = fs.readFileSync('ovide-static/' + tb_name, "utf8");;

         res.send(JSON.stringify(tb_str));
    });
  }
};

