const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { User } = require('../models');

const findAllUser = async (req, res, next) => {
    try {
        const data = await User.findAll();

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

const findUserById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const data = await User.findByPk(id);

        if (data) {
            const result = {
                status: 'ok',
                message: 'data User get successfully',
                data: data
            }
            res.json(result)
        } else if (data === null) {
            return res.status(404).json({
                status: 'failed',
                message: `data User with id ${id} is not found`
            })
        }

    } catch (error) {
        next(error);
    }
}

const registerUser = async (req, res, next) => {
    try {
        const { name, role, employee_id, address, email, password } = req.body;

        const newUser = await User.create({
            name, role, employee_id, address, email, password
        })

        res.status(200).json({
            status: 'ok',
            message: 'User registered successfully',
            data: newUser
        })
    } catch (error) {
        next(error);
    }
}

const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(401).json({ message: 'email not have registered' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Password Invalid' });
        }
        const token = jwt.sign({ id: user.id }, 'your_jwt_secret', { expiresIn: '1h' }
        );

        res.json({
            token,
            user: {
                id: user.id,
                name: user.name,
                role: user.role,
                employee_id: user.employee_id,
                address: user.address,
                email: user.email,
            },
        });
    } catch (error) {
        next(error)
    }
}

const updateUser = async (req, res, next) => {
    try {
        const { name, employee_id, address, email, password } = req.body;

        const { id } = req.params;
        const data = await User.findByPk(id);

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
                message: `data User with id ${data} is not found`
            })
        }
    } catch (error) {
        next(error);
    }
}

const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params
        const data = await User.findByPk(id)

        if (data) {
            await data.destroy();
            res.json({
                status: 'success',
                message: `User with id ${id} was successfully deleted`
            })
        } else if (data === null) {
            return res.status(404).json({
                status: 'failed',
                message: `data User with id ${id} is not found`
            })

        }
    } catch (error) {
        next(error)
    }

}

module.exports = { findAllUser, findUserById, registerUser, loginUser, updateUser, deleteUser }