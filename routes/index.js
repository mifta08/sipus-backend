const { findAllLibrary, findLibraryById, createNewLibrary, updateLibrary, deleteLibrary } = require('../controller/libraryControllers');
const { findAllAdmin, findAdminById, registerAdmin, updateAdmin, deleteAdmin } = require('../controller/adminControllers');

//ANCHOR Inisialisasi penggunaan router
const router = require('express').Router();

//ANCHOR - Rute beranda
router.get('/', (req, res) => {
    res.send('Welcome guys to express!');
});


//ANCHOR - Library Routes
router.get('/perpustakaan', findAllLibrary);
router.get('/perpustakaan/:id', findLibraryById);
router.post('/perpustakaan', createNewLibrary);
router.patch('/perpustakaan/:id', updateLibrary);
router.delete('/perpustakaan/:id', deleteLibrary);

//ANCHOR - Admin Routes
router.get('/admin', findAllAdmin);
router.get('/admin/:id', findAdminById);
router.post('/admin/register', registerAdmin);
router.patch('/admin/:id', updateAdmin);
router.delete('/admin/:id', deleteAdmin);


module.exports = router