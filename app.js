//SECTION - Configuration Express

//ANCHOR - inisialized express
const express = require('express');
const app = express();

//ANCHOR - port configuration
const port = 3000;

//ANCHOR - Middleware untuk mem-parsing body JSON
app.use(express.json());


//SECTION - routes
//ANCHOR - import router
const router = require('./routes/index');
app.use(router);

app.listen(port, () => console.log(`server listening on ${port}`));