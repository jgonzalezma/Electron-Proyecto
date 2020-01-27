//Variables globales
var desc;
var layer;
var arr  = [];
var grupos = [];
//Plugin de alertas
const Swal = require('sweetalert2');
//Plugin autoincrement de mongo
var autoIncrement = require("mongodb-autoincrement");
//JQuery
window.jQuery = window.$ = require('jquery');
//Conexion de Mongo
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

var map = L.map('map').setView([43.29, -1.98], 11);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiamdvbnphbGV6bWEiLCJhIjoiY2s1YzhrNmxuMDVjODNucWYyemxzaGZzOSJ9.8D3kII0_gLRI2XS3jKCDAA', {
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    accessToken: 'pk.eyJ1IjoiamdvbnphbGV6bWEiLCJhIjoiY2s1YzhrNmxuMDVjODNucWYyemxzaGZzOSJ9.8D3kII0_gLRI2XS3jKCDAA'
}).addTo(map);
     // FeatureGroup is to store editable layers
     //Toolbar de los marcadores del mapa
     var drawnItems = new L.FeatureGroup();
     map.addLayer(drawnItems);
     var drawControl = new L.Control.Draw({
         draw: {
          circlemarker: false
         },
         edit: {
             featureGroup: drawnItems
         }
     });
     map.addControl(drawControl);
//Ver escala
L.control.scale().addTo(map);

//Meter los grupos de la bd en el array de grupos
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mapa");
  dbo.collection("grupos").find({}).toArray(function(err, result) {
    for(i = 0; i < result.length; i++){
      grupos.push(result[i]);
    }
    if (err) throw err;
    console.log(grupos);
    db.close();
  });
});

/*function onMapClick(e) {
    console.log(e.latlng);
}
*/
//TODO Funciones para crear markers, circle, circlemarkers y polygons para simplificar el código


//Iterar grupos para añadir el resultado despues
var grupos_nombre = [];
for(i = 0; i < grupos.length; i++){
  grupos_nombre.push(grupos[i]);
}
console.log("grupos nombre" + grupos_nombre);

//Se ejecuta al crear un marker/circle/etc.
map.on('draw:created', function (e) {
    var type = e.layerType,
        layer = e.layer;
        var inputOptionsPromise = new Promise(function (resolve) {
          // get your data and pass it to resolve()
          setTimeout(function () {
              resolve({
                'Opcion' : grupos_nombre[0],
              })
          }, 2000)
        })
        Swal.mixin({
            input: 'text',
            confirmButtonText: 'Next &rarr;',
            showCancelButton: true,
            progressSteps: ['1', '2']
          }).queue([
            {
              title: 'Crear marcador',
              text: 'Introduce la descripción del marcador'
            },
            {
              title: 'Selecciona el grupo',
              input: 'select',
              inputOptions: inputOptionsPromise
            }
          ]).then((result) => {
            if (result.value) {
              desc = result.value[0];
              grupo = result.value[1];
              Swal.fire({
                title: '¡Marcador creado!',
                confirmButtonText: 'Salir'
              })
              console.log(e);
              if(desc !== ""){
                e.layer.bindPopup("<b>"+desc+"</b>");
              }
            }
            if (layer instanceof L.Marker) {
              //Guardo las coordenadas en variables lat y lng para luego crear el objeto con las variables
              lat = layer.getLatLng().lat;
              lng = layer.getLatLng().lng;
              var rId = Math.floor(Math.random() * 1000000000);
              var MongoClient = require('mongodb').MongoClient;
              var url = "mongodb://localhost:27017/";
              MongoClient.connect(url, function(err, db) {
                  if (err) throw err;
                  var dbo = db.db("mapa");
                  var myobj = { rId: rId, coordinates: [lat, lng], desc: desc, grupo: grupo };
                  dbo.collection("marcadores").insertOne(myobj, function(err, res) {
                      if (err) throw err;
                      console.log(e);
                      arr.push(e);
                      //TODO enviar alerta al servidor
                      db.close();
                  });
                  });
              map.addLayer(layer);
    }else if (layer instanceof L.Circle || layer instanceof L.CircleMarker){
        //e.layerType = "circlemarker";
        var center = layer.getLatLng();
        var radius = layer.getRadius();
        var rId = Math.floor(Math.random() * 1000000000);
        console.log(radius);
        var MongoClient = require('mongodb').MongoClient;
        var url = "mongodb://localhost:27017/";
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("mapa");
            var myobj = { rId: rId, coordinates: center, radius: radius, desc: desc, grupo: grupo };
            dbo.collection("circulos").insertOne(myobj, function(err, res) {
                if (err) throw err;
                console.log(e);
                console.log(e.layerType);
                //TODO enviar alerta al servidor
                db.close();
            });
            });
        map.addLayer(layer);
    }else if (layer instanceof L.Polygon){
        var latlngs = layer.getLatLngs()[0];
        var rId = Math.floor(Math.random() * 1000000000);
        var MongoClient = require('mongodb').MongoClient;
        var url = "mongodb://localhost:27017/";
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("mapa");
            var myobj = { rId: rId, latlngs: latlngs, desc: desc, grupo: grupo };
            dbo.collection("poligonos").insertOne(myobj, function(err, res) {
                if (err) throw err;
                console.log(latlngs);
                //TODO enviar alerta al servidor
                db.close();
            });
            });
    }else if(layer instanceof L.Polyline){
      var latlngs = layer.getLatLngs();
      var rId = Math.floor(Math.random() * 1000000000);
      var MongoClient = require('mongodb').MongoClient;
      var url = "mongodb://localhost:27017/";
      MongoClient.connect(url, function(err, db) {
          if (err) throw err;
          var dbo = db.db("mapa");
          var myobj = { rId: rId, latlngs: latlngs, desc: desc, grupo: grupo };
          dbo.collection("polilines").insertOne(myobj, function(err, res) {
              if (err) throw err;
              console.log("polyline");
              //TODO enviar alerta al servidor
              db.close();
          });
          });
    }
      })
    drawnItems.addLayer(layer); 
});

//Recorrer markers
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mapa");
    dbo.collection("marcadores").find({}).toArray(function(err, result) {
      if (err) throw err;
      for(i = 0; i < result.length; i++){
        var m = L.marker(result[i].coordinates).addTo(map);
        m.bindPopup("<b>"+result[i].desc+"</b>").openPopup();
        drawnItems.addLayer(m);
      }
      db.close();
  });
});

//Recorrer Circle y CircleMarker
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mapa");
    dbo.collection("circulos").find({}).toArray(function(err, result) {
      if (err) throw err;
      for(i = 0; i < result.length; i++){
        var m = L.circle(result[i].coordinates, {radius: result[i].radius}).addTo(map);
        m.bindPopup("<b>"+result[i].desc+"</b>").openPopup();      
        drawnItems.addLayer(m);
      }
      db.close();
  });
});

//Recorrer Polygons y rectangles
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mapa");
    dbo.collection("poligonos").find({}).toArray(function(err, result) {
      if (err) throw err;
      for(i = 0; i < result.length; i++){
        var m = L.polygon(result[i].latlngs).addTo(map);
        m.bindPopup("<b>"+result[i].desc+"</b>").openPopup();
        drawnItems.addLayer(m);
      }
      db.close();
  });
});

//Recorrer polylines
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mapa");
    dbo.collection("polilines").find({}).toArray(function(err, result) {
      if (err) throw err;
      for(i = 0; i < result.length; i++){
        var m = L.polyline(result[i].latlngs).addTo(map);
        //m.bindPopup("<b>"+result[i].desc+"</b>").openPopup();
        drawnItems.addLayer(m); 
      }
      db.close();
  });
});

//Se ejecuta al usar la opción de borrar
map.on('draw:deleted', function (e) {
  var layers = e.layers;
  layers.eachLayer(function (layer) {
      //TODO borrar marcador también de la BD aparte del layer
      MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("mapa");
        /*for(i=0; i < arr.length; i++){

        }*/
        var myquery = { rId: rId };
        dbo.collection("marcadores").deleteOne(myquery, function(err, obj) {
          if (err) throw err;
          console.log("Eliminado");
          db.close();
        });
      });
  });
});