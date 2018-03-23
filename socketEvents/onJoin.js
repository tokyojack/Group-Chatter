module.exports = function(socket) {

    socket.on('join', function(data) {
        socket.join(data.groupId); // We are using room of socket io
    });

};
