const { User } = require('../models');
const { Op } = require('sequelize');
const crypto = require('crypto');

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
    const user = {
        email, password
    }
}

function hashPassword(password) {
    let hash = crypto.createHash('md5').update('some_string').digest("hex");
    return hash;
}

module.exports = { registerAccount, loginAccount };