const fs = require('fs');
const src = fs.createReadStream('./big.file');

process.on('message', (msg) => {
    console.log('File Path:', msg);
    const fileSrc = fs.createReadStream('./big.file', {encoding:'utf8'})
    
    fileSrc.on('data', (chunk) =>{           
        process.send(chunk);
    });
  
    fileSrc.on('end', ()=>{
        process.exit();
      //  process.send('end');
    })
  });
  
