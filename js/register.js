$("#btnRegistrar").click(function(){
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    //Guarda el usuario en bd
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("mapa");
        var myobj = { name: username, password: password };
        dbo.collection("usuarios").insertOne(myobj, function(err, res) {
            if (err) throw err;
            console.log("Usuario insertado");
            //Redirecciona al mapa
            document.location.href= 'map.html';
            db.close();
        });
    });
});