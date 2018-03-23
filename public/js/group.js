var socketController = (function() {
    var groupId = parseInt(document.querySelector('groupId').innerHTML);
    var username = document.querySelector('username').innerHTML;

    return {
        sendMessage: function(message, socket) {
            socket.emit('message', { groupId: groupId,  username: username , message: message});
        }
    };

})();

var UIController = (function() {

    var DOMstrings = {
        messageInput: '.message-input',
    };

    var getNewMessageElement = function() {
        return document.querySelector(DOMstrings.messageInput);
    }

    return {
        addMessageElement: function(username, message) {
            var html = '<tr><td class="message"><span class="todo-title">' + username + ":: " + message + '</span></td></tr>';
            document.querySelector('tbody').insertAdjacentHTML('beforeend', html);

        },
        getMessage: function() {
            return getNewMessageElement().value;
        },
        clearMessageInput: function() {
            getNewMessageElement().value = '';
        },
        getDOMstrings: function() {
            return DOMstrings;
        }
    };
})();

var controller = (function(socketCtrl, UICtrl) {

    var socket = io();

    var setupEventListeners = function() {
        var DOM = UICtrl.getDOMstrings();

        document.querySelector(DOM.messageInput).addEventListener('keypress', function(event) {
            if (!(event.keyCode === 13 || event.which === 13))
                return;

            socketCtrl.sendMessage(UICtrl.getMessage(), socket);
            UICtrl.clearMessageInput();
        });

        var groupId = parseInt(document.querySelector('groupId').innerHTML);
        socket.emit('join', { groupId: groupId });

        socket.on("new_message", function(data) {
            UICtrl.addMessageElement(data.username, data.message);
        });

    };


    return {
        init: function() {
            setupEventListeners();
        }
    };
})(socketController, UIController);

controller.init();
