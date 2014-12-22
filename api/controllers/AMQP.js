var q = 'rpc_queue';

var url = process.env.RABBIT_URL;
var amqp = require('amqplib');
var basename = require('path').basename;
var when = require('when');
var defer = when.defer;
var uuid = require('node-uuid');


module.exports = {

	rpc_send: function(n,callback){
		amqp.connect(url).then(function(conn) {
			return when(conn.createChannel().then(function(ch) {
				var answer = defer();
				var corrId = uuid();
				function maybeAnswer(msg) {
					if (msg.properties.correlationId === corrId) {
						answer.resolve(msg.content.toString());
					}
				}
				var ok = ch.assertQueue('', {exclusive: true})
				.then(function(qok) { return qok.queue; });
				ok = ok.then(function(queue) {
					return ch.consume(queue, maybeAnswer, {noAck: true})
					.then(function() { return queue; });
				});
				ok = ok.then(function(queue) {
					console.log(' [x] Requesting %s', n.toString());
					ch.sendToQueue(q, new Buffer(n.toString()), {
						correlationId: corrId, replyTo: queue
					});
					return answer.promise;
				});
				return ok.then(function(msg) {
					callback(msg);
				});
			})).ensure(function() { conn.close(); });
		}).then(null, console.warn);
	}

}
