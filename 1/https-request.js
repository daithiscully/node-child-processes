const https = require('https');

let options = {
    hostname: 'jsonplaceholder.typicode.com',
    path: '/posts/1',
    method: 'GET'
};

let req = https.request(options, (res) => {
    let responseBody = '';
    console.log('----------Status Code----------');
    console.log(res.statusCode);
    console.log('----------Headers----------');
    console.log(res.headers);

    res.on('data', (d) => {
        responseBody += d;
    });

    res.on('end', () => {
        console.log('---------Response Body-----------');
        console.log(responseBody);
    });

});

req.on('error', (e) => {
    console.log('--------------------');
    console.error(e);
    console.log('--------------------');
});

req.end();


