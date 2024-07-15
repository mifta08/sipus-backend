const { findAllPerpustakaan, findPerpustakaanById, createNewPerpustakaan } = require('../controller/perpustakaanControllers');

//ANCHOR Inisialisasi penggunaan router
const router = require('express').Router();

//ANCHOR - Rute beranda
router.get('/', (req, res) => {
    res.send('Welcome guys to express!');
});


//ANCHOR - Rute perpustakaan
router.get('/perpustakaan', findAllPerpustakaan);
router.get('/perpustakaan/:id', findPerpustakaanById); 
router.post('/perpustakaan', createNewPerpustakaan);


module.exports = router