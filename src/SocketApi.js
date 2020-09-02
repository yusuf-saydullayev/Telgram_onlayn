const socketio = require('socket.io');
const moment = require("moment");
const io = socketio();
const users = [];

io.sockets.on("connection", (socket) => {
    console.log("Foydalanuvchi kirdi");
    const bot = "SERVEDAN";

    socket.on("joinRoom", ({ username, room }) => {
        const user = userJoin(socket.id, username, room);
        socket.join(user.room)

        socket.emit("message", formatMessage(bot, "Xush kelibsiz"));
        /* Brocast */
        socket.broadcast.to(user.room).emit("message", formatMessage("USER", `${user.username} kirdi`));

        // foydalamuvchilarni honaga yuborish     
        io.to(user.room).emit("roomUser", {
            room: user.room,
            users: getRoomUsers(user.room)
        })

    })

    socket.on("chatMessage", (msg) => {
        const user = getUser(socket.id);
        io.to(user.room).emit("message", formatMessage(user.username, msg))
    })

    /* disconect */
    socket.on("disconnect", () => {
        const user = userExit(socket.id);
        if (user) {
            io.to(user.room).emit("message", formatMessage(bot, `${user.username} chiqib ketti`))

            // foydalamuvchilarni honaga yuborish    
            io.to(user.room).emit("roomUser", {
                room: user.room,
                users: getRoomUsers(user.room)
            })
        }
    })

})

// Voxtlari 
function formatMessage(username, text) {
    return {
        username,
        text,
        time: moment().format('LLL')
    }
}

// Users enter room
function userJoin(id, username, room) {
    const user = { id, username, room };
    users.push(user);
    return user;
}

// User id
function getUser(id) {
    return users.find(user => user.id === id)
}

// User disconnect 
function userExit(id) {
    const index = users.findIndex(user => user.id === id);
    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
}

// User enter in to room
function getRoomUsers(room) {
    return users.filter(user => user.room === room)
}

module.exports = io