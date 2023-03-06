const express = require('express');
const cors = require('cors');
const app = express();
const morgan = require('morgan');

//Configuraciones

app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2);
app.use(cors()); 
//midleware
app.use(morgan('dev')); //Obtiene el detalle de las solicitudes antes de ejecutar acciones en el servidor
app.use(express.urlencoded({extended: false})); //Entiende datos simples de formularios
app.use(express.json()); //Permite al servidor recibir y entender formatos JSON

//Routes (Rutas)
app.use(require('./routes/index')); 
app.use('/api/correo', require('./routes/correo')); 
app.use('/api', require('./routes/bdfungeneral')); 
app.use('/api/categoria', require('./routes/categoria'));

// empezando el servidor

app.listen(app.get('port'), () => {
    console.log(`Server on port ${3000}`);
});