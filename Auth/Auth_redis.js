const redis = require('redis');
const config = require('../config/utils');
const chalk = require('chalk');
//create redis  
const redis_client = redis.createClient ({
    port : config.port_redis,
    host : config.endpoint_redis
    });
//auth redis_client

redis_client.auth(config.auth_redis,(err,rs)=>{
    if(err) console.log(`${chalk.red('✗')} Redis server connect failed `);
    else console.log("%s Redis server connect success", chalk.green('✓'));
})

module.exports = redis_client;