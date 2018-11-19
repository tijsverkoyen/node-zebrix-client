/*jshint esversion: 6 */
"use strict";

let assert = require("assert");
let Zebrix = require("../lib/zebrix");
const VERSION = require("../package.json").version;

describe("Zebrix", function () {
    describe("Constructor", function () {
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
                options.request_options.headers.Accept
            );
        });
    });

    describe("Methods", function () {
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

        describe("get", function () {
            let client;
            before(function (done) {
                client = new Zebrix({
                    client: process.env.ZEBRIX_CLIENT,
                    username: process.env.ZEBRIX_USERNAME,
                    password: process.env.ZEBRIX_PASSWORD,
                });

                client.login(function (data, error) {
                    client.options.token = data.token;
                    done();
                });
            });

            it("method exists", function () {
                assert.equal(typeof client.get, "function");
            });

            describe("api/datasource", function () {
                it("returns sources", function (done) {
                    client.get("api/datasource", function (data, error) {
                        for (let source of data) {
                            assert.equal(typeof source.id, "number");
                            assert.equal(typeof source.defaults, "object");
                        }
                        done();
                    });
                });
            });
        });

        describe("post", function () {
            let client;
            before(function (done) {
                client = new Zebrix({
                    client: process.env.ZEBRIX_CLIENT,
                    username: process.env.ZEBRIX_USERNAME,
                    password: process.env.ZEBRIX_PASSWORD,
                });

                client.login(function (data, error) {
                    client.options.token = data.token;
                    done();
                });
            });

            it("method exists", function () {
                assert.equal(typeof client.post, "function");
            });

            let lastCreatedId;
            describe("api/datasource", function () {
                it("returns source", function (done) {
                    client.post(
                        "api/datasource",
                        {
                            "defaults": {
                                "foo": "bar"
                            }
                        },
                        function (data, error) {
                            lastCreatedId = data.id;
                            assert.equal(typeof data.id, "number");
                            assert.equal(data.defaults.foo, "bar");
                            done();
                        }
                    );
                });
            });

            describe("api/datasource/:id", function () {
                it("returns sources", function (done) {
                    client.post(
                        "api/datasource/" + lastCreatedId,
                        {
                            "defaults": {
                                "foo": "edited"
                            }
                        },
                        function (data, error) {
                            assert.equal(typeof data.id, "number");
                            assert.equal(data.id, lastCreatedId);
                            assert.equal(data.defaults.foo, "edited");
                            done();
                        }
                    );
                });
            });

            describe("api/screens/updateds", function () {
                it("returns ok", function (done) {
                    client.post("api/screens/updateds", function (data, error) {
                        assert.equal(data.done, "ok");
                        done();
                    });
                });
            });
        });
    });
});
