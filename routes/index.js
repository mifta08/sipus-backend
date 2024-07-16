const { findAllLibrary, findLibraryById, createNewLibrary, updateLibrary, deleteLibrary } = require('../controller/libraryControllers');
const { findAllAdmin, findAdminById, registerAdmin, updateAdmin, deleteAdmin, loginAdmin, findAllUser, findUserById, registerUser, loginUser, updateUser, deleteUser } = require('../controller/userControllers');

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
router.get('/user', findAllUser);
router.get('/user/:id', findUserById);
router.post('/user/register', registerUser);
router.post('/user/login', loginUser);
router.patch('/user/:id', updateUser);
router.delete('/user/:id', deleteUser);


module.exports = router