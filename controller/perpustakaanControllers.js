const perpustakaan = [
    { id: 1, nama_perpustakaan: 'perpus 1', description: 'ini adalah perpus 1' },
    { id: 2, nama_perpustakaan: 'perpus 2', description: 'ini adalah perpus 2' },
    { id: 3, nama_perpustakaan: 'perpus 3', description: 'ini adalah perpus 3' },
    { id: 4, nama_perpustakaan: 'perpus 4', description: 'ini adalah perpus 4' }
];

const findAllPerpustakaan = (req, res) => {

    const data = perpustakaan

    //ANCHOR - create Response json
    const result = {
        status : 'ok',
        data: data
    }
    res.json(result)
}

const findPerpustakaanById = (req, res) => {
    const {id} = req.params

    let book 
    for (let i = 0; i < perpustakaan.length; i++) {
        if (perpustakaan[i].id === Number(id)) {
            book = perpustakaan[i]
        }
    }
    if (book === undefined) {
        return res.status(404).json({ status: 'failed', message:`data book with id ${id} is not found` })
    }

    res.json({
        status: 'ok',
        data: book
    })
}

const createNewPerpustakaan = (req, res) => {
    //ANCHOR - mendapatkan req body / input from user
    const { nama_perpustakaan, description } = req.body;

    //ANCHOR - mendapatkan new id
    const lastIdPerpus = perpustakaan[perpustakaan.length - 1].id
    const newIdPerpus = lastIdPerpus + 1

    //ANCHOR - Menambahkan perpustakaan ke db
    const newPerpus = {id: newIdPerpus, nama_perpustakaan: nama_perpustakaan, description: description} 
    perpustakaan.push(newPerpus)

    //ANCHOR - send response to user
    res.status(200).json({
        status: 'ok',
        message: 'create successfully',
        data: newPerpus
    })
}

module.exports = {findAllPerpustakaan, findPerpustakaanById, createNewPerpustakaan}