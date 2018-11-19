let Zebrix = require("../lib/zebrix");

let client = new Zebrix({
    client: process.env.ZEBRIX_CLIENT,
    username: process.env.ZEBRIX_USERNAME,
    password: process.env.ZEBRIX_PASSWORD
});

client.login(function (data, error) {
    client.options.token = data.token;

    // list all current datasources
    client.get("api/datasource", function(data, error) {
        console.log(data);
    });
});
