const { Router } = require('express');
const nodemailer = require("nodemailer");
const router = Router();
const authCred = { user: 'rcordova.reco@gmail.com', pass: 'iwndewlzkgsckovg' };
router.post('/sendmail', (req, res) => {
    const body = req.body;
    const idmail = body.idmail;
    const data = body.datos;
    let asunto = 'Solicitud de Información'
    let ContenMsj;
    if (idmail == 1) {
        ContenMsj = MailSolicitudInfo(data);
    } else if (idmail == 2) {
        asunto = 'Solicitud de Información - Arma tu Taller'
        ContenMsj = MailArmaTaller(data);
    } else if (idmail == 3) {
        asunto = 'Solicitud de Registro de Garantía';
        ContenMsj = MailRegistroGarantia(data);
    } else if (idmail == 4) {
        ContenMsj = MailContacto(data);
    } else if (idmail == 5) {
        asunto = 'Solicitud de Información - Cursos Online';
        ContenMsj = MailFormularioGeneral(data);
    } else if (idmail == 6) {
        asunto = 'Solicitud de Reparación';
        ContenMsj = MailRegistroReparacion(data);
    } 
     
    SendMail(asunto, ContenMsj).then((data) => { res.send(data); });
    SendMailConfirmation(MailConfirmacion(data), data.scorreo)
});

function SendMail(pasunto, phtml) {
    let transporter = nodemailer.createTransport({ service: 'gmail', auth: authCred});  

    let mailOptions = {
        from: 'info@obd2soluciones.com',
        to: `info@obd2soluciones.com, rcordova.reco@gmail.com`,
        subject: pasunto,
        html: phtml
    };
    
    return new Promise((a, b) => {transporter.sendMail(mailOptions, function(err, data) { if (err) { a(err); /* a(false);  */} else { a(true); }}); });
    
}
function SendMailConfirmation(phtml, pmailSolic) {
    let transporter = nodemailer.createTransport({ service: 'gmail', auth: authCred});
    let mailOptions = {
        from: 'info@obd2soluciones.com',
        to: `${pmailSolic}`,
        subject: 'OBD2 Soluciones - Solicitud Enviada',
        html: phtml
    };
    return new Promise((a, b) => {transporter.sendMail(mailOptions, function(err, data) { if (err) { a(err); /* a(false);  */} else { a(true); }}); });
}
function MailConfirmacion(pDatosSolic) {
    let htmlContent = '';
    htmlContent = `		<h3>Hola ${pDatosSolic.snombre === undefined ? '': pDatosSolic.snombre }!</h3>
        <p>Hemos recibido tu solicitud, en breve uno de nuestros asesores de servicio se comunicará contigo.</p>
        <div>
            <table>
                <tr>
                    <td rowspan="2">
                        <img src="https://firebasestorage.googleapis.com/v0/b/obd2-soluciones.appspot.com/o/test%2FlogoOBD2%2Flogo_obd2_1.png?alt=media&token=e6194c43-113e-4eae-ae98-8a568fb77568" 
                                width="70px" height="70px">
                    </td>
                    <td style="vertical-align: text-top;">
                        Atención al cliente.
                        <br />
                        +51 981 479 369
                        <br />
                        <a href="http://c0rvax.obd2soluciones.com/#/">www.obd2soluciones.com</a>
                    </td>
                </tr>
                <tr>
                    <td></td>
                </tr>
            </table>
        </div>`
    return htmlContent;

}
function MailSolicitudInfo(pDatosSolic) {
    let htmlConten;
    htmlConten = `<div>
            <h2>Solicitud de Información</h2>    
        </div>
        <div>
            <table>           
                <tbody>
                    <tr>
                        <td><strong>Cliente: </strong></td>
                        <td>${pDatosSolic.snombre}</td>
                    </tr>
                    <tr>
                        <td><strong>Telefono: </strong></td>
                        <td>${pDatosSolic.stelefono}</td>
                    </tr>
                    <tr>
                        <td><strong>Email: </strong></td>
                        <td>${pDatosSolic.scorreo}</td>
                    </tr>
                </tbody>
            </table>
            <br />
            <div>
                <div><strong>Comentario: </strong></div>
                <div>${pDatosSolic.scomentario}</div>
            </div>
        </div>`
    return htmlConten;
}
function MailArmaTaller(pDatosSolic) {
    let htmlConten;
    let htmllista = '';
  
    pDatosSolic.lstcategoria.forEach(element => {
        htmllista += `<li>${element.sdescripcion}</li>`
    });
    htmlConten = 
        `<div>
            <h2>Solicitud de Información - Arma tu Taller</h2>    
        </div>
        <div>
            <table>           
                <tbody>
                    <tr>
                        <td><strong>Cliente: </strong></td>
                        <td>${pDatosSolic.snombre}</td>
                    </tr>                    
                    <tr>
                        <td><strong>Email: </strong></td>
                        <td>${pDatosSolic.scorreo}</td>
                    </tr>
                </tbody>
            </table>
            <br />
            <div>
                <div><strong>Comentario: </strong></div>
                <div>${pDatosSolic.scomentario}</div>
            </div>
        </div>
        <div>
            <ul>
                ${htmllista}
            </ul>
        </div>`
    return htmlConten;
}
function MailRegistroGarantia(pDatosSolic) {
    let htmlConten;
    htmlConten = `<div>
            <h2>Solicitud de Registro de Garantía de Equipo</h2>    
        </div>
        <div>
            <table>           
                <tbody>
                    <tr>
                        <td><strong>Equipo: </strong></td>
                        <td>${pDatosSolic.sequipo}</td>
                    </tr>
                    <tr>
                        <td><strong>Número de Serie: </strong></td>
                        <td>${pDatosSolic.snumeroserie}</td>
                    </tr>
                    <tr>
                        <td><strong>DNI o RUC: </strong></td>
                        <td>${pDatosSolic.sdocumento}</td>
                    </tr>
                    <tr>
                        <td><strong>Nro. de Boleta o Factura: </strong></td>
                        <td>${pDatosSolic.snroboleta}</td>
                    </tr>
                    <tr>
                        <td><strong>Asesor que lo atendió: </strong></td>
                        <td>${pDatosSolic.sasesoratendio}</td>
                    </tr>
                    <tr>
                        <td><strong>Nombre del Taller: </strong></td>
                        <td>${pDatosSolic.staller}</td>
                    </tr>
                    <tr>
                        <td><strong>Dirección: </strong></td>
                        <td>${pDatosSolic.sdireccion}</td>
                    </tr>
                    <tr>
                        <td><strong>Ciudad: </strong></td>
                        <td>${pDatosSolic.sciudad}</td>
                    </tr>
                    <tr>
                        <td><strong>Provincia: </strong></td>
                        <td>${pDatosSolic.sprovincia}</td>
                    </tr>
                    <tr>
                        <td><strong>Teléfono de Contacto: </strong></td>
                        <td>${pDatosSolic.stelefonocontato}</td>
                    </tr>                                                          
                </tbody>
            </table>
            <br />
            <div>
                <div><strong>Comentario: </strong></div>
                <div>${pDatosSolic.scomentarios}</div>
            </div>
        </div>`
    return htmlConten;
}
function MailContacto(pDatosSolic) {
    let htmlConten;
    htmlConten = `<div>
            <h2>Solicitud de Información</h2>    
        </div>
        <div>
            <table>           
                <tbody>
                    <tr>
                        <td><strong>Nombre: </strong></td>
                        <td>${pDatosSolic.snombre}</td>
                    </tr> 
                    <tr>
                        <td><strong>Ciudad: </strong></td>
                        <td>${pDatosSolic.sciudad.snombre}</td>
                    </tr>                                   
                    <tr>
                        <td><strong>Teléfono de Contacto: </strong></td>                   
                        <td>${pDatosSolic.stelefono}</td>
                    </tr>
                    <tr>
                        <td><strong>Email: </strong></td>
                        <td>${pDatosSolic.scorreo}</td>
                    </tr>                  
                </tbody>
            </table>
            <br />
            <div>
                <div><strong>Comentario: </strong></div>
                <div>${pDatosSolic.scomentario}</div>
            </div>
        </div>`
    return htmlConten;
}
function MailFormularioGeneral(pDatosSolic) {
    let htmlConten;
    htmlConten = `<div>
            <h2>Solicitud de Información - Cursos Online</h2>    
        </div>
        <div>
            <table>           
                <tbody>
                    <tr>
                        <td><strong>Nombre: </strong></td>
                        <td>${pDatosSolic.snombre}</td>
                    </tr>                                                     
                    <tr>
                        <td><strong>Teléfono de Contacto: </strong></td>                   
                        <td>${pDatosSolic.stelefono}</td>
                    </tr>
                    <tr>
                        <td><strong>Ciudad: </strong></td>
                        <td>${pDatosSolic.sciudad}</td>
                    </tr>  
                    <tr>
                        <td><strong>Email: </strong></td>
                        <td>${pDatosSolic.scorreo}</td>
                    </tr>   
                    <tr>
                        <td><strong>Curso de Interés: </strong></td>
                        <td>${pDatosSolic.scurso}</td>
                    </tr>               
                </tbody>
            </table>
            <br />
            <div>
                <div><strong>Comentario: </strong></div>
                <div>${pDatosSolic.scomentario}</div>
            </div>
        </div>`
    return htmlConten;
}
function MailRegistroReparacion(pDatosSolic) {
    let htmlConten;
    htmlConten = `<div>
            <h2>Solicitud de Reparación</h2>    
        </div>
        <div>
            <table>           
                <tbody>
                    <tr>
                        <td><strong>Nombre: </strong></td>
                        <td>${pDatosSolic.snombre}</td>
                    </tr>  
                    <tr>
                        <td><strong>Teléfono de Contacto: </strong></td>                   
                        <td>${pDatosSolic.sruc}</td>
                    </tr>                                                   
                    <tr>
                        <td><strong>Teléfono de Contacto: </strong></td>                   
                        <td>${pDatosSolic.stelefono}</td>
                    </tr>
                    <tr>
                        <td><strong>Email: </strong></td>
                        <td>${pDatosSolic.scorreo}</td>
                    </tr>
                    <tr>
                        <td><strong>Equipo a Reparar: </strong></td>
                        <td>${pDatosSolic.sequipo}</td>
                    </tr>
                    <tr>
                        <td><strong>Descripción de la Anomalía: </strong></td>
                        <td>${pDatosSolic.sdescripcion}</td>
                    </tr>
                    <tr>
                        <td><strong>Fecha de Compra: </strong></td>
                        <td>${pDatosSolic.sfechaCompra}</td>
                    </tr>          
                </tbody>
            </table>
        </div>`
    return htmlConten;
}
module.exports = router;