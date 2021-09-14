var myMap = L.map("map-id", {
  center: [38.89511, -77.03637],
  zoom: 6,
});

// Map Background
var map = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
});

// var map = L.map("map-id").setView([51.505, -0.09], 13);

// L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//   attribution:
//     '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
// }).addTo(map);

// L.marker([51.5, -0.09])
//   .addTo(map)
//   .bindPopup("A pretty CSS3 popup.<br> Easily customizable.")
//   .openPopup();

// Data URL
var data = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

console.log(data);

// Get Data With JSON
d3.json(data, function (info) {
  function mapStyles(features) {
    return {
      opacity: 1,
      fillOpacity: 1,
      fillColor: colors(features.properties.mag),
      color: "white",
      radius: radius(features.properties.mag),
      stroke: true,
      weight: 0.5,
    };
  }
  // Creating Map

  function colors(magnitude) {
    switch (true) {
      case magnitude > 5:
        return "black";
      case magnitude > 4:
        return "brown";
      case magnitude > 3:
        return "red";
      case magnitude > 2:
        return "orange";
      case magnitude > 1:
        return "yellow";
      default:
        return "green";
    }
  }

  function radius(magnitude) {
    if (magnitude === 0) {
      return 1;
    }
    return magnitude * 4;
  }

  L.data(info, {
    pointToLayer: function (features, latlon) {
      return L.circleMarker(latlon);
    },

    style: mapStyles,

    onEachFeature: function (features, layer) {
      layer.bindPopup(
        "Magnitude: " + features.properties.mag + "</br>" + "Location: " + features.properties.place
      );
    },
  }).addTo(myMap);

  var legend = L.control({ position: "bottomright" });

  legend.onAdd = function (map) {
    var div = L.DomUtil.create("div", "info legend"),
      grades = [0, 1, 2, 3, 4, 5];

    div.innerHTML = "Earthquake<br>Magnitudes<br><hr";

    for (var i = 0; i < grades.length; i++) {
      div.innerHTML +=
        "<i style=background:" +
        colors(grades[i] + 1) +
        '">&nbsp&nbsp&nbsp&nbsp</i> ' +
        grades[i] +
        (grades[i + 1] ? "&ndash;" + grades[i + 1] + "<br>" : "+");
    }

    return div;
  };

  legend.addTo(myMap);
});
