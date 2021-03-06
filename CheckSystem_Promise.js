
os = require('os');

// minimum memory size is 4 GB
const minMemorySize = 4 * 1024 * 1024 * 1024;

// minimum number of cores are 2
const minProcessorCores = 2;

var checkSystem = function () {
    return new Promise((resolve, reject) => {

        // make sure the system has the sufficient required memory
        if (os.freemem() < minMemorySize)
            reject("This App needs at least 4 GB of RAM.");

        // make sure the system has the sufficient number of cores
        else if (os.cpus().length < minProcessorCores)
            reject("Processor is not supported.");

        else
            resolve("System is Checked Successfully.");
    });
}


checkSystem()
    .then(result => { console.log(result); })
    .catch(err => { console.log(err); });

console.log("Checking your system.."); 
