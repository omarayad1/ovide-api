/**
 * VerilogController
 *
 * @description :: Server-side logic for managing verilogs
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

 var AMQP = require("./AMQP.js")


module.exports = {
   compile: function (req, res) {
   AMQP.rpc_send("lint_verilog.check_for_errors('batee5.v')", function(msg){console.log("hi from inside %s",msg)})

	},

   check_syntax: function (req, res) {

	},

   generate_testbench: function (req, res) {

	}
};

