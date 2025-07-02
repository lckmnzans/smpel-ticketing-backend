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
    const id = req.params.id;
    if (id) {

    } else {

    }
}

async function updateTicket(req,res) {
    const { id, komentar, userId } = req.body;
}

module.exports = { addTicket, getTickets, updateTicket };