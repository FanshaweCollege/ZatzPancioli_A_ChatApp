import ChatMessage from './modules/ChatMessage.js';

const socket = io();

function setUserId({sID, message}) {
    //debugger;
    console.log('connected', sID, message);
    vm.socketID = sID;
}

function appendMessage(message) {
    vm.messages.push(message);
    document.querySelector('.sound').play();
}

function appendConnect(obj){
    console.log(obj);
    vm.notes.push(obj.message.name + " has connected!");
    vm.users = obj.userList;
}

function appendDisconnect(obj){
    if(obj.message.name !=""){
    console.log(obj);
    vm.notes.push(obj.message.name + " has disconnected!");
    console.log(obj.userList);
    vm.users = obj.userList;
    }
}

const vm = new Vue({
    data: {
        socketID: "",
        nickname: "",
        message: "",
        messages: [],
        showNick: true,
        users: [],

    },

    methods: {

        dispatchMessage() {
            // send a chat message
            socket.emit('chat message', { content: this.message, name: this.nickname || "Anonymous"} );

            this.message = "";
        },

        changeName(){
            if(this.nickname != ""){
            socket.emit('userConnect', { name: this.nickname } );
            this.showNick=false;
            }
        },

        disconnect(){
            socket.emit('userDisconnect', { name: this.nickname } );
            window.location.replace('/loggedout');
        }

    },

    created: function(){
        this.showNick = true;
    },

    components: {
        newmessage: ChatMessage
    }

}).$mount("#app");

socket.addEventListener('connected', setUserId);
socket.addEventListener('chat message', appendMessage);