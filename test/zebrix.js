/*jshint esversion: 6 */
"use strict";

let assert = require("assert");
let Zebrix = require("../lib/zebrix");
const VERSION = require("../package.json").version;

describe("Zebrix", function () {
    describe("Constructor", function () {
        let defaults = {};
        before(function () {
            defaults = {};
        });

        it("create new instance", function () {
            let client = new Zebrix();
            assert(client instanceof Zebrix);
        });

        it("auto constructs", function () {
            let client = Zebrix();
            assert(client instanceof Zebrix);
        });

        it("accepts and overrides options", function () {
            let options = {
                user: "user",
                foo: "bar",
                request_options: {
                    headers: {
                        "Accept": "application/json"
                    }
                }
            };

            let client = new Zebrix(options);

            assert(client.options.hasOwnProperty("foo"));
            assert.equal(client.options.foo, options.foo);

            assert.equal(client.options.user, options.user);

            assert.equal(
                client.options.request_options.headers.Accept,
                options.request_options.headers.Accept);
        });

        describe("Methods", function () {
            describe("get", function () {
                let client;
                before(function () {
                    client = new Zebrix({});
                });

                it("method exists", function () {
                    assert.equal(typeof client.get, "function");
                });

            });

            describe("post", function () {
                let client;
                before(function () {
                    client = new Zebrix({});
                });

                it("method exists", function () {
                    assert.equal(typeof client.post, "function");
                });

            });

            describe("login", function () {
                let client;
                before(function () {
                    client = new Zebrix({
                        client: process.env.ZEBRIX_CLIENT,
                        username: process.env.ZEBRIX_USERNAME,
                        password: process.env.ZEBRIX_PASSWORD,
                    });
                });

                it("method exists", function () {
                    assert.equal(typeof client.login, "function");
                });

                it("response contains a token", function (done) {
                    client.login(function (data, error) {
                        assert.equal(typeof data.token, "string");
                        done();
                    });
                });

            });
        });
    });
});
