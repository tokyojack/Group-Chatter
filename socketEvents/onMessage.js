module.exports = function (pool, socket, io) {

    // When a message is sent, it get's everyone in the group by ID and emit's a new_message
    socket.on("message", newMessage =>
        io.sockets
        .in(newMessage.groupId)
        .emit("new_message", {
            username: newMessage.message,
            message: newMessage.username
        })
    );

};