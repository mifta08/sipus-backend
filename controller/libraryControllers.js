const { Library } = require('../models');

const findAllLibrary = async (req, res, next) => {
    try {
        const data = await Library.findAll();

        const result = {
            status: 'ok',
            message: 'data get successfully',
            data: data
        }
        if (data === undefined && data === null) {
            return res.status(404).json({ status: 'failed', message: `data book with id ${id} is not found` })
        }
        res.json(result);
    } catch (err) {
        next(err);
    }
}

const findLibraryById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = await Library.findByPk(id);

        if (data) {
            const result = {
                status: 'ok',
                message: 'data get successfully',
                data: data
            }
            res.json(result)
        } else if (data === null) {
            return res.status(404).json({
                status: 'failed',
                message: `data Library with id ${id} is not found`
            })
        }

    } catch (error) {
        next(error)
    }
}

const createNewLibrary = async (req, res, next) => {
    try {
        //ANCHOR - get req body / input from user
        const { library_id, library_name, address, employee_id, isbn } = req.body;

        const newLibrary = await Library.create({
            library_id,
            library_name,
            address,
            employee_id,
            isbn
        });

        //ANCHOR - send a success response to user if data exists
        res.status(200).json({
            status: 'ok',
            message: 'create successfully',
            data: newLibrary
        })
    } catch (err) {
        next(err);
    }

}

const updateLibrary = async (req, res, next) => {
    try {
        const { library_id, library_name, address, employee_id, isbn } = req.body;

        const { id } = req.params;
        const data = await Library.findByPk(id);

        if (data) {
            data.library_id = library_id;
            data.library_name = library_name;
            data.address = address;
            data.employee_id = employee_id;
            data.isbn = isbn;
            await data.save();
            res.json(data)
        } else {
            res.status(404).json({
                status: 'failed',
                message: `data Library with id ${data} is not found`
            })
        }
    } catch (error) {
        next(error);
    }
}

const deleteLibrary = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = await Library.findByPk(id);

        if (data) {
            await data.destroy();
            res.json({
                status: 'success',
                message: `Library with id ${id} was successfully deleted`
            })
        } else if (data === null) {
            return res.status(404).json({
                status: 'failed',
                message: `data Library with id ${id} is not found`
            })
        }
    } catch (error) {
        next(error);
    }
}

module.exports = { findAllLibrary, findLibraryById, createNewLibrary, updateLibrary, deleteLibrary }