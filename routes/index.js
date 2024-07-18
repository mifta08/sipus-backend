const { authenticate, authorize } = require('../middleware/authorization');

const { findAllLibrary, findLibraryById, createNewLibrary, updateLibrary, deleteLibrary } = require('../controller/libraryControllers');

const { findAllAdmin, findAdminById, createAdmin, loginAdmin, updateAdmin, deleteAdmin } = require('../controller/adminControllers');

const { createMember, loginMember, findAllMember, findMemberById, updateMember, deleteMember } = require('../controller/memberControllers');

const { createBook, findAllBook, findBookById, updateBook, deleteBook } = require('../controller/bookControllers');

//ANCHOR Inisialisasi penggunaan router
const router = require('express').Router();

//ANCHOR - Rute beranda
router.get('/', (req, res) => {
    res.send('Welcome guys to express!');
});


//ANCHOR - Library Routes 
//NOTE - Super Admin memiliki akses penuh pada Routes Library
router.get('/perpustakaan', authenticate, authorize(['admin']), findAllLibrary);
router.get('/perpustakaan/:id', authenticate, authorize(['admin']), findLibraryById);
router.post('/perpustakaan', createNewLibrary);
router.patch('/perpustakaan/:id', updateLibrary);
router.delete('/perpustakaan/:id', deleteLibrary);

//ANCHOR - Admin Routes
router.get('/admin', authenticate, authorize(['admin']), findAllAdmin);
router.get('/admin/:id', authenticate, authorize(['admin']), findAdminById);
router.post('/admin/create-admin', createAdmin); //NOTE - Super Admin bisa membuat admin
router.post('/admin/login-admin', loginAdmin);
router.patch('/admin/:id', authenticate, authorize(['admin']), updateAdmin); //NOTE - Super Admin bisa mengupdate admin juga
router.delete('/admin/:id', authenticate, deleteAdmin); //NOTE - Hanya super admin yang dapat menghapus admin

// ANCHOR Members
router.get('/member', findAllMember);
router.get('/member/:id', findMemberById);
router.post('/member/create-member', createMember);
router.post('/member/login-member', loginMember);
router.patch('/member/update-member/:id', updateMember);
router.delete('/member/:id', deleteMember);


//ANCHOR - Books
router.get('/book', findAllBook);
router.get('/book/:id', findBookById);
router.post('/book/create-book', createBook);
router.patch('/book/:id', updateBook);
router.delete('/book/:id', deleteBook);



module.exports = router