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
        var fn = req.body.filename;
        AMQP.rpc_send("compile_verilog.compile_to_vvp('" + fn + "','" + fn.slice(0,fn.length-2) + "_tb.v')", function(response) {
            res.send(JSON.stringify(response))
        });

    },

// - Return log message from AMQP as JSON directly
    check_syntax: function (req, res) {
        AMQP.rpc_send("lint_verilog.check_for_errors('" + req.body.filename + "')", function(response) {
            res.send(JSON.stringify(response))
        });
    },

    get_output: function (req, res) {
        AMQP.rpc_send("vvp_utils.get_output('" + req.body.filename + "')", function(response) {
            res.send(JSON.stringify(response))
        });
    },

    get_wave: function (req, res) {
        AMQP.rpc_send("vvp_utils.get_wave('" + req.body.filename + "')", function(response) {
            res.send(JSON.stringify(response))
        });
    },

// - Ask MQ server to generate testbench (which should be uploaded on FTP automatically)
// - Retrieve file from FTP
// - Output as JSON

   generate_testbench: function (req, res) {


        var fn = req.body.filename;
        AMQP.rpc_send("generate_testbench.generate_testbench('" + fn + "')", function(response) {
            res.send(JSON.stringify(response))
        
         var tb_name = fn.slice(0,fn.length-2) + '_tb.v';

        File.create({filename:tb_name}).exec(function(err, file) {
                res.send(JSON.stringify(tb_name));
        });

         // FTP.download(tb_name);

         // var tb_str = fs.readFileSync('ovide-static/' + tb_name, "utf8");;

         // res.send(JSON.stringify(tb_str));
    });
  }
};

