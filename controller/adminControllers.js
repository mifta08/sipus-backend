const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { Admin, Library } = require('../models');

const findAllAdmin = async (req, res, next) => {
    try {
        const data = await Admin.findAll();

        const result = {
            status: 'ok',
            message: 'data get successfully',
            data: data
        }
        if (data === undefined && data === null) {
            return res.status(404).json({ status: 'failed', message: `data Admin with id ${id} is not found` })
        }
        res.json(result);
    } catch (err) {
        next(err);
    }
}

const findAdminById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const data = await Admin.findByPk(id);

        if (data) {
            const result = {
                status: 'ok',
                message: 'data Admin get successfully',
                data: data
            }
            res.json(result)
        } else if (data === null) {
            return res.status(404).json({
                status: 'failed',
                message: `data Admin with id ${id} is not found`
            })
        }

    } catch (error) {
        next(error);
    }
}

const createAdmin = async (req, res, next) => {
    try {
        const { name, role, employee_id, address, email, password } = req.body;

        const library = await Library.findOne({ where: { employee_id } });

        if (!library) {
            return res.status(400).json({
                status: 'error',
                message: 'Employee ID does not exist in Libraries'
            });
        }

        const newAdmin = await Admin.create({
            name, role, employee_id, address, email, password
        })

        res.status(200).json({
            status: 'ok',
            message: 'Admin registered successfully',
            data: newAdmin
        })
    } catch (error) {
        next(error);
    }
}


const loginAdmin = async (req, res, next) => {
    try {
        const { email, password } = req.body

        const admin = await Admin.findOne({ where: { email } });

        if (!admin) {
            return res.status(401).json({ message: 'email not have registered' });
        }
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Password Invalid' });
        }
        const token = jwt.sign({ id: admin.id, role: admin.role }, 'your_jwt_secret', { expiresIn: '1h' }
        );

        res.json({
            token,
            admin: {
                id: admin.id,
                name: admin.name,
                role: admin.role,
                employee_id: admin.employee_id,
                address: admin.address,
                email: admin.email,
            },
        });
    } catch (error) {
        next(error)
    }
}

const updateAdmin = async (req, res, next) => {
    try {
        const { name, employee_id, address, email, password } = req.body;

        const { id } = req.params;
        const data = await Admin.findByPk(id);

        if (data) {
            data.name = name;
            data.employee_id = employee_id;
            data.address = address;
            data.email = email;
            data.password = password;
            await data.save();
            res.json(data)
        } else {
            res.status(404).json({
                status: 'failed',
                message: `data Admin with id ${data} is not found`
            })
        }
    } catch (error) {
        next(error);
    }
}

const deleteAdmin = async (req, res, next) => {
    try {
        const { id } = req.params
        const data = await Admin.findByPk(id)

        if (data) {
            await data.destroy();
            res.json({
                status: 'success',
                message: `Admin with id ${id} was successfully deleted`
            })
        } else if (data === null) {
            return res.status(404).json({
                status: 'failed',
                message: `data Admin with id ${id} is not found`
            })

        }
    } catch (error) {
        next(error)
    }

}

module.exports = { findAllAdmin, findAdminById, createAdmin, loginAdmin, updateAdmin, deleteAdmin }