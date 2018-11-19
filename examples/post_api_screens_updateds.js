let Zebrix = require("../lib/zebrix");

let client = new Zebrix({
    client: process.env.ZEBRIX_CLIENT,
    username: process.env.ZEBRIX_USERNAME,
    password: process.env.ZEBRIX_PASSWORD
});

client.login(function (data, error) {
    client.options.token = data.token;

    // update screens that use a datasource
    client.post("api/screens/updateds", function(data, error) {
        console.log(data);
    });
});
