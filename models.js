const Sequelize = require('sequelize');
const { DataTypes } = require('sequelize');

const sequelize = new Sequelize('postgres://postgres:990909123@localhost:5432/ticketing');
sequelize.authenticate()
.then(() => {
    console.log('Connection has been established successfully.');
})
.catch(() => {
    console.error('Unable to connect to the database:', err);
});

const User = sequelize.define('users', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    email: DataTypes.STRING,
    password: DataTypes.STRING,
}, {
    timestamps: false
}
);

module.exports = { User };