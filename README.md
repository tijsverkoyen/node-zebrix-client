# Zebrix for Node.js

An client library for the [Zebrix REST](http://www.zebrix.net/documentation/doku.php?id=en:zebrixrestapi).

```javascript
let Zebrix = require('node-zebrix-client');

let client = new Zebrix({
    client: process.env.ZEBRIX_CLIENT,
    username: process.env.ZEBRIX_USERNAME,
    password: process.env.ZEBRIX_PASSWORD
});

client.login(function (data, error) {
    // set the token
    client.options.token = data.token;
    
    // list the datasources
    client.get('api/datasource', function(data, error) {
        console.log(data);
    });
});
```

## Installation

`npm install node-zebrix-client`

## Requests

You now have the ability to make GET and POST requests against the API via the convenience methods.

```javascript
client.get(path, body, callback);
client.post(path, body, callback);
```
