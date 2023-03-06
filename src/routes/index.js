const { Router } = require('express');
const router = Router();

router.get('/test', (req, res) => {
    const data = {
        "name": "Corvax",
        "descrp": "Prueba de servior"
    }
    res.json(data);
});

module.exports = router;