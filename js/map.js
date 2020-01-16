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

//Funciones para crear markers, circle, circlemarkers y plygons.
//Markers
function saveMarker(){
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

//Circles y circlemarkers
function saveCircles(){
    var radius = layer.getRadius();
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";
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
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";
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
        var desc = "Punto y";

    if (type === 'marker') {
       saveMarker();
    }
    else if (type === 'circle' || 'circlemarker'){
        saveCircles();
    }else if (type === 'polygon'){
        savePolygon();
    }
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