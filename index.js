#! /usr/bin/env node
/* vim: set syntax=JavaScript : */

var fs = require('fs')
  , split = require('split')
  , optimist = require('optimist')
  , rotate = require('log-rotate')
  , exec = require('child_process').exec;

var args = optimist.argv;

// keep track of some data
var lines = 0
  , buffer = []
  , paused = false
  , logfile = args._.shift()
  , maxlines = (args.lines || 30000);

// create initial writeStream
var ws = fs.createWriteStream(logfile);

// split stdin by newline
process.stdin.pipe(split()).on('data', function onData(line) {
  // append newline
  line += "\n"

  // buffer if we're paused
  if(paused === true) { return buffer.push(line); }

  // write the line if we haven't reached our limit
  if(++lines < maxlines) { return ws.write(line); }

  // start buffering data and rotate log files
  paused = true;
  buffer.push(line);

  // close the existing writeStream
  ws.close();

  rotate(logfile, { count: args.count }, function onRotate(err) {
    // reopen the write stream
    ws = fs.createWriteStream(logfile);

    // update data
    lines = 0;

    // send any buffered data
    while(buffer.length) ws.write(buffer.pop());

    // unpause the writer
    paused = false;
  });
});
