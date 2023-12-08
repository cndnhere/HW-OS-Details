const express = require('express');
// const os = require('os');
const si = require('systeminformation');
const { exec } = require('child_process');
// const crypto = require('crypto');
// const cpus = os.cpus();

let cpuSrNo = '';
let hwSrNo = '';
let objData;

const app = express();

app.get('/', (req, res) => {
    // Here, you can write your HTML content as a string
    const htmlResponse = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    </head>
    <body>
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-7 p-5">
                    <div>
                            <p class=text-danger">CPU Serial Number : ${cpuSrNo}</p>
                            <p>Hard Disk Serial Number : ${hwSrNo}</p>
                            <br><br>
                            <p>Platform : ${objData.platform}</p>
                            <p>OS : ${objData.distro}</p>
                            <p>Hostname : ${objData.hostname}</p>
                            <p>Serial : ${objData.serial}</p>
                            <p>Servicepack : ${objData.servicepack}</p>

                         
                    </div>
                </div>
            </div>
        </div>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
    </body>
    </html>
    `;
    
    // Set the content type to HTML and send the response
    res.header('Content-Type', 'text/html');
    res.send(htmlResponse);
  });



// const networkInterfaces = os.networkInterfaces();
      
// const cpuData = cpus.map(cpu => cpu.model).join('');
// console.log(cpuData);
// const networkData = Object.values(networkInterfaces)
//   .map(interfaces => interfaces.map(iface => iface.mac).join(''))
//   .join('');
//   console.log(networkData);




// si.system().then(data => console.log(data));
// si.uuid().then(data => console.log(data));
// si.bios().then(data => console.log(data));
// si.baseboard().then(data => console.log(data));
// si.chassis().then(data => console.log(data));

// si.cpu().then(data => console.log(data));
// si.cpuFlags().then(data => console.log(data));
// si.cpuCache().then(data => console.log(data));
//for use
si.osInfo().then(data =>{ console.log(data)
    objData=data;
});

// si.versions().then(data => console.log(data));

// si.versions('npm, php, postgresql').then(data => console.log(data));



function getCPUSerialNumber() {
  return new Promise((resolve, reject) => {
    exec('wmic cpu get ProcessorId', (error, stdout, stderr) => {
      if (error) {
        reject(`Error: ${error.message}`);
        return;
      }
      if (stderr) {
        reject(`Command execution error: ${stderr}`);
        return;
      }

      const serialNumber = stdout.split('\n')[1].trim();
      resolve(serialNumber);
    });
  });
}






function getHardDriveSerialNumber() {
  return new Promise((resolve, reject) => {
    exec('wmic diskdrive get SerialNumber', (error, stdout, stderr) => {
      if (error) {
        reject(`Error: ${error.message}`);
        return;
      }
      if (stderr) {
        reject(`Command execution error: ${stderr}`);
        return;
      }

      const serialNumbers = stdout.split('\n').slice(1).map(line => line.trim()).filter(Boolean);
      resolve(serialNumbers);
    });
  });
}

getHardDriveSerialNumber()
  .then(serialNumbers => {
    console.log('Hard Drive Serial Numbers:', serialNumbers);
    hwSrNo = serialNumbers;
  })
  .catch(error => {
    console.error(error);
  });

  getCPUSerialNumber()
  .then(serialNumber => {
    console.log('CPU Serial Number:', serialNumber);
    cpuSrNo = serialNumber
  })
  .catch(error => {
    console.error(error);
  });




  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
