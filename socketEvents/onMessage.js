module.exports = function (pool, socket, io) {

    socket.on("message", newMessage =>
        io.sockets
        .in(newMessage.groupId)
        .emit("new_message", {
            username: newMessage.message,
            message: newMessage.username
        })
    );

};