// const os = require('os');
const si = require('systeminformation');
const { exec } = require('child_process');
// const crypto = require('crypto');
// const cpus = os.cpus();
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
si.osInfo().then(data => console.log(data));

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

getCPUSerialNumber()
  .then(serialNumber => {
    console.log('CPU Serial Number:', serialNumber);
  })
  .catch(error => {
    console.error(error);
  });




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
  })
  .catch(error => {
    console.error(error);
  });




