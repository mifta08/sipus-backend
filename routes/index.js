const { authenticate, authorize } = require('../middleware/authorization');

const { findAllLibrary, findLibraryById, createNewLibrary, updateLibrary, deleteLibrary } = require('../controller/libraryControllers');

const { findAllAdmin, findAdminById, createAdmin, loginAdmin, updateAdmin, deleteAdmin } = require('../controller/adminControllers');

const { createMember, loginMember, findAllMember, findMemberById, updateMember, deleteMember } = require('../controller/memberControllers');

const { createBook, findAllBook, findBookById, updateBook, deleteBook } = require('../controller/bookControllers');

const { createBookCollection, getAllBooksCollection, getAllBookByLibraryId, updateBookCollection, deleteBookCollection } = require('../controller/bookCollectionControllers');

const { createBorrowing, getAllBorrowing, updateBorrowing } = require('../controller/borrowingControllers');
const { createAdminSuper, loginAdminSuper } = require('../controller/superAdminControllers');

//ANCHOR Inisialisasi penggunaan router
const router = require('express').Router();

//ANCHOR - Rute beranda
router.get('/', (req, res) => {
    res.send('Welcome guys to express!');
});

// ANCHOR - Rute Admin Super
router.post('/adminsuper-create', createAdminSuper)
router.post('/adminSuper-login', loginAdminSuper)

//ANCHOR - Library Routes 
//NOTE - Super Admin memiliki akses penuh pada Routes Library
//NOTE admin hanya dapat mengakses update library
router.get('/perpustakaan', authenticate, authorize(['super_admin']), findAllLibrary);
router.get('/perpustakaan/:id', authenticate, authorize(['super_admin']), findLibraryById);
router.post('/perpustakaan', authorize(['super_admin']), createNewLibrary);
router.patch('/perpustakaan/:id', authenticate, updateLibrary);
router.delete('/perpustakaan/:id', authenticate, authorize(['super_admin']), deleteLibrary);

//ANCHOR - Admin Routes
router.get('/admin', authenticate, authorize(['admin']), findAllAdmin); //NOTE - hanya super admin

//TODO -  buat rute get all admin by library id untuk peran admin di perpustakaan tsb
router.get('/admin/:id', authenticate, authorize(['admin', 'super_admin']), findAdminById);
router.post('/admin/create-admin', authenticate, authorize(['super_admin']), createAdmin); //NOTE - Super Admin bisa membuat admin
router.post('/admin/login-admin', loginAdmin);
router.patch('/admin/:id', authenticate, authorize(['admin']), updateAdmin); //NOTE - Super Admin bisa mengupdate admin juga
router.delete('/admin/:id', authenticate, authorize(['super_admin']), deleteAdmin); //NOTE - Hanya super admin yang dapat menghapus admin

// ANCHOR Members
router.get('/member', authenticate, authorize(['admin']), findAllMember);
router.get('/member/:id', authenticate, authorize(['admin']), findMemberById);
router.post('/member/create-member', authenticate, authorize(['admin']), createMember);
router.post('/member/login-member', loginMember);
router.patch('/member/update-member/:id', authenticate, authorize(['user']), updateMember);
router.delete('/member/:id', authenticate, authorize(['user']), deleteMember);


//ANCHOR - Books
router.get('/book', authenticate, findAllBook);
router.get('/book/:id', authenticate, findBookById);
router.post('/book/create-book', authenticate, authorize(['admin']), createBook);
router.patch('/book/:id', authenticate, authorize(['admin']), updateBook);
router.delete('/book/:id', authenticate, authorize(['admin']), deleteBook);

//ANCHOR - bookcollections
router.get('/bookcollections', authenticate, getAllBooksCollection); //NOTE - get all ini digunakan untuk user agar dapat melihat semua buku dari berbagai perpustakaan

//NOTE - rute ini digunakan untuk admin dapat melihat semua buku dari library dia terdaftar (tidak termasuk user biasa) 
router.get('/bookcollections/library-book-collection', authenticate, authorize(['admin']), getAllBookByLibraryId)
router.post('/bookcollections/create-collections/', authenticate, authorize(['admin']), createBookCollection);
router.patch('/bookcollections/update-book-collections/:id', authenticate, authorize(['admin']), updateBookCollection);
router.delete('/bookcollections-delete/:id', deleteBookCollection);

//ANCHOR - borrowing
router.post('/borrowing/create-borrowing', authenticate, authorize(['admin']), createBorrowing)
router.get('/borrowing', authenticate, authorize(['admin']), getAllBorrowing)
router.patch('/update-borrowing/:id', authenticate, authorize(['admin']), updateBorrowing);

module.exports = router