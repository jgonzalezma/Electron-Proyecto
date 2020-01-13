var mymap = L.map('mapid').setView([43.3, -1.98], 13);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiamdvbnphbGV6bWEiLCJhIjoiY2s1YzhrNmxuMDVjODNucWYyemxzaGZzOSJ9.8D3kII0_gLRI2XS3jKCDAA', {
attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
maxZoom: 18,
id: 'mapbox/streets-v11',
accessToken: 'pk.eyJ1IjoiamdvbnphbGV6bWEiLCJhIjoiY2s1YzhrNmxuMDVjODNucWYyemxzaGZzOSJ9.8D3kII0_gLRI2XS3jKCDAA'
}).addTo(mymap);

//Marcadores
var marker = L.marker([43.3, -1.98]).addTo(mymap);

//Circulos
var circle = L.circle([51.508, -0.11], {
color: 'red',
fillColor: '#f03',
fillOpacity: 0.5,
radius: 500
}).addTo(mymap);

//Poligonos
var polygon = L.polygon([
[51.509, -0.08],
[51.503, -0.06],
[51.51, -0.047]
]).addTo(mymap);

//Popups
marker.bindPopup("<b>Punto 1</b><br>I am a popup.").openPopup();

//Clicks en el mapa
function onMapClick(e) {
alert("Has clickado en " + e.latlng);
}

mymap.on('click', onMapClick);