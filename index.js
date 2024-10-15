const express = require ('express');
const pug = require ('pug');
const mysql = require('mysql2');
const app = express();


const con = mysql.createConnection({
    port: 3306,
    host:'localhost',
    user:'root',
    password:'',
    database:'testpugsql2'
});

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.static('public'));
app.listen(3000, () => {
    console.log('Server is listening on port 3000')
});
app.use(express.urlencoded());

app.get('/medicos', (req, res) => {

//Recuperar medicos desde la BD
 con.query('SELECT * FROM medicos', (err, medicos) => {
    if(err) {
        throw new error('No pudo consultar los medicos')
    }
    if(req.query.nombre) 
    {
        res.render('medicos/listar', {medicos:medicos, nombre:req.query.nombre});
    }
    else
    {
        res.render('medicos/listar', {medicos:medicos});
    }
   
});
    
}); 

app.post('/medicos', (req, res) => {

    const nombre = req.body.nombre;
    const mail = req.body.mail;
        con.query(`INSERT INTO medicos (nombre, mail) VALUES ('${nombre}', '${mail}')`, (err, result) => {
            if(err) {
                throw new error('No pudo insertar el medico')
            }
            //res.redirect('/medicos?nombre=' + nombre);
        });

    
})
app.get ('/medicos/create', (req, res) => {
    res.render('medicos/crear.pug');
});