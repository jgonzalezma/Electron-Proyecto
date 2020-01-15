var map = L.map('map', {drawControl:true}).setView([43.29, -1.98], 12);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiamdvbnphbGV6bWEiLCJhIjoiY2s1YzhrNmxuMDVjODNucWYyemxzaGZzOSJ9.8D3kII0_gLRI2XS3jKCDAA', {
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    accessToken: 'pk.eyJ1IjoiamdvbnphbGV6bWEiLCJhIjoiY2s1YzhrNmxuMDVjODNucWYyemxzaGZzOSJ9.8D3kII0_gLRI2XS3jKCDAA'
}).addTo(map);

//Marcadores
var marker = L.marker([43.29, -1.98]).addTo(map);

//Circulos
var circle = L.circle([51.508, -0.11], {
color: 'red',
fillColor: '#f03',
fillOpacity: 0.5,
radius: 500
}).addTo(map);

//Poligonos
var polygon = L.polygon([
[51.509, -0.08],
[51.503, -0.06],
[51.51, -0.047]
]).addTo(map);

//Popups
marker.bindPopup("<b>Punto 1</b><br>I am a popup.").openPopup();

//Ver escala
L.control.scale().addTo(map);

function onMapClick(e) {
    console.log(e.latlng);
}

map.on('click', onMapClick);
//Funcion para preguntar el nombre del marcador


map.on('draw:created', function (e) {
    var type = e.layerType,
        layer = e.layer;
        //Guardo las coordenadas en variables lat y lng para luego crear el objeto con las variables
        var lat = layer.getLatLng().lat;
        var lng = layer.getLatLng().lng;

    if (type === 'marker') {
        // Do marker specific actions
    }

    // Do whatever else you need to. (save to db, add to map etc)
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";

    MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mapa");
    var myobj = { coordinates: [lat, lng], desc: "Punto x" };
    dbo.collection("mapa").insertOne(myobj, function(err, res) {
        if (err) throw err;
        console.log("Coordenadas insertadas");
        db.close();
    });
    });
    map.addLayer(layer);
});

