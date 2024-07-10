const { findAllPerpustakaan, findPerpustakaanById, createNewPerpustakaan } = require('../controller/perpustakaanControllers');

const router = require('express').Router();

router.get('/perpustakaan', findAllPerpustakaan);
router.get('/perpustakaan/:id', findPerpustakaanById); 
router.post('/perpustakaan', createNewPerpustakaan);

module.exports = router