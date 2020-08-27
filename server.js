var app = require('./app');
var http = require('http');
var chalk = require('chalk');
const config = require('./config/utils');
const server = http.createServer(app);
const io = require('socket.io')(server);
const userController = require('./controllers/User.controller');
const RoomChat = require('./models/RoomChat.js');


server.listen(process.env.PORT ? process.env.PORT : config.port, () => {
    console.log('%s App & socket is running at http://localhost:%d in %s mode', chalk.green('✓'), app.get('port'), app.get('env'));
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
let users = {};
io.on('connection', (socket) => {
    //login
    console.log('co new connect' , socket.id);
    socket.on('online', async (data) => { //data: {user_id}
        // console.log('socket connection :', socket);
        console.log({ data });
        try {
            users[data.user_id] = socket.id;
            await userController.setActive(data.user_id);
            let useronlines = await userController.getUserOnline();
            console.log(users);
            io.sockets.emit('list-user', useronlines);
        } catch (error) {
            console.log(error);
        }
    })
    //logout
    socket.on('logout', async (data) => {
        try {
            delete users[data.user_id];
            await userController.unSetActive(data.user_id);
            let useronlines = await userController.getUserOnline();
            io.sockets.emit('list-user', useronlines);
        } catch (error) {
            console.log(error);
        }
    })
    socket.on('disconnect', async () => {
        console.log('socket disconnect: ', socket.id);
        try {
            let key = checkIsExistedUser(users, socket.id);
            if (key) {
                delete users[key];
                await userController.unSetActive(key);
                let useronlines = await userController.getUserOnline();
                console.log(users);
                io.sockets.emit('list-user', useronlines);
            }

        } catch (error) {
            console.log(error);
        }
    })
})