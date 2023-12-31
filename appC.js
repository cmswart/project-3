//read in data here

//build function called buildChart
const sample_data = "G7_AQI_Countries.json"


function buildcharts(index) {
    console.log("testing buildcharts function");
    d3.json(sample_data).then(function(data) {
      console.log(data);
      console.log(data.data[index]);
      
      
      let aqis = data.columns

      let values = data.data[index]
      //console.log(samples)
  
     
  
      

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
    
    var layout = { width: 600, height: 500, margin: { t: 0, b: 0 } };
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
    
    var layout = { width: 600, height: 500, margin: { t: 0, b: 0 } };
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
    
    var layout = { width: 600, height: 500, margin: { t: 0, b: 0 } };
    Plotly.newPlot('gauge3', datagauge3, layout);
    });
};

//end- no data after this point

//build MetaData function


//Event Listener
function optionChanged(newCountry) {
    //build charts with new sample
    buildcharts(newCountry);
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
  
    });
    
    };
    
    initialize();
  