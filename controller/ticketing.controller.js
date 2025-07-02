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

async function getAllTickets(req,res) {
    const tickets = await Ticket.findAll();
    if (tickets) {
        return res.json({
            success: true,
            message: 'Tiket berhasil didapatkan',
            data: tickets
        })
    } else {
        return res.status(404).json({
            success: false,
            message: 'Tiket masih kosong',
        })
    }
}

async function updateTicket(req,res) {
    const id = req.params.ticketId;
    const { pengomentar, komentar } = req.body;
    if (pengomentar && komentar) {
        const ticket = await Ticket.findByPk(id);
        if (ticket) {
            ticket.set({
                pengomentar: pengomentar,
                komentar: komentar,
                status: 'selesai'
            });
            const updatedTicket = await ticket.save();
            return res.json({
                success: true,
                message: 'Tiket berhasil diupdate',
                data: updatedTicket
            });
        } else {
            return res.status(404).json({
                success: false,
                message: 'Tiket tidak ditemukan',
            })
        }
    } else {
        return res.status(400).json({
            success: false,
            message: 'Pengomentar dan komentar harus diisi',
        })
    }
}

module.exports = { addTicket, getTickets, getAllTickets, updateTicket };