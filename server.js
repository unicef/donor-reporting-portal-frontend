const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const tenant = process.env.REACT_APP_TENANT_NAME || 'test';

app.use('/', (req, res, next) => {
  express.static(path.join(__dirname, 'build'))(req, res, next);
});

app.use(function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => console.log(`Donor Reporting Portal start on ${port}!`));
app.listen(tenant, () => console.log(`Tenant Name: ${tenant}`));

