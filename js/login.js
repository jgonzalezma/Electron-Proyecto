var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
require('sweetalert2');
$( "#loginbtn" ).click(function() {
  $("form").validate();
    /*var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    console.log(username + "\n" + password);
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("mapa");
      dbo.collection("usuarios").findOne({}, function(err, result) {
        if (err) throw err;
        console.log(result.name);
        //Redirecciona al mapa
        document.location.href= 'map.html';
        db.close();
      });
    });*/

  });