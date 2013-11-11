log-pipe
========

Pipe stdin to a logfile with optional log rotation parameters

[![NPM](https://nodei.co/npm/log-pipe.png?downloads=true)](https://nodei.co/npm/log-pipe/)  

Example
=======
``` sh
node index.js 2>&1 | log-pipe app.log --count 3 --lines 15
```

options
=======

### count
The maximum number of rotated logs (including primary log file). Additional
files after `count` will be deleted.

### lines
The maximum number of log lines before a rotation occurrs.

install
=======

With [npm](http://npmjs.org) do:

```
npm install log-pipe
```
