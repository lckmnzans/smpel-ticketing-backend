const { Ticket } = require('../models');

async function addTicket(req,res) {
    const { namaLengkap, email, kontak, judul, detail, status, asosiasiDokumen, userId } = req.body;

    const ticket = await Ticket.create({
        namaLengkap: namaLengkap,
        email: email,
        kontak: kontak,
        judul: judul,
        detail: detail,
        komentar: "",
        pengomentar: "",
        status: status,
        asosiasiDokumen: asosiasiDokumen,
        userId: userId
    })
    return res.json({
        success: true,
        message: "Ticket berhasil dibuat",
        data: ticket
    })
}

async function getTickets(req,res) {
    const userId = req.params.userId;
    const ticketId = req.query.ticketId;
    if (ticketId) {
        // find one ticket based on ticket id
        const ticket = await Ticket.findByPk(ticketId);
        if (ticket) {
            return res.json({
                success: true,
                message: 'Tiket berhasil didapatkan',
                data: ticket
            });
        }
        return res.status(404).json({
            success: false,
            message: 'Tiket tidak ditemukan',
        })
    } else {
        // find all tickets based on user id
        const tickets = await Ticket.findAll({
            where: {
                userId: userId
            },
        });
        if (tickets) {
            return res.json({
                success: true,
                message: 'Tiket berhasil didapatkan',
                data: tickets
            });
        }
        return res.status(404).json({
            success: false,
            message: 'Tiket tidak ditemukan',
        })
    }
}

async function updateTicket(req,res) {
    const { id, komentar, userId } = req.body;
}

module.exports = { addTicket, getTickets, updateTicket };