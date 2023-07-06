// SUNUCUYU BU DOSYAYA KURUN
const express = require("express");
const server = express();

const userModel = require("./users/model");
server.use(express.json());

server.post("/api/users", async (req, res) => {
    try {
        const { name, bio } = req.body;
        if (!name || !bio) {
            res.status(400).json({ message: "Lütfen kullanıcı için bir name ve bio sağlayın" });
        } else {
            const inserted = await userModel.insert({ name: name, bio: bio });
            res.status(201).json(inserted)
        }
    } catch (error) {
        res.status(500).json({ message: "Veritabanına kaydedilirken bir hata oluştu" })
    }
});

server.get("/api/users/", async (req, res) => {
    try {
        const allUsers = await userModel.find();
        res.json(allUsers);
    } catch (error) {
        res.status(500).json({ message: "Kullanıcı bilgileri alınamadı" })
    }
});

server.get(`/api/users/:id`, async(req, res) => {
    try {
        const user = await userModel.findById(req.params.id);
        if (!user) {
            res.status(404).json({ message: "Belirtilen ID'li kullanıcı bulunamadı" })
        } else {
            res.json(user);
        }
        
    } catch (error) {
        res.status(500).json({ message: "Kullanıcı bilgisi alınamadı" })
    }
})

server.delete(`/api/users/:id`, async(req, res) => {
    try {
        const user = await userModel.findById(req.params.id);
        if (!user) {
            res.status(404).json({ message: "Belirtilen ID'li kullanıcı bulunamadı" })
        } else {
            const deleted = await userModel.remove(req.params.id)
            res.json(deleted)
        }
        
    } catch (error) {
        res.status(500).json({ message: "Kullanıcı silinemedi" })
    }
})

server.put(`/api/users/:id`, async(req, res) => {
    try {
        const user = await userModel.findById(req.params.id);
        const {name, bio} = req.body;
        if (!user) {
            res.status(404).json({ message: "Belirtilen ID'li kullanıcı bulunamadı" })
        } else if (!name || !bio) {
            res.status(400).json({ message: "Lütfen kullanıcı için name ve bio sağlayın" });
        } else if (user && name && bio) {
            const updated = await userModel.update(req.params.id, {name: name, bio: bio})
            res.json(updated)
        }
    } catch (error) {
        res.status(500).json({ message: "Kullanıcı bilgileri güncellenemedi" })
    }
})



module.exports = server; // SERVERINIZI EXPORT EDİN {}
