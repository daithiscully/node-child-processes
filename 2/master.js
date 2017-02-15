const child_process = require('child_process');

let worker_process = child_process.fork("support.js", [1, 2, 3, 4]);

worker_process.on('close', function (code) {
    console.log('child process exited with code ' + code);
});
