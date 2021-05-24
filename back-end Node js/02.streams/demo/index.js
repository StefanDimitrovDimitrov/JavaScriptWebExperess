const events = require('events');

const publisher = new events.EventEmitter();

function raiseEvents(){
    console.log('before');
    publisher.emit('ping', 'Hello Ping');
    console.log('after');
    publisher.emit('ping', 'Hello Ping2');

    publisher.emit('pong', 5, 8)
}


module.exports = {
    raiseEvents,
    publisher,
}