const { Router } = require('express');
const mysql = require('mysql');
const router = Router();
const dbconfig = { 
    host: 'obd2soluciones.com',
    user: 'obd2_usrprod',
    password: 'O"mny"9102',
    database: 'obd2_BD_OBD2_WEB',
    port: 3306
}


router.post('/srv_fnc_general', (req, res) => {
    let  connection = mysql.createConnection(dbconfig);
    const fnc_name = req.body.snombre;
    const fnc_param = req.body.svalues;
    const fnc_param_Count = Object.keys(fnc_param).length;
    let sCantidadParams = '';
    for (let x = 1; x <= fnc_param_Count; x++) { sCantidadParams += '?,'; }    
    sCantidadParams = sCantidadParams.substring(sCantidadParams.length - 1, sCantidadParams);    
    if(connection) connection.destroy();
    console.log('paso 1');
    connection = mysql.createConnection(dbconfig);
    connection.connect(function(error){
        if(error){
            console.log('_____error_____');
            console.log(error)
            res.send(error);
            throw error.message;
        }else{
            connection.query(`CALL ${fnc_name}(${sCantidadParams})`, fnc_param.PARAM, function(err, rows, fields) {
                const result = rows[0];
                res.json(result);
                connection.destroy();
            });
        }
     });     
});
/*SECCION LOGIN*/
router.post('/srv_fnc_ValidarUsuario', (req, res) => {
    let  connection = mysql.createConnection(dbconfig);
    const fnc_name = req.body.snombre;
    const fnc_param = req.body.svalues;
    if(connection) connection.destroy();
    connection = mysql.createConnection(dbconfig);
    connection.connect(function(error){
        if(error) { res.send(error); throw error.message;
        }else{
            connection.query(
                `CALL ${fnc_name}(?,?)`, 
                [ fnc_param.PARAM.susuario, fnc_param.PARAM.sclave ], 
                function(err, rows, fields) { const result = rows[0]; res.json(result); connection.destroy();}
            );
        }
     }); 
});
/*SECCION PRODUCTOS*/
router.post('/srv_fnc_UpdateProducto', (req, res) => {
    let  connection = mysql.createConnection(dbconfig);
    const fnc_name = req.body.snombre;
    const fnc_param = req.body.svalues;
    if(connection) connection.destroy();
    connection = mysql.createConnection(dbconfig);
    connection.connect(function(error){
        if(error) { res.send(error); throw error.message;
        }else{
            connection.query(
                `CALL ${fnc_name}(?,?,?,?,?,?,?,?,?)`, 
                [
                    fnc_param.PARAM.nidproducto, fnc_param.PARAM.scodigo, fnc_param.PARAM.snombre, fnc_param.PARAM.nprecio, 
                    fnc_param.PARAM.nidcategoria, fnc_param.PARAM.sdescrip, fnc_param.PARAM.imgUrl, fnc_param.PARAM.nestado,
                    fnc_param.PARAM.sfichatecUrl
                ], 
                function(err, rows, fields) { const result = rows[0]; res.json(result); connection.destroy();}
            );
        }
     }); 
});
router.post('/srv_fnc_ActualizaProductoOrden', (req, res) => {
    let  connection = mysql.createConnection(dbconfig);
    const fnc_name = req.body.snombre;
    const fnc_param = req.body.svalues;
    if(connection) connection.destroy();
    connection = mysql.createConnection(dbconfig);
    connection.connect(function(error){
        if(error) { res.send(error); throw error.message;
        }else{
            console.log(fnc_param.PARAM);
            connection.query(
                `CALL ${fnc_name}(?,?)`, 
                [
                    fnc_param.PARAM.nidproducto, fnc_param.PARAM.orden
                ], 
                function(err, rows, fields) { const result = rows[0]; res.json(result); connection.destroy();}
            );
        }
     }); 
});
/*SECCION CATALOGO*/
router.post('/srv_fnc_RegistrarCatalogo', (req, res) => {
    let  connection = mysql.createConnection(dbconfig);
    const fnc_name = req.body.snombre;
    const fnc_param = req.body.svalues;
    if(connection) connection.destroy();
    connection = mysql.createConnection(dbconfig);
    connection.connect(function(error){
        if(error) { res.send(error); throw error.message;
        }else{
            connection.query(
                `CALL ${fnc_name}(?,?,?)`, 
                [
                    fnc_param.PARAM.anio, fnc_param.PARAM.mes, fnc_param.PARAM.enlace
                ], 
                function(err, rows, fields) { const result = rows[0]; res.json(result); connection.destroy();}
            );
        }
     }); 
});
router.post('/srv_fnc_EliminaCatalogo', (req, res) => {
    let  connection = mysql.createConnection(dbconfig);
    const fnc_name = req.body.snombre;
    const fnc_param = req.body.svalues;
    if(connection) connection.destroy();
    connection = mysql.createConnection(dbconfig);
    connection.connect(function(error){
        if(error) { res.send(error); throw error.message;
        }else{            
            connection.query(
                `CALL ${fnc_name}(?,?)`, 
                [
                    fnc_param.PARAM.anio, fnc_param.PARAM.mes
                ], 
                function(err, rows, fields) { const result = rows[0]; res.json(result); connection.destroy();}
            );
        }
     }); 
});
/*SECCION CATEGORIA*/
router.post('/srv_fnc_ActualizaCategoria', (req, res) => {
    let  connection = mysql.createConnection(dbconfig);
    const fnc_name = req.body.snombre;
    const fnc_param = req.body.svalues;
    if(connection) connection.destroy();
    connection = mysql.createConnection(dbconfig);
    connection.connect(function(error){
        if(error) { res.send(error); throw error.message;
        }else{            
            connection.query(
                `CALL ${fnc_name}(?,?,?)`, 
                [
                    fnc_param.PARAM.nidcategoria, fnc_param.PARAM.sdescripcion, fnc_param.PARAM.nestado 
                ], 
                function(err, rows, fields) { console.log('err',err); const result = rows[0]; res.json(result); connection.destroy();}
            );
        }
     }); 
});
router.post('/srv_fnc_ActualizaCategoriaOrden', (req, res) => {
    let  connection = mysql.createConnection(dbconfig);
    const fnc_name = req.body.snombre;
    const fnc_param = req.body.svalues;
    if(connection) connection.destroy();
    connection = mysql.createConnection(dbconfig);
    connection.connect(function(error){
        if(error) { res.send(error); throw error.message;
        }else{
            connection.query(
                `CALL ${fnc_name}(?,?)`, 
                [
                    fnc_param.PARAM.nidcategoria, fnc_param.PARAM.orden
                ], 
                function(err, rows, fields) { console.log('err',err); const result = rows[0]; res.json(result); connection.destroy();}
            );
        }
     }); 
});
/*SECCION NOTICIA*/
router.post('/srv_fnc_Noticia', (req, res) => {
    let  connection = mysql.createConnection(dbconfig);
    const fnc_name = req.body.snombre;
    const fnc_param = req.body.svalues;
    if(connection) connection.destroy();
    connection = mysql.createConnection(dbconfig);
    connection.connect(function(error){ 
        if(error) { res.send(error); throw error.message;
        }else{
            connection.query(
                `CALL ${fnc_name}(?,?,?,?,?,?)`, 
                [
                    fnc_param.PARAM.idnoticia, fnc_param.PARAM.titulo, fnc_param.PARAM.contenido,
                    fnc_param.PARAM.enlace, fnc_param.PARAM.imgurl, fnc_param.PARAM.estado  
                ], 
                function(err, rows, fields) { console.log('err',err); const result = rows[0]; res.json(result); connection.destroy();}
            );
        }
     }); 
});
/*SECCION NOVEDADES*/
router.post('/srv_fnc_RegistrarNovedades', (req, res) => {
    let  connection = mysql.createConnection(dbconfig);
    const fnc_name = req.body.snombre; 
    const fnc_param = req.body.svalues;
    if(connection) connection.destroy();
    connection = mysql.createConnection(dbconfig);
    connection.connect(function(error){  
        if(error) { res.send(error); throw error.message;
        }else{
            console.log(fnc_param.PARAM);
            connection.query(
                `CALL ${fnc_name}(?,?)`, 
                [
                    fnc_param.PARAM.producto.nidproducto, fnc_param.PARAM.imgurl
                ], 
                function(err, rows, fields) { console.log('err',err); const result = rows[0]; res.json(result); connection.destroy();}
            );
        }
     }); 
});
router.post('/srv_fnc_CrearCuenta', (req, res) => {
    let  connection = mysql.createConnection(dbconfig);
    const fnc_name = req.body.snombre; 
    const fnc_param = req.body.svalues;
    if(connection) connection.destroy();
    connection = mysql.createConnection(dbconfig);
    connection.connect(function(error){  
        if(error) { res.send(error); throw error.message;
        }else{
            console.log(fnc_param.PARAM);
            connection.query(
                `CALL ${fnc_name}(?,?,?,?)`, 
                [
                    fnc_param.PARAM.nombres, fnc_param.PARAM.apellidos,
                    fnc_param.PARAM.correo, fnc_param.PARAM.clave,
                ], 
                function(err, rows, fields) { console.log('err',err); const result = rows[0]; res.json(result); connection.destroy();}
            );
        }
     }); 
});
/*SECCION CONTENIDO*/
router.post('/srv_fnc_ActualizaContenido', (req, res) => {
    let  connection = mysql.createConnection(dbconfig);
    const fnc_name = req.body.snombre; 
    const fnc_param = req.body.svalues;
    if(connection) connection.destroy();
    connection = mysql.createConnection(dbconfig);
    connection.connect(function(error){  
        if(error) { res.send(error); throw error.message;
        }else{
            console.log(fnc_param.PARAM);
            connection.query(
                `CALL ${fnc_name}(?,?,?)`, 
                [
                    fnc_param.PARAM.P_CODIGO, fnc_param.PARAM.P_ITEM, fnc_param.PARAM.P_VALOR
                ], 
                function(err, rows, fields) { console.log('err',err); const result = rows[0]; res.json(result); connection.destroy();}
            );
        }
     }); 
});
/*SECCION PEDIDOS*/
router.post('/srv_fnc_RegistrarPedido', (req, res) => {
    let  connection = mysql.createConnection(dbconfig);
    const fnc_name = req.body.snombre; 
    const fnc_param = req.body.svalues;
    if(connection) connection.destroy();
    connection = mysql.createConnection(dbconfig);
    connection.connect(function(error){  
        if(error) { res.send(error); throw error.message;
        }else{
            console.log(fnc_param.PARAM);
            connection.query(
                `CALL ${fnc_name}(?,?,?,?)`, 
                [
                    fnc_param.PARAM.P_CODIGO, fnc_param.PARAM.P_ITEM, fnc_param.PARAM.P_VALOR
                ], 
                function(err, rows, fields) { console.log('err',err); const result = rows[0]; res.json(result); connection.destroy();}
            );
        } 
     }); 
});
/*SECICON CONSTANTES*/
router.post('/srv_fnc_ActualizaConstante', (req, res) => {
    let  connection = mysql.createConnection(dbconfig);
    const fnc_name = req.body.snombre; 
    const fnc_param = req.body.svalues;
    if(connection) connection.destroy();
    connection = mysql.createConnection(dbconfig);
    connection.connect(function(error){  
        if(error) { res.send(error); throw error.message;
        }else{
            console.log('PARAM', fnc_param.PARAM);
            connection.query(
                `CALL ${fnc_name}(?,?,?,?,?)`, 
                [
                    fnc_param.PARAM.codigo, fnc_param.PARAM.item, fnc_param.PARAM.valor, fnc_param.PARAM.desccorta, fnc_param.PARAM.desclarga
                ], 
                function(err, rows, fields) { console.log('err',err); const result = rows[0]; res.json(result); connection.destroy();}
            );
        }
     }); 
});
router.post('/srv_fnc_RegistrarConstante', (req, res) => {
    let  connection = mysql.createConnection(dbconfig);
    const fnc_name = req.body.snombre; 
    const fnc_param = req.body.svalues;
    if(connection) connection.destroy();
    connection = mysql.createConnection(dbconfig);
    connection.connect(function(error){  
        if(error) { res.send(error); throw error.message;
        }else{
            console.log('PARAM', fnc_param.PARAM);
            connection.query(
                `CALL ${fnc_name}(?,?,?,?,?)`, 
                [
                    fnc_param.PARAM.codigo, fnc_param.PARAM.item, fnc_param.PARAM.valor, fnc_param.PARAM.desccorta, fnc_param.PARAM.desclarga
                ], 
                function(err, rows, fields) { console.log('err',err); const result = rows[0]; res.json(result); connection.destroy();}
            );
        }
     }); 
}); 

module.exports = router;

/*
$ git add .
$ git commit -am "make it better"
$ git push heroku master
*/