const elasticsearch = require('elasticsearch');

const client = new elasticsearch.Client({
  hosts: [
    'https://sonlong:Long2012@@@search-lucky-q24cwyooz5gy7osg7zgotkyzue.us-east-1.es.amazonaws.com'
  ]
});

module.exports = client;  