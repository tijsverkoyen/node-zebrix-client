let Zebrix = require("../lib/zebrix");

let client = new Zebrix({
    client: process.env.ZEBRIX_CLIENT,
    username: process.env.ZEBRIX_USERNAME,
    password: process.env.ZEBRIX_PASSWORD
});

client.login(function (data, error) {
    client.options.token = data.token;

    // add a new datasource entry
    client.post(
        "api/datasource",
        {
            "defaults": {
                "foo": "bar"
            }
        },
        function (data, error) {
            console.log(data);

            // update the previously created datasource
            client.post(
                "api/datasource/" + data.id,
                {
                    "defaults": {
                        "foo": "edited-bar"
                    }
                },
                function (data, error) {
                    console.log(data);
                }
            );
        }
    );
});
