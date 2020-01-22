//Variables globales
var desc;
//Plugin de alertas
const Swal = require('sweetalert2')
//JQuery
window.jQuery = window.$ = require('jquery');
//Conexion de Mongo
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

var map = L.map('map', {drawControl:true}).setView([43.29, -1.98], 11);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiamdvbnphbGV6bWEiLCJhIjoiY2s1YzhrNmxuMDVjODNucWYyemxzaGZzOSJ9.8D3kII0_gLRI2XS3jKCDAA', {
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    accessToken: 'pk.eyJ1IjoiamdvbnphbGV6bWEiLCJhIjoiY2s1YzhrNmxuMDVjODNucWYyemxzaGZzOSJ9.8D3kII0_gLRI2XS3jKCDAA'
}).addTo(map);

//Ver escala
L.control.scale().addTo(map);

function onMapClick(e) {
    console.log(e.latlng);
}

map.on('click', onMapClick);
//Funcion para preguntar el nombre del marcador

//Recorrer markers
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mapa");
      dbo.collection("marcadores").find({}).toArray(function(err, result) {
        if (err) throw err;
        for(i = 0; i < result.length; i++){
          var m = L.marker(result[i].coordinates).addTo(map);
          m.bindPopup("<b>"+result[i].desc+"</b>").openPopup();
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
        }
        db.close();
    });
  });
  //Recorrer Polygons
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mapa");
      dbo.collection("poligonos").find({}).toArray(function(err, result) {
        if (err) throw err;
        for(i = 0; i < result.length; i++){
          var m = L.Polygon(result[i].coordinates).addTo(map);
          m.bindPopup("<b>"+result[i].desc+"</b>").openPopup();
        }
        db.close();
    });
  });

//Funciones para crear markers, circle, circlemarkers y polygons.
//Markers
function saveMarker(){
       // Do whatever else you need to. (save to db, add to map etc)
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
}

//Circles y circlemarkers
function saveCircles(){
    var radius = layer.getRadius();
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("mapa");
        var myobj = { coordinates: [lat, lng], radius: radius, desc: desc };
        dbo.collection("circulos").insertOne(myobj, function(err, res) {
            if (err) throw err;
            console.log(e);
            db.close();
        });
        });
    map.addLayer(layer);
}

//Polygon
function savePolygon(){
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("mapa");
        var myobj = { coordinates: [lat, lng], desc: desc };
        dbo.collection("poligonos").insertOne(myobj, function(err, res) {
            if (err) throw err;
            console.log(e);
            db.close();
        });
        });
    map.addLayer(layer);
}

map.on('draw:created', function (e) {
    var type = e.layerType,
        layer = e.layer;
        //Guardo las coordenadas en variables lat y lng para luego crear el objeto con las variables
        var lat = layer.getLatLng().lat;
        var lng = layer.getLatLng().lng;
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
              console.log(desc);
            }
          })
          
        //location.reload();

    if (type === 'marker') {
              // Do whatever else you need to. (save to db, add to map etc)
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
    }
    else if (type === 'circle' || 'circlemarker'){
        var radius = layer.getRadius();
        console.log(radius);
        var MongoClient = require('mongodb').MongoClient;
        var url = "mongodb://localhost:27017/";
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("mapa");
            var myobj = { coordinates: [lat, lng], radius: radius, desc: "F" };
            dbo.collection("circulos").insertOne(myobj, function(err, res) {
                if (err) throw err;
                console.log(e);
                db.close();
            });
            });
        map.addLayer(layer);
    }else if (type === 'polygon'){
        var MongoClient = require('mongodb').MongoClient;
        var url = "mongodb://localhost:27017/";
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("mapa");
            var myobj = { coordinates: [lat, lng], desc: "F" };
            dbo.collection("poligonos").insertOne(myobj, function(err, res) {
                if (err) throw err;
                console.log(e);
                db.close();
            });
            });
        map.addLayer(layer);
    }
}); 

//https://www.npmjs.com/package/electron-osx-prompt