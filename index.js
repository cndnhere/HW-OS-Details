const express = require('express');
const os = require('os');

const app = express();
const port = 3000;

app.get('/os-details', (req, res) => {
  const osDetails = {
    platform: os.platform(),
    type: os.type(),
    release: os.release(),
    architecture: os.arch(),
    hostname: os.hostname(),
  };

  res.json(osDetails);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
