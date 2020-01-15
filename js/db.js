var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

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

//Recorrer CircleMarker
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
//Recorrer Circle
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mapa");
    dbo.collection("circulos").find({}).toArray(function(err, result) {
      if (err) throw err;
      for(i = 0; i < result.length; i++){
        var m = L.circle(result[i].coordinates).addTo(map);
        m.bindPopup("<b>"+result[i].desc+"</b>").openPopup();
      }
      db.close();
  });
});