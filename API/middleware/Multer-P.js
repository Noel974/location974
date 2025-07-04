const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/factures');
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

router.post('/upload-facture/:id', upload.single('facturePDF'), async (req, res) => {
    try {
        const entretien = await Entretien.findByIdAndUpdate(req.params.id, { facturePDF: req.file.path }, { new: true });
        if (!entretien) {
            return res.status(404).json({ message: "Entretien non trouvé" });
        }
        return res.json({ message: "Facture ajoutée", entretien });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
