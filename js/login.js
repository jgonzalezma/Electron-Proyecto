$( "#loginbtn" ).click(function() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    console.log(username + "\n" + password);
    document.location.href= 'map.html';
  });  

