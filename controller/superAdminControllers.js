const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { SuperAdmin } = require('../models');

const createAdminSuper = async (req, res, next) => {
    try {
        const { name, email, password, number_phone, role } = req.body;

        const createSuperAdmin = await SuperAdmin.create({
            name, email, password, number_phone, role
        });

        res.status(200).json({
            status: 'ok',
            message: 'Super Admin registered successfully',
            data: createSuperAdmin
        })

    } catch (error) {
        next(error);
    }
};


const loginAdminSuper = async (req, res, next) => {
    try {
        const { email, password } = req.body

        const superadmin = await SuperAdmin.findOne({ where: { email } });

        if (!superadmin) {
            return res.status(401).json({ message: 'email not have registered' });
        }
        const isMatch = await bcrypt.compare(password, superadmin.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Password Invalid' });
        }
        const token = jwt.sign({
            id: superadmin.id,
            role: superadmin.role,
        }, 'your_jwt_secret', { expiresIn: '1h' });

        res.json({
            token,
            superadmin: {
                id: superadmin.id,
                name: superadmin.name,
                email: superadmin.email,
                number_phone: superadmin.number_phone,
                role: superadmin.role,
            },
        });
    } catch (error) {
        next(error);
    }
}
module.exports = { createAdminSuper, loginAdminSuper }