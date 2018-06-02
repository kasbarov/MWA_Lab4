const http = require('http');
const fs = require('fs');

const { fork } = require('child_process');

const url = require('url');
const { Subject } = require('rxjs');
const subject = new Subject();

subject.subscribe(handleRequest);
// handling server requests
http.createServer((req, res) => {
    subject.next({ req, res });
}).listen(4000);

function handleRequest(serverRequest) {

    //console.log (serverRequest.req.url);
    // pass the file name to the child process
    const urlParts = url.parse(serverRequest.req.url, true);
    const urlParams = urlParts.query;
    //console.log (urlParams);

    const forked = fork('FileChildProcessor.js');

    forked.send({ filePath: urlParams });

    // send the file chunks back to the client    
    forked.on('message', (msg) => {

        console.log (msg);

        if (msg === 'end')
            serverRequest.res.end();

        else
            serverRequest.res.write(msg);


    });



}