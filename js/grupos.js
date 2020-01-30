//TODO Recorrer los grupos que ya están y ponerlos en la lista
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mapa");
dbo.collection("grupos").find({}).toArray(function(err, result) {
  if (err) throw err;
  for(i = 0; i < result.length; i++){
    grupos.push(result[i]);
    $( "#contLista" ).append( "<li>"+result[i].nombre+"</li>" );
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
            $( "#contLista" ).append( "<li>"+nombre+"</li>" );
          });
        });
    }else if(result.value == "" || result.value == null){
      console.log("Cancelado por vacio");
    }else{
      console.log("Cancelado cancelar");
    }
  });
  });

  //TODO Poder borrar grupos desde la lista