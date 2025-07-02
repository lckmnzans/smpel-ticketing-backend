const { User } = require('../models');
const { Op } = require('sequelize');
const crypto = require('crypto');
const { encoded } = require('../utils/auth');

async function registerAccount(req,res) {
    const { email, password } = req.body;

    const [user,created] = await User.findOrCreate({
        where: { email: email },
        defaults: {
            email: email,
            password: hashPassword(password)
        }
    })

    if (created) {
        return res.json({
            success: true,
            message: 'Account created successfully',
            data: user
        });
    }
    return res.json({
        success: false,
        message: 'Email already exists'
    })
}

async function loginAccount(req,res) {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.json({
            success: false,
            message: 'Email and password are required'
        });
    }

    const user = await User.findOne({ where: { email: email }});
    if (!user) {
        return res.status(404).json({
            success: false,
            message: 'Email does not exists'
        });
    } else {
        const hashedPassword = hashPassword(password);
        if (hashedPassword == user.password) {
            const token = encoded({
                id: user.id,
                email: user.email
            })
            return res.json({
                success: true,
                message: 'Login successful',
                data: {
                    id: user.id,
                    email: user.email,
                    token: token
                }
            });
        } else {
            return res.status(401).json({
                success: false,
                message: 'Invalid password'
            });
        }
    }
}

function hashPassword(password) {
    let hash = crypto.createHash('md5').update(password).digest("hex");
    return hash;
}

module.exports = { registerAccount, loginAccount };