const { Library } = require('../models');

const findAllLibrary = async (req, res, next) => {
    try {
        const data = await Library.findAll();

        const result = {
            status: 'ok',
            message: 'data get successfully',
            data: data
        }
        res.json(result);
    } catch (err) {
        next(err);
    }
}

const findPerpustakaanById = (req, res) => {
    const { id } = req.params

    let book
    for (let i = 0; i < perpustakaan.length; i++) {
        if (perpustakaan[i].id === Number(id)) {
            book = perpustakaan[i]
        }
    }
    if (book === undefined) {
        return res.status(404).json({ status: 'failed', message: `data book with id ${id} is not found` })
    }

    res.json({
        status: 'ok',
        data: book
    })
}

const createNewLibrary = async (req, res, next) => {
    try {
        //ANCHOR - mendapatkan req body / input from user
        const { library_name, address, employee_id, isbn } = req.body;

        const newLibrary = await Library.create({
            library_name,
            address,
            employee_id,
            isbn
        });
        //ANCHOR - send response to user
        res.status(200).json({
            status: 'ok',
            message: 'create successfully',
            data: newLibrary
        })
    } catch (err) {
        next(err);
    }

}

module.exports = { findAllLibrary, findPerpustakaanById, createNewLibrary }