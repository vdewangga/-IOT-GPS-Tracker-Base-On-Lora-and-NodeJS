// connect ke socket io di port 3000
const socket = io('http://localhost:3000');

document.addEventListener('DOMContentLoaded', renderMap)

async function renderMap(){
    socket.on('liveLocation', data=> {
        console.log(data)
        let x = data.Lat;
        let y = data.Long;
        const latLng = [x, y]
        marker.setLatLng(latLng).setPopupContent(popup);
    })
    
    var x;
    var y;
    
    await $.ajax({
        type: "GET",
        url: "http://localhost:8080/pinpoint",
        success : function(response)
        {
            console.log(response[0].Lat)
            x = response[0].Lat;
            y = response[0].Long;
        }
    })
    var mymap = L.map('mapid').setView([x, y], 15);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 25,
        id: 'mapbox/outdoors-v11',
        accessToken: 'pk.eyJ1IjoidmRld2FuZ2dhIiwiYSI6ImNrNjZnZzBmNTA0ZjQzbG9idXVqZHo5bXMifQ.HbHI_ekkAAgarjN-YgrmRA'
    }).addTo(mymap);
    var popup = '<b><span> Name:</span> </b>';
    var marker = L.marker([x, y]).addTo(mymap);
}