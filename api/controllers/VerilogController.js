/**
 * VerilogController
 *
 * @description :: Server-side logic for managing verilogs
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var AMQP = require("./AMQP.js")


module.exports = {
    compile: function (req, res) {
        AMQP.rpc_send("compile_verilog.compile_to_vvp('" + req.body.filename + "','" + req.body.filename_tb + "')", function(response) {
            res.send(JSON.stringify(response))
        });
	},

    check_syntax: function (req, res) {
        AMQP.rpc_send("lint_verilog.check_for_errors('" + req.body.filename + "')", function(response) {
            res.send(JSON.stringify(response))
        });
    },

    generate_testbench: function (req, res) {
        AMQP.rpc_send("generate_testbench.generate_testbench('" + req.body.filename + "')", function(response) {
            res.send(JSON.stringify(response))
        });
    }
};

