const { Member, BookCollection, Borrowing, Library, Book } = require('../models');

const createBorrowing = async (req, res, next) => {
    try {
        const { member_id, book_collection_id, details, borrowing_date, due_date, status } = req.body;

        const bookCollection = await BookCollection.findOne({ where: { book_collection_id } });

        if (!bookCollection) {
            return res.status(400).json({
                status: 'error',
                message: 'book collection id does not exist in BOOK collection'
            });
        }

        const member = await Member.findOne({ where: { member_id } });

        if (!member) {
            return res.status(400).json({
                status: 'error',
                message: 'Member not found'
            });
        }


        const createBorrowing = await Borrowing.create({
            member_id, book_collection_id, details, borrowing_date, due_date, status
        })

        res.status(200).json({
            status: 'ok',
            message: 'Borrowing successfully created',
            data: createBorrowing
        })
    } catch (error) {
        console.log('error creating', error);
        next(error);
    }
}

const getAllBorrowing = async (req, res, next) => {
    try {

        const employeeId = req.user.employee_id;

        //NOTE Temukan library berdasarkan employee_id
        const library = await Library.findOne({ where: { employee_id: employeeId } });

        console.log('library id yang sama dengan employee_id', library);


        if (!library) {
            return res.status(404).json({
                status: 'failed',
                message: `Library not found for employee with ID ${employeeId}`
            });
        }

        const { library_id } = library;

        console.log('library_id', library_id);

        // Temukan semua peminjaman berdasarkan library_id
        const data = await Borrowing.findAll({
            attributes: ['id', 'details', 'status', 'borrowing_date', 'due_date'],
            include: [
                {
                    model: BookCollection,
                    as: 'bookCollection',
                    required: true,
                    where: { library_id: library_id },
                    attributes: ['book_collection_id', 'library_id', 'isbn', 'status', 'createdAt', 'updatedAt'],
                    include: [{
                        model: Book,
                        as: 'book',
                        required: true,
                        attributes: ['book_tittle']
                    }]
                },
                {
                    model: Member,
                    as: 'member',
                    attributes: ['name']
                }
            ]
        });




        if (data.length === 0) {
            return res.status(404).json({
                status: 'failed',
                message: `No borrowings found for library ID ${library_id}`
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

const updateBorrowing = async (req, res, next) => {
    try {
        const { borrowing_date, due_date, status } = req.body;
        const { id } = req.params;


        const data = await Borrowing.findOne({
            where: { id: id }
        });

        if (data) {
            data.borrowing_date = borrowing_date;
            data.due_date = due_date;
            data.status = status;
            await data.save();
            res.json(data)
        } else {
            res.status(404).json({
                status: 'failed',
                message: `Book Collection with id ${data} is not found`
            })
        }

    } catch (error) {
        next(error);
    }
}

module.exports = { createBorrowing, getAllBorrowing, updateBorrowing }