//express
//mssql
//bodyParser
//

const sql = require('mssql');
const express = require("express"); //Servidor
const bodyParser = require('body-parser'); //Parser de JSON
const app = express();
const config = {
  user:'',
  password:'',
  server: '',
  database: '',
  options:{
    encrypt: false //Opcional
  }
}

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

let user = { //JSON DE USUARIO
  userName:'',
  password:''
};

let container = { //JSON DE CONTENEDOR
  containerNum:'',
  dateS:'',
  timeS:'',
  dateE:'',
  timeE:''
};

let respuesta = {
  error: false,
  code: 200,
  message: ''
}

app.route('/user')
  .post(function (req, res){
    if(!req.body.name || !req.body.password){
      respuesta ={
        error: true,
        code: 502,
        message: 'El campo nombre y contraseña son requeridos'
      }
    }else{
      //Validaciones con base de datos
      var sql = require("mssql");

      var config = {
        user: '',
        password: '',
        server: '',
        database: ''
      };

      sql.connect(config, function (err){
        if(err) console.log(err);

        //Crear request object
        var request = new sql.Request();

        //Request a la base de datos y obtener los datos
        request.query('SELECT * FROM ', function (err, recordset){
          if(err) console.log(err);

          //Enviar datos como response
          res.send(recordset);
        });
      });

    }
  });

app.get('/', function (req, res){
  res.send("Saludos desde Express");
});

app.listen(3000, () => { //3000 = numero de puerto 
  console.log("El servidor esta inicializado en el puerto 3000")
});