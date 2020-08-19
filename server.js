var app = require('./app');
var http = require('http');
var chalk = require('chalk');
const config = require('./config/utils');
const server = http.createServer(app);
const io = require('socket.io')(server);
const userController = require('./controllers/User.controller');
const { domainToASCII } = require('url');


server.listen(process.env.PORT ? process.env.PORT : config.port, () => {
    console.log('%s App & socket is running at http://localhost:%d in %s mode', chalk.green('✓'), app.get('port'), app.get('env'));
    console.log('Press CTRL-C to stop');
});
// server socket
let users = {};
io.on('connection', (socket) => {
    console.log('socket connection :', socket);
    io.sockets.emit('accept-connect', socket);
    //login    
    socket.on('online', async (data) => { //data: {user_id}
        users[data.user_id] = socket.id;
        await userController.setActive(data.user_id);
        let useronlines = await userController.getUserOnline();
        console.log(users);
        io.sockets.emit('list-user', useronlines);
    })
    //logout
    socket.on('logout', async (data) => {
        delete users[data.user_id];
        await userController.unSetActive(data.user_id);
        let useronlines = await userController.getUserOnline();
        io.sockets.emit('list-user', useronlines);
    })
    socket.on('disconnect', async () => {
        console.log('socket disconnect: ', socket.id);
    })
})