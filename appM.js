//read in data here

// create variable to store sample data
const sample_data = "G7_AQI_Countries.json"


function buildcharts(country) {
    console.log("testing buildcharts function");
    d3.json(sample_data).then(function(data) {
      //console.log(data);
     

      // Create variables
      let values = data.data[country]
      let aqis = data.columns

      //Build Bubblechart
          // Use AQIs names for the x values
          // Use AQIs values for the y values
          // Use AQIs values for the marker size
          // Use AQIs values for the marker colors
          // Use AQI names for the text values
      let traceBubble = {
        x: aqis,
        y: values,
        mode: 'markers',
        marker: {
          size: values,
          color: values,
          colorscale: 'YlOrRd'
        }
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

//buildMetadata function
function buildMetadata(index) {
    d3.json(sample_data).then(function(data) {
        console.log("this metadata")
        let metadata = data.metadata;
        console.log(metadata);

        //filter countries down
        //let metadataArray = metadata.filter(metadataObject => metadataObject.id == country);
        //console.log(metadataArray)

        //unpack Array
        let metadataResult = metadataArray[0]
        console.log("this is metadataResults")
        console.log(metadataResult)

        //d3.select method to get where to put metadata, assign to a variable
        let metadataPanel = d3.select("#sample-metadata");
        //wipe clean the panel
        metadataPanel.html("")
        //iterate over key value pairs in metadataResult and append to panel
        for (key in metadataResult) {
            metadataPanel.append("h5").text(`${key.toUpperCase()} : ${metadataResult[key]}`);
        }

    });
};

//Event Listener
function optionChanged(newCountry) {
  //build charts with new sample
  buildcharts(newCountry);
  buildMetadata(newCountry)
};

// create an initial function called initialize
function initialize() {
  d3.json(sample_data).then(function(data) {
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