let childProcess = require('child_process');

function runScript(scriptPath, callback) {
    console.log('Started running https-request.js');
    // keep track of whether callback has been invoked to prevent multiple invocations
    let invoked = false;
    let process = childProcess.fork(scriptPath);

    // Send object ot the child process
    process.send({
        hostname: 'jsonplaceholder.typicode.com',
        path: '/posts/1',
        method: 'GET'
    });

    // listen for errors as they may prevent the exit event from firing
    process.on('error', function (err) {
        if (invoked) return;
        invoked = true;
        callback(err);
    });

    // execute the callback once the process has finished running
    process.on('exit', function (code) {
        if (invoked) return;
        invoked = true;
        let err = code === 0 ? null : new Error('exit code ' + code);
        callback(err);
    });
}

// Now we can run a script and invoke a callback when complete, e.g.
runScript('./https-request.js', function (err) {
    if (err) throw err;
    console.log('finished running https-request.js');
});
