//SECTION - Configuration Express
//ANCHOR - inisialized express
require('dotenv').config();
const express = require('express');
const app = express();

//ANCHOR - port configuration
const port = process.env.PORT || 3000;

//ANCHOR - Middleware untuk mem-parsing body JSON
app.use(express.json());

//SECTION - routes
//ANCHOR - import router
const router = require('./routes/index');
app.use(router);

//ANCHOR - Middleware 
const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);

app.listen(port, () => console.log(`server listening on ${port}`));