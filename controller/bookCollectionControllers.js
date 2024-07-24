const { Book, BookCollection, Library } = require('../models');

const getAllBooksCollection = async (req, res, next) => {
    try {
        const data = await BookCollection.findAll();
        const result = {
            status: 'ok',
            message: 'data get successfully',
            data: data
        }
        if (data === undefined && data === null) {
            return res.status(404).json({ status: 'failed', message: `data Admin with id ${id} is not found` })
        }
        res.json(result);
    } catch (error) {
        next(error);
    }
}

const getAllLibraryByLibraryId = async (req, res, next) => {
    try {
        const employeeId = req.user.employee_id;

        if (!employeeId) {
            return res.status(404).json({
                status: 'failed',
                message: 'Access denied. You do not have the required permissions to view libraries. '
            });
        }

        //NOTE Temukan library berdasarkan employee_id
        const library = await Library.findOne({ where: { employee_id: employeeId } });

        if (!library) {
            return res.status(404).json({
                status: 'failed',
                message: `Library not found for employee with ID ${employee_id}`
            });
        }

        const { library_id } = library;

        // Temukan semua book collection berdasarkan library_id
        const data = await BookCollection.findAll({ where: { library_id } });

        if (data.length === 0) {
            return res.status(404).json({
                status: 'failed',
                message: `No book collections found for library ID ${library_id}`
            });
        }

        const result = {
            status: 'ok',
            message: 'Data retrieved successfully',
            data: data
        };

        res.json(result);

    } catch (error) {
        next(error);
    }
}

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

module.exports = { createBookCollection, getAllBooksCollection, getAllLibraryByLibraryId }