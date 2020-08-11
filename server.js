var app = require('./app');
var http = require('http');
var chalk = require('chalk');
const config = require('./config/utils');
const server = http.createServer(app);
const io = require('socket.io')(server);


server.listen(process.env.PORT ? process.env.PORT : config.port, () => {
    console.log('%s App & socket is running at http://localhost:%d in %s mode', chalk.green('✓'), app.get('port'), app.get('env'));
    console.log('Press CTRL-C to stop');
});
// server socket
let useronline = [];
io.on('connection', (socket)=> {
    console.log(socket);
    io.sockets.emit('accept-connect', socket);
})