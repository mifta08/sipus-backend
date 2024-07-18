const { Book } = require('../models');

const findAllBook = async (req, res, next) => {

    try {
        const data = await Book.findAll();
        const result = {
            status: 'ok',
            message: 'data get successfully',
            data: data
        }
        if (data === undefined && data === null) {
            return res.status(404).json({ status: 'failed', message: `data book with id ${id} is not found` })
        }
        res.json(result);
    } catch (error) {
        next(error);
    }
}

const findBookById = async (req, res, next) => {

    try {
        const { id } = req.params;
        const data = await Book.findByPk(id);
        if (data) {
            const result = {
                status: 'ok',
                message: 'data book get successfully',
                data: data
            }
            res.json(result)
        } else if (data === null) {
            return res.status(404).json({
                status: 'failed',
                message: `data Book with id ${id} is not found`
            })
        }
    } catch (error) {
        next(error);
    }
}

const createBook = async (req, res, next) => {
    try {
        const { isbn, book_tittle, author, category } = req.body;

        const newBook = await Book.create({
            isbn, book_tittle, author, category
        })

        res.status(200).json({
            status: 'ok',
            message: 'Book created successfully',
            data: newBook
        })
    } catch (error) {
        next(error);
    }
}

const updateBook = async (req, res, next) => {
    try {
        const { isbn, book_tittle, author, category } = req.body;

        const { id } = req.params;
        const data = await Book.findByPk(id);

        if (data) {
            data.isbn = isbn;
            data.book_tittle = book_tittle;
            data.author = author;
            data.category = category;
            await data.save();
            res.json(data)
        } else {
            res.status(404).json({
                status: 'failed',
                message: `data Book with id ${id} is not found`
            })
        }
    } catch (error) {
        next(error);
    }
}

const deleteBook = async (req, res, next) => {
    try {
        const { id } = req.params
        const data = await Book.findByPk(id);

        if (data) {
            await data.destroy();
            res.json({
                status: 'success',
                message: `Data book with id ${id} was successfully deleted`
            })
        } else if (data === null) {
            return res.status(404).json({
                status: 'failed',
                message: `data Book with id ${id} is not found`
            })
        }
    } catch (error) {
        next(error);
    }
}

module.exports = { createBook, findAllBook, findBookById, updateBook, deleteBook }