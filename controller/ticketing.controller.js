const { Ticket } = require('../models');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const documentDir = process.env.FILE_STORAGE_PATH || path.join(__dirname, '..', 'uploads');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, documentDir);
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, req.body.ticketId + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});
const uploadDocument = multer({ storage: storage });

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
    const ticketId = req.query?.ticketId;
    if (ticketId) {
        const tickets = await Ticket.findByPk(ticketId);
        if (tickets && tickets.asosiasiDokumen) {
            return res.download(`${documentDir}/${tickets.asosiasiDokumen}`, `${ticketId}.pdf`, (err) => {
                if (err) return res.send('Terjadi kesalahan: ', + err.message);
            })
        } else if (tickets && !tickets.asosiasiDokumen) {
            return res.status(400).json({
                success: false,
                message: 'Tidak ada dokumen yang terkait dengan tiket ini',
            })
        }
    }

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

async function updateTicketWithDocAttachment(req,res) {
    uploadDocument.single('file')(req,res, async (err) => {
        if (err) {
            return res.status(err.message === 'WrongFileType' ? 400 : 500).json({
                success: false,
                message: `Gagal mengunggah file. Error : ${err.message}`,
            });
        }
        if (!req.body?.ticketId) {
            return res.status(400).json({
                success: false,
                message: 'tiketId harus diisi',
            })
        }

        const ticket = await Ticket.findByPk(req.body.ticketId);
        ticket.asosiasiDokumen = req.file.filename;
        const updatedTicket = await ticket.save();

        return res.json({
            success: true,
            message:'File sukses diunggah',
            data: {
                ticket: updatedTicket,
                file: {
                    ticketId: req.body?.ticketId,
                    filename: req.file.filename,
                    url: req.file.path,
                }
            }
        });
    })
}

module.exports = { addTicket, getTickets, getAllTickets, updateTicket, updateTicketWithDocAttachment };