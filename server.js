var app = require('./app');
var http = require('http');
const server = http.createServer(app);
var chalk = require('chalk');
const config = require('./config/utils');

const userController = require('./controllers/User.controller');
const messageConstroller = require('./controllers/message.controller');
const io = require('socket.io')(server);

server.listen(process.env.PORT ? process.env.PORT : config.port, () => {
    console.log('%s App & socket is running at http://localhost:%d in %s mode', chalk.green('✓'), Number(process.env.PORT ? process.env.PORT : config.port), app.get('env'));
    console.log('Press CTRL-C to stop');
});
function checkIsExistedUser(object, socketId) {
    for (const [key, value] of Object.entries(object)) {
        if (value === socketId) {
            return key;
        }
    }
    return false;
}
// server socket
let userSocket = {};
io.on('connection', (socket) => {
    socket.on('online', async (data) => { //data: {user_id}
        try {
            userSocket[data.user_id] = socket.id;
            await userController.setActive(data.user_id);
            let useronlines = await userController.getUserOnline();
            io.sockets.emit('list-user', useronlines);
        } catch (error) {
            console.log(error);
        }
    })
    // join room when change page
    socket.on("setRoom", (data) => {
        socket.join(`${data.id_room}`);

    })
    // out room when change page
    socket.on('outRoom', (data) => {
        socket.leave(`${data.id_room}`);
    })
    // send-message
    socket.on('client-send-message', (data) => {
        io.to(data.id_room).emit("server-send-message", data);
    })
    // typing....
    socket.on('focusin', (data) => {
        socket.broadcast.to(data.id_room).emit("typing", "typing...");
    })
    socket.on('focusout', (data) => {
        socket.broadcast.to(data.id_room).emit("focusout");
    })
    // logout
    socket.on('logout', async (data) => {
        try {
            delete userSocket[data.user_id];
            await userController.unSetActive(data.user_id);
            let useronlines = await userController.getUserOnline();
            io.sockets.emit('list-user', useronlines);
        } catch (error) {
            console.log(error);
        }
    })
    socket.on('disconnect', async () => {
        try {
            let key = checkIsExistedUser(userSocket, socket.id);
            if (key) {
                await userController.unSetActive(String(key));
                await userController.unSetActive(String(key));
                let useronlines = await userController.getUserOnline();
                io.sockets.emit('list-user', useronlines);
            }
        } catch (error) {
            console.log(error)
        }
    })
})