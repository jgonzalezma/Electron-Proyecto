const bcrypt = require('bcryptjs');
var password = document.getElementById('password').value;
bcrypt.hash(password, 10, function(err, hash) {
    console.log(hash);
    $("#btnRegistrar").click(function(){
        var username = document.getElementById('username').value;
        //Guarda el usuario en bd
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("mapa");
            var myobj = { name: username, password: hash };
            dbo.collection("usuarios").insertOne(myobj, function(err, res) {
                if (err) throw err;
                console.log("Usuario insertado");
                //Redirecciona al mapa
                document.location.href= 'map.html';
                db.close();
            });
        });
    });
  });

//encriptar password https://www.abeautifulsite.net/hashing-passwords-with-nodejs-and-bcrypt