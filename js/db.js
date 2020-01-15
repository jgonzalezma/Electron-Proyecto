var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mapa");
  dbo.collection("mapa").find({}).toArray(function(err, result) {
    if (err) throw err;
    var marker2 = L.marker(result[0].coordinates).addTo(map);
    marker2.bindPopup("<b>"+result[0].desc+"</b>").openPopup();
    db.close();
  });
});