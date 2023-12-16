//import {machineId, machineIdSync} from 'node-machine-id';
// import pkg from 'node-machine-id';
const pkg = require('node-machine-id');
const express = require('express');
const { machineIdSync } = pkg;
const app = express();

app.get('/', (req, res) => {
    let id1 = machineIdSync()
    // id = c24b0fe51856497eebb6a2bfcd120247aac0d6334d670bb92e09a00ce8169365
    let id2 = machineIdSync({ original: true })
    // id = 98912984-c4e9-5ceb-8000-03882a0485e4

    console.log(id1);
    console.log(id2);
    res.json({id1, id2});
})
// Asyncronous call with async/await or Promise

// async function getMachineId() {
//     let id = await machineId();

// }

// machineId().then((id) => {

// })

// Syncronous call



const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});