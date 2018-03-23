module.exports = function(pool, socket, io) {

    socket.on('message', function(newMessage) {
        var groupId = newMessage.groupId;

        var username = newMessage.username;
        var message = newMessage.message;

        io.sockets.in(groupId).emit('new_message', { username: username, message: message });

    });

};
