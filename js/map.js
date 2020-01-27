//Variables globales
var desc;
var layer;
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

/*function onMapClick(e) {
    console.log(e.latlng);
}
*/
//TODO Funciones para crear markers, circle, circlemarkers y polygons para simplificar el código

//Se ejecuta al crear un marker/circle/etc.
map.on('draw:created', function (e) {
    var type = e.layerType,
        layer = e.layer;
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
            'Introduce el nombre del grupo'
          ]).then((result) => {
            if (result.value) {
              desc = result.value[0];
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
              var MongoClient = require('mongodb').MongoClient;
              var url = "mongodb://localhost:27017/";
              MongoClient.connect(url, function(err, db) {
                  if (err) throw err;
                  var dbo = db.db("mapa");
                  var myobj = { coordinates: [lat, lng], desc: desc };
                  dbo.collection("marcadores").insertOne(myobj, function(err, res) {
                      if (err) throw err;
                      console.log(e);
                      db.close();
                  });
                  });
              map.addLayer(layer);
    }else if (layer instanceof L.Circle || layer instanceof L.CircleMarker){
        e.layerType = "circlemarker";
        var center = layer.getLatLng();
        var radius = layer._radius;
        var mRadius = layer.getRadius();
        console.log(radius);
        var MongoClient = require('mongodb').MongoClient;
        var url = "mongodb://localhost:27017/";
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("mapa");
            var myobj = { coordinates: center, radius: radius, mRadius: mRadius, desc: desc };
            dbo.collection("circulos").insertOne(myobj, function(err, res) {
                if (err) throw err;
                console.log(e);
                console.log(e.layerType);
                db.close();
            });
            });
        map.addLayer(layer);
    }else if (layer instanceof L.Polygon){
        var latlngs = layer.getBounds();
        var MongoClient = require('mongodb').MongoClient;
        var url = "mongodb://localhost:27017/";
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("mapa");
            var myobj = { latlngs: latlngs, desc: desc };
            dbo.collection("poligonos").insertOne(myobj, function(err, res) {
                if (err) throw err;
                console.log("rectangulo o polygon");
                console.log(e);
                db.close();
            });
            });
    }else if(layer instanceof L.Polyline){
      var latlngs = layer.getLatLng();
      var MongoClient = require('mongodb').MongoClient;
      var url = "mongodb://localhost:27017/";
      MongoClient.connect(url, function(err, db) {
          if (err) throw err;
          var dbo = db.db("mapa");
          var myobj = { coordinates: latlngs, desc: desc };
          dbo.collection("polilines").insertOne(myobj, function(err, res) {
              if (err) throw err;
              console.log("rectangulo o polygon");
              console.log(e);
              db.close();
          });
          });
    }
      })
    drawnItems.addLayer(layer); 
});

//Se ejecuta al usar la opción de borrar
map.on('draw:deleted', function (e) {
  var layers = e.layers;
  layers.eachLayer(function (layer) {
      //TODO borrar marcador también de la BD aparte del layer
      MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("mapa");
        var id;
        var myquery = { _id: id };
        dbo.collection("marcadores").deleteOne(myquery, function(err, obj) {
          if (err) throw err;
          console.log("Eliminado");
          db.close();
        });
      });
  });
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
        //console.log(result[i]._id); 
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
        var m = L.circleMarker(result[i].coordinates).addTo(map);
        m.bindPopup("<b>"+result[i].desc+"</b>").openPopup();
        m.setRadius(result[i].radius);
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
        var m = L.Polygon(result[i].coordinates).addTo(map);
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
        var m = L.Polygon(result[i].coordinates).addTo(map);
        //m.bindPopup("<b>"+result[i].desc+"</b>").openPopup();
        drawnItems.addLayer(m); 
      }
      db.close();
  });
});