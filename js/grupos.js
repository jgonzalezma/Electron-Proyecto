//Recorrer los grupos que ya están y los pone en la lista
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mapa");
dbo.collection("grupos").find({}).toArray(function(err, result) {
  if (err) throw err;
  for(i = 0; i < result.length; i++){
    grupos.push(result[i]);
    $( "#contLista" ).append( "<p>"+result[i].nombre+"<p><input type='hidden' value="+result[i].rId+">" );
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
    showCancelButton: true,
    cancelButtonText: 'Cancelar',        
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
            $( "#contLista" ).append( "<p>"+nombre+"</p><input class='hi' type='hidden' value="+rId+">" );
          });
        });
    }else if(result.value == "" || result.value == null){
      console.log("Cancelado por vacio");
    }else{
      console.log("Cancelado cancelar");
    }
  });
  });

//TODO editar desc con el boton del popup
$(".btnDesc").on('click', function(event){
  Swal.fire({
    title: "Editar descripción",
    text: "Introduce una nueva descripción:",
    input: 'text',
    showCancelButton: true,
    cancelButtonText: 'Cancelar',      
  }).then((result) => {
    if (result.value) {
        var MongoClient = require('mongodb').MongoClient;
        var url = "mongodb://localhost:27017/";
        var desc = result.value;
        var rId = Math.floor(Math.random() * 1000000000);
  
        MongoClient.connect(url, function(err, db) {
          if (err) throw err;
          var dbo = db.db("mapa");
          var myobj = { rId: rId, desc: desc };
          //db update
        });
    }else if(result.value == "" || result.value == null){
      console.log("Cancelado por vacio");
    }else{
      console.log("Cancelado cancelar");
    }
  });
});

//TODO Poder borrar grupos desde la lista
  /*$(".deleteGrupo").on("click", function(){
    Swal.fire({
      title: '¿Estás seguro de eliminar el grupo?',
      text: "No podrás revertir el cambio",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        //TODO eliminar grupo seleccionado
        MongoClient.connect(url, function(err, db) {
          if (err) throw err;
          var dbo = db.db("mapa");
          var rId = 1;
          var myquery = { rId: rId };
          dbo.collection("grupos").deleteOne(myquery, function(err, obj) {
            if (err) throw err;
            console.log("Grupo eliminado");
            db.close();
          });
        });
        Swal.fire(
          '¡Eliminado!',
          'El grupo ha sido eliminado',
          'success'
        )
      }
    })
  });*/
$(".deleteGrupo").on("click", function(){
  Swal.fire({
    title: "Eliminar Grupo",
    text: "Introduce el nombre del grupo a eliminar:",
    input: 'text',
    showCancelButton: true,
    cancelButtonText: 'Cancelar',        
  }).then((result) => {
    if (result.value) {
        var MongoClient = require('mongodb').MongoClient;
        var url = "mongodb://localhost:27017/";
        var nombre = result.value;
  
        MongoClient.connect(url, function(err, db) {
          if (err) throw err;
          var dbo = db.db("mapa");
          var myquery = { nombre: nombre };
          dbo.collection("grupos").deleteOne(myquery, function(err, obj) {
            if (err) throw err;
            console.log("Grupo eliminado");
            db.close();
          });
        });
    }else if(result.value == "" || result.value == null){
      console.log("Cancelado por vacio");
    }else{
      console.log("Cancelado cancelar");
    }
  });
});