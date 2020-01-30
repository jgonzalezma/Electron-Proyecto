//Recorrer los grupos que ya están y los pone en la lista
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mapa");
dbo.collection("grupos").find({}).toArray(function(err, result) {
  if (err) throw err;
  for(i = 0; i < result.length; i++){
    grupos.push(result[i]);
    $( "#contLista" ).append( "<p>"+result[i].nombre+"<input type='button' onclick='miFuncion()' class='deleteGrupo' value='Eliminar'/><p><input type='hidden' value="+result[i].rId+">" );
  }
  db.close();
});
});
//Crear grupos a través del botón
$("#crearBtn").click(function(){
    Swal.fire({
    title: "Crear Grupo",
    text: "Introduce el nombre del grupo:",
    input: 'text',
    showCancelButton: true        
  }).then((result) => {
    if (result.value) {
        var MongoClient = require('mongodb').MongoClient;
        var url = "mongodb://localhost:27017/";
        var nombre = result.value;
        var rId = Math.floor(Math.random() * 1000000000);
  
        MongoClient.connect(url, function(err, db) {
          if (err) throw err;
          var dbo = db.db("mapa");
          var myobj = { rId: rId, nombre: nombre };
          dbo.collection("grupos").insertOne(myobj, function(err, res) {
            if (err) throw err;
            console.log("grupo insertado");
            db.close();
            grupos.push(myobj);
            console.log(grupos);
            $( "#contLista" ).append( "<p>"+nombre+"<input type='button' onclick='miFuncion()' class='deleteGrupo' value='Eliminar'/></p><input class='hi' type='hidden' value="+rId+">" );
          });
        });
    }else if(result.value == "" || result.value == null){
      console.log("Cancelado por vacio");
    }else{
      console.log("Cancelado cancelar");
    }
  });
  });

//TODO Editar desc con el boton de editar
$(".btnDesc").on('click', function(event){
  event.stopPropagation();
  event.stopImmediatePropagation();
  console.log("funciona btnDesc");
});

//TODO agregar voluntario desde el boton en electron
$("#agregarVoluntario").click(function(){
  console.log("agregar voluntario");
  Swal.fire({
    title: "Agregar voluntario",
    text: "Introduce el nombre del voluntario:",
    input: 'text',
    showCancelButton: true        
  }).then((result) => {
    if (result.value) {
        var MongoClient = require('mongodb').MongoClient;
        var url = "mongodb://localhost:27017/";
    }
  });
});

//TODO Poder borrar grupos desde la lista
function miFuncion(){
  var rId = $(".hi").val();
  console.log(rId);
}