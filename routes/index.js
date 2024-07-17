const { authenticate, authorize } = require('../middleware/authorization');
const {
    findAllLibrary,
    findLibraryById,
    createNewLibrary,
    updateLibrary,
    deleteLibrary
} = require('../controller/libraryControllers');

const {
    findAllUser,
    findUserById,
    registerUser,
    loginUser,
    updateUser,
    deleteUser
} = require('../controller/userControllers');

//ANCHOR Inisialisasi penggunaan router
const router = require('express').Router();

//ANCHOR - Rute beranda
router.get('/', (req, res) => {
    res.send('Welcome guys to express!');
});


//ANCHOR - Library Routes
router.get('/perpustakaan', authenticate, authorize(['admin']), findAllLibrary);
router.get('/perpustakaan/:id', authenticate, authorize(['admin']), findLibraryById);
router.post('/perpustakaan', authenticate, authorize(['admin']), createNewLibrary);
router.patch('/perpustakaan/:id', authenticate, authorize(['admin']), updateLibrary);
router.delete('/perpustakaan/:id', authenticate, authorize(['admin']), deleteLibrary);

//ANCHOR - User Routes
router.get('/user', authenticate, authorize(['admin']), findAllUser);
router.get('/user/:id', authenticate, authorize(['admin']), findUserById);
router.post('/user/register', authenticate, authorize(['admin']), registerUser);
router.post('/user/login', loginUser);
router.patch('/user/:id', authenticate, authorize(['admin']), updateUser);
router.delete('/user/:id', authenticate, authorize(['admin']), deleteUser);




module.exports = router