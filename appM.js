// create variable to store sample data
const sample_data = "G7_AQI_Countries.json"


function buildcharts(country) {
    console.log("testing buildcharts function");
    d3.json(sample_data, function(err, data) {
    //d3.json(sample_data).then(function(data) {
      //console.log(data);
     

      // Create variables
      let values = data.data[country]
      let aqis = data.columns

      //needle gauge1
    let datagauge1 = [
      {
          domain: { x: [0, 1], y: [0, 1] },
          value: values[0],
          title: { text: "Avg Ozone AQI" },
          type: "indicator",
          mode: "gauge+number"
          
  
          //delta: { reference: 400 },
          //gauge: { axis: { range: [null, 60] } }
      }
  ];
  
  var layout = { width: 400, height: 500, margin: { t: 0, b: 0 } };
  Plotly.newPlot('gauge', datagauge1, layout);
  
 
  //filter
   //let sampleArray2 = samples.filter(sampleObject => sampleObject.id == sample);
   //console.log(sampleArray);

   //let sampleResult2 = sampleArray[1];
   //console.log(sampleResult);

  //needle gauge2
  let datagauge2 = [
      {
          domain: { x: [0, 1], y: [0, 1] },
          value: values[1],
          title: { text: "Avg NO2 AQI" },
          type: "indicator",
          mode: "gauge+number"
          //delta: { reference: 400 },
          //gauge: { axis: { range: [null, 60] } }
      }
  ];
  
  var layout = { width: 400, height: 500, margin: { t: 0, b: 0 } };
  Plotly.newPlot('gauge2', datagauge2, layout);
  
  

   //filter
   //let sampleArray3 = samples.filter(sampleObject => sampleObject.id == sample);
   //console.log(sampleArray);

   //let sampleResult3 = sampleArray[2];
   //console.log(sampleResult);

  //needle gauge3
  let datagauge3 = [
      {
          domain: { x: [0, 1], y: [0, 1] },
          value: values[2],
          title: { text: "Avg PM2.5 AQI" },
          type: "indicator",
          mode: "gauge+number"
          //delta: { reference: 400 },
          //gauge: { axis: { range: [null, 60] } }
      }
  ];
  
  var layout = { width: 400, height: 500, margin: { t: 0, b: 0 } };
  Plotly.newPlot('gauge3', datagauge3, layout);



  let traceBubble = {
    x: aqis,
    y: values,
    type: 'bar'
  }

  let dataBubble = [traceBubble]

  let layoutBubble = {
    title: "G7 Countries AQI",
    showlegend: false,
    xaxis: {title: "AQIs"},
    yaxis: {title: "Values"}
  }

  Plotly.newPlot('bubble', dataBubble, layoutBubble);
    
    });
};



//Event Listener
function optionChanged(newCountry) {
  //build charts with new sample
  buildcharts(newCountry);
};

d3.csv('G7_demo_aqi.csv', function(err, rows){

    function unpack(rows, key) {
        return rows.map(function(row) { return row[key]; });
    }

    var countryName = unpack(rows, 'Country'),
        countryPop = unpack(rows, 'Population'),
        countryGdp = unpack(rows, 'GDP ($ per capita)'),
        countryOzone = unpack(rows, 'Avg Ozone AQI'),
        countryNo2 = unpack(rows, 'Avg NO2 AQI'),
        countryPm25 = unpack(rows, 'Avg PM2.5 AQI'),
        countryLat = unpack(rows, 'lat'),
        countryLng = unpack(rows, 'lng'),
        countrySize = [],
        hoverText = [];
        //scale = 150;
        console.log(countryLat)
        console.log(countryLng)


    for ( var i = 0 ; i < countryOzone.length; i++) {
        var currentSize = countryOzone[i];
        var currentText = countryName[i] + " Pop: " + countryPop[i] + " GDP:" + countryGdp[i] + " Ozone: " + countryOzone[i] + " N02: " + countryNo2[i] + " PM2.5: " + countryPm25[i];
        countrySize.push(currentSize);
        hoverText.push(currentText);
    }

    var data = [{
      type: 'scattergeo',
      locationmode: 'World',
      lat: countryLat,
      lon: countryLng,
      hoverinfo: 'text',
      text: hoverText,
      marker: {
          size: countrySize,
          line: {
              color: 'black',
              width: 2
          },
      }
  }];

    var layout = {
        title: 'G7 AQI Map',
        'geo': {
            'scope': 'World',
            'resolution': 50
        }
    };

    Plotly.newPlot("map", data, layout, {showLink: false});

});

//table with data
d3.csv('G7_demo_aqi.csv', function(err, rows){

  function unpack(rows, key) {
  return rows.map(function(row) { return row[key]; });
  }

  var headerNames = d3.keys(rows[0]);

  var headerValues = [];
  var cellValues = [];
  for (i = 0; i < headerNames.length; i++) {
    headerValue = [headerNames[i]];
    headerValues[i] = headerValue;
    cellValue = unpack(rows, headerNames[i]);
    cellValues[i] = cellValue;
  }

var data = [{
  type: 'table',
  columnwidth: [2000,2000,2000,0,0,0,0,0,0],
  columnorder: [0,1,2,3,4,5,6,7,8,9],
  header: {
    values: headerValues,
    align: "center",
    line: {width: 1, color: 'rgb(50, 50, 50)'},
    fill: {color: ['#1c3b46']},
    font: {family: "Arial", size: 14, color: "white"}
  },
  cells: {
    values: cellValues,
    align: ["left", "left"],
    line: {color: "black", width: 1},
    fill: {color: ['#2daed1', 'rgba(228, 222, 249, 0.65)']},
    font: {family: "Arial", size: 10, color: ["black"]}
  }
}]

var layout = {
  title: "G7 Country Overview"
}

Plotly.newPlot('country-metadata', data, layout);
});


// create an initial function called initialize
function initialize() {
    d3.json(sample_data, function(err, data) {
  //d3.json(sample_data).then(function(data) {
    let countryNames = data.index;

    let pulldownSelect = d3.select("#selDataset")

    //iterate over countryNames, add option, value, text for each countryName
    for (let index =0; index < countryNames.length; index++) {
        pulldownSelect
            .append("option")
            .text(countryNames[index])
            .property("value",index);
    };

    let firstCountry=countryNames[0];

     // call buildcharts function
     buildcharts(countryNames.indexOf(firstCountry));
     buildMetadata(countryNames.indexOf(firstCountry));

  });
  
  };
  
  initialize();