const { Router } = require('express');
const mysql = require('mysql');

const router = Router();
const connection = mysql.createConnection({
   host: 'obd2soluciones.com',
   user: 'obd2_usrprod',
   password: 'O"mny"9102',
   database: 'obd2_BD_OBD2_WEB',
   port: 3306
});

router.post('/testbd', (req, res) => {
    console.log('Iniciando conexion');
    connection.connect(function(error){
        if(error){
            res.send(error.message);
            throw error.message;
        }else{
            console.log('Conexion correcta.');
            connection.query('CALL USP_SEL_CATEGORIAS()', function(err, rows, fields) {
                connection.end();
                console.log(rows);
                res.json(rows);
            });
        }
     });
     
});

module.exports = router;