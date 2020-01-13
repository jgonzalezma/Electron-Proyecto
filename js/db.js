var mymap = L.map('mapid').setView([51.505, -0.09], 13);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiamdvbnphbGV6bWEiLCJhIjoiY2s1Nmw3dDkxMDVzMjNlcG1zZWV6Y2h1bCJ9.MFxOeTeuyFurtNlQOEJYkQ', {
attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
maxZoom: 18,
id: 'mapbox/streets-v11',
accessToken: 'pk.eyJ1IjoiamdvbnphbGV6bWEiLCJhIjoiY2s1Nmw3dDkxMDVzMjNlcG1zZWV6Y2h1bCJ9.MFxOeTeuyFurtNlQOEJYkQ'
}).addTo(mymap);