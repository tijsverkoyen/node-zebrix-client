/*jshint esversion: 6 */
"use strict";

/**
 * Module dependencies
 */

var extend = require("deep-extend");
var request = require("request");

// Package version
const VERSION = require("../package.json").version;

function Zebrix(options) {
    if (!(this instanceof Zebrix)) {
        return new Zebrix(options);
    }

    // Merge the default options with the client submitted options
    this.options = extend({
        client: null,
        username: null,
        password: null,
        token: null,
        url: "https://cmsv2.zebrix.net",
        request_options: {
            headers: {
                "User-Agent": "node-zebrix-client/" + VERSION
            }
        }
    }, options);

    // Configure default request options
    this.request = request.defaults(this.options.request_options);
}


Zebrix.prototype.login = function (callback) {
    let body = {
        clientname: this.options.client,
        username: this.options.username,
        password: this.options.password
    };
    this.post("login", body, callback);
};

Zebrix.prototype.post = function (path, body, callback) {
    this.__request("POST", path, body, callback);
};

Zebrix.prototype.get = function (path, body, callback) {
    this.__request("GET", path, body, callback);
};

Zebrix.prototype.__request = function (method, path, body, callback) {
    // reset some variables if no params are passed
    if (typeof body === "function") {
        callback = body;
        body = {};
    }

    let options = {
        method: method.toLowerCase(),
        url: this.options.url + "/" + path,
        json: true,
        body: body
    };

    if (this.options.token) {
        options = extend(options,
            {
                headers: {
                    Authorization: "Bearer " + this.options.token
                }
            }
        );
    }

    this.request(options, function (error, response, data) {
        // request error
        if (error) {
            return callback(data, error);
        }

        // status code errors
        if (response.statusCode < 200 || response.statusCode > 299) {
            return callback(
                data,
                new Error("HTTP Error: " + response.statusCode + " " + response.statusMessage)
            );
        }

        // no errors
        if (typeof callback === "function") {
            return callback(data);
        }
    });
};

module.exports = Zebrix;
