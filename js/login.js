  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDmqVh-kOMvG9OKzm7DJ8xaopIiqH8gV20",
    authDomain: "rescate-7d908.firebaseapp.com",
    databaseURL: "https://rescate-7d908.firebaseio.com",
    projectId: "rescate-7d908",
    storageBucket: "rescate-7d908.appspot.com",
    messagingSenderId: "314282166465",
    appId: "1:314282166465:web:3ba4027b9fa01d613bec40",
    measurementId: "G-Y2PPTR06X5"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

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

