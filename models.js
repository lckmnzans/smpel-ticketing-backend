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
    role: DataTypes.STRING
}, {
    timestamps: false
}
);

const Ticket = sequelize.define('tickets', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    namaLengkap: DataTypes.STRING,
    email: DataTypes.STRING,
    kontak: DataTypes.STRING,
    judul: DataTypes.STRING,
    detail: DataTypes.STRING,
    komentar: DataTypes.STRING,
    status: DataTypes.STRING,
    pengomentar: DataTypes.STRING,
    asosiasiDokumen: DataTypes.STRING
}, {
    timestamps: false
})

User.hasMany(Ticket);
Ticket.belongsTo(User);

module.exports = {
    syncronize: async () => {
        await sequelize.sync({ alter: true })
    },
    User,
    Ticket
}