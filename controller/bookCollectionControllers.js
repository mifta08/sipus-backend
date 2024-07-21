const { Book, BookCollection, Library } = require('../models');

const createBookCollection = async (req, res, next) => {
    try {
        const { book_collection_id, isbn, status } = req.body;
        const employeeId = req.user.employee_id;

        const book = await Book.findOne({ where: { isbn } });

        if (!book) {
            return res.status(400).json({
                status: 'error',
                message: 'ISBN does not exist in BOOK'
            });
        }

        const library = await Library.findOne({ where: { employee_id: employeeId } });

        if (!library) {
            return res.status(400).json({
                status: 'error',
                message: 'Library not found for this employee'
            });
        }

        const { library_id } = library;

        const newCollection = await BookCollection.create({
            book_collection_id, library_id, isbn, status
        })

        res.status(200).json({
            status: 'ok',
            message: 'Collection book successfully created',
            data: newCollection
        })
    } catch (error) {
        next(error);
    }
}

module.exports = { createBookCollection }