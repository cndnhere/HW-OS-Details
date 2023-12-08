// server.js
const express = require('express');
const cors = require('cors');
const si = require('systeminformation');
const { exec } = require('child_process');

const app = express();
app.use(cors());

app.get('/cpu-serial-number', async (req, res) => {
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

      res.json(serialNumber)
    })
    .catch(error => {
      console.error(error);
    });
  

});



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
  
 
  

const PORT = 3000; // Change to your desired port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
