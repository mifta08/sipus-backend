const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { Admin } = require('../models');
const findAllAdmin = async (req, res, next) => {
    try {
        const data = await Admin.findAll();

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

const findAdminById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const data = await Admin.findByPk(id);

        if (data) {
            const result = {
                status: 'ok',
                message: 'data admin get successfully',
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

const registerAdmin = async (req, res, next) => {
    try {
        const { name, employee_id, address, email, password } = req.body;

        const newAdmin = await Admin.create({
            name, employee_id, address, email, password
        })

        res.status(200).json({
            status: 'ok',
            message: 'User registered successfully',
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
            return res.sstatus(401).json({ message: 'Invalid credentials' });
        }
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: admin.id }, 'your_jwt_secret', { expiresIn: '1h' }
        );

        res.json({
            token,
            admin: {
                id: admin.id,
                name: admin.name,
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

module.exports = { findAllAdmin, findAdminById, registerAdmin, loginAdmin, updateAdmin, deleteAdmin }