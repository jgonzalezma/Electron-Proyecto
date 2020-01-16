  // Your web app's Firebase configuration
  var config = {
    apiKey: "AIzaSyDmqVh-kOMvG9OKzm7DJ8xaopIiqH8gV20",
    authDomain: "rescate-7d908.firebaseapp.com",
    databaseURL: "https://rescate-7d908.firebaseio.com",
    projectId: "rescate-7d908",
    storageBucket: "rescate-7d908.appspot.com",
    messagingSenderId: "314282166465",
    appId: "1:314282166465:web:0e3e7c8fe401c4493bec40",
    measurementId: "G-N8L2F6HK9C"
  };
 
  if (!firebase.apps.length) {
    firebase.initializeApp({});
 }

$( "#loginbtn" ).click(function() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    console.log(username + "\n" + password);
    document.location.href= 'map.html';
  }); 

$("#register").click(function(){
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    firebase.auth().createUserWithEmailAndPassword(username, password).catch(function(error){
        if(error != null){
            console.log(error.message);
            return;
        }
        console.log("Usuario creado!");
    });
});

