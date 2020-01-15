var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mapa");
  dbo.collection("mapa").find({}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result[2].coordinates);
    console.log(result[2].desc)
    var marker2 = L.marker(result[2].coordinates).addTo(mymap);
    marker2.bindPopup("<b>"+result[2].desc+"</b>").openPopup();
    db.close();
  });
});