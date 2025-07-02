async function addTicket(req,res) {
    return res.json({
        "status": 200,
        "message": "Validated",
    })
    const { namaLengkap, email, kontak, judul, detail, status } = req.body;
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