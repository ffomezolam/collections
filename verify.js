#!/usr/bin/env node

/**
 * Verify interface of collection classes
 *
 * Classes must implement the following methods:
 *      get()
 *      add()
 *      remove()
 */

var fs = require('fs');
var args = process.argv.slice(2);

args.forEach(function(v, i, a) {
    console.log('>', v);
    verify(v);
})

function verify(path) {
    if(fs.exists(path)) console.log('doesn\'t exist');

    var o = require(path);
    var required = {
        get: false,
        add: false,
        remove: false
    };
    var length = 3;

    for(var p in o.prototype) {
        if(p in required) required[p] = true;
    }

    var t = length;
    for(var e in required) {
        var v = required[e];
        if(!v) {
            console.error('    missing ' + e);
            t--;
        }
    }

    if(t == length) console.log('    OK');
}
