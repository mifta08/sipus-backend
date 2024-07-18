

const { Member, Library } = require('../models');
const jwt = require('jsonwebtoken');

const findAllMember = async (req, res, next) => {
    try {

        const data = await Member.findAll();

        const result = {
            status: 'ok',
            message: 'data member get successfully',
            data: data
        }
        if (data === undefined && data === null) {
            return res.status(404).json({ status: 'failed', message: `data member is not found` })
        }
        res.json(result);

    } catch (error) {
        next(error);
    }
}

const findMemberById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = await Member.findByPk(id);

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
                message: `data Member with id ${id} is not found`
            })
        }

    } catch (error) {
        next(error)
    }
}

const createMember = async (req, res, next) => {
    try {
        const {
            name,
            address,
            number_phone,
            library_id,
            role
        } = req.body;

        const library = await Library.findOne({ where: { library_id } });

        if (!library) {
            return res.status(400).json({
                status: 'error',
                message: 'Library ID does not exist in Libraries'
            });
        }

        const newMember = await Member.create({
            name,
            address,
            number_phone,
            library_id,
            role
        })

        res.status(200).json({
            status: 'ok',
            message: 'Admin registered successfully',
            data: newMember
        })
    } catch (error) {
        next(error);
    }
}

const updateMember = async (req, res, next) => {
    try {
        const {
            name,
            address,
            number_phone,
            library_id,
            role
        } = req.body;

        const { id } = req.params;
        const data = await Member.findByPk(id);

        if (data) {
            data.name = name;
            data.address = address;
            data.number_phone = number_phone;
            data.library_id = library_id;
            data.role = role;
            await data.save();
            res.json(data)
        } else {
            res.status(404).json({
                status: 'failed',
                message: `data Library with id ${id} is not found`
            })
        }

    } catch (error) {
        next(error);
    }
}

const loginMember = async (req, res, next) => {
    try {
        const { number_phone } = req.body

        const member = await Member.findOne({ where: { number_phone } });

        if (!member) {
            return res.status(401).json({ message: 'member not have registered' });
        }

        if (member.role !== 'user') {
            return res.status(401).json({ message: 'Unauthorized access' });
        }

        const token = jwt.sign({ id: member.id, role: member.role }, 'your_jwt_secret', { expiresIn: '1h' })

        res.status(200).json({
            message: 'Authentication successful',
            token,
            member: {
                id: member.id,
                name: member.name,
                address: member.address,
                number_phone: member.number_phone,
                role: member.role,
                library_id: member.library_id
            },
        });
    } catch (error) {
        next(error)
    }
}

const deleteMember = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = await Member.findByPk(id);

        if (data) {
            await data.destroy();
            res.json({
                status: 'success',
                message: `Member with id ${id} was successfully deleted`
            })
        } else if (data === null) {
            return res.status(404).json({
                status: 'failed',
                message: `data Member with id ${id} is not found`
            })
        }
    } catch (error) {
        next(error);
    }
}

module.exports = { createMember, loginMember, findAllMember, findMemberById, updateMember, deleteMember }