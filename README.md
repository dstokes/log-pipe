### This project has been moved over to [logrotate-stream](https://github.com/dstokes/logrotate-stream/)

log-pipe
========

Pipe stdin to a logfile with optional log rotation parameters

example
=======
``` sh
node index.js 2>&1 | log-pipe app.log --count 3 --lines 15 --compress
```

the problem
===========
Log rotation with stdio redirection sucks. When using a utility like `logrotate`
to rotate application logs that are written to with standard io redirection
techniques like `./app &> app.log` the process continues to write to
rotated logs, leaving your primary log empty after rotaion. This is due to the
fact that the file descriptor is not updated when its underlying log is moved.

There's a couple ways to try and deal with this, but they all fall short:
#### 1. Use `winston`'s log rotation feature for nodejs apps

This requires adding a new dependency and possibly code changes around logging
logic.

#### 2. Restart your app on `SIGUSR1`

Often times, production apps can't be restarted willy-nilly

#### 3. Use the `copytruncate` feature of `logrotate`

This only works if you don't need to guarantee that all of your log lines are
persisted. `copytruncate` performs a non-atomic copy before truncating the
original log, which means you can lose data in the process if the copy is slow.

`log-pipe` tries to solve this by acting as an intermediary between the application
and the file system, piping `stdin` to log files and rotating those logfiles
when necessary.

options
=======

### count
The maximum number of rotated logs (including primary log file). Additional
files after `count` will be deleted.

### lines
The maximum number of log lines before a rotation occurrs.

### compress
Compress rotated files with gzip

install
=======

With [npm](http://npmjs.org) do:

```
npm install log-pipe
```
