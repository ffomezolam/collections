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

    for(var p in o) {
        if(p in required) required[p] = true;
    }

    for(var e in required) {
        var v = required[e];
        if(!v) console.error('    missing ' + e)
    }
}
