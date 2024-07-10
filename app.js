//SECTION - Configuration Express
//ANCHOR - inisialized express
const express = require('express');
const app = express();

//ANCHOR - port configuration
const port = 3000;

//ANCHOR - import router
const router = require('./routes/index');
app.use(router);

app.get('/', (req, res) => {
    res.send('Welcome guys to express!');
});

app.listen(port, () => console.log(`server listening on ${port}`));