//read in data here

//build function called buildChart

//within this, build out all of the charts

    //map

    //bubble

    //needle gauge1
    //needle gauge2
    //needle gauge3

//end- no data after this point

//build MetaData function


//Event Listener
function optionChanged(newCountry) {
    //build charts with new sample
    buildChart(newCountry);
    buildMetadata(newCountry)
};

//create an intialize function
function initialize() {
    //d3.json(sample_data).then(function(data) {
        let countryNames = //data.names;

        let pulldownSelect = d3.select("#selDataset")

        //iterate over countryNames, add option, value, text for each countryName
        for (let index =0; index < countryNames.length; index++) {
            pulldownSelect
                .append("option")
                .text(countryNames[index])
                .property("value",countryNames[index]);
        };

        let firstCountry=countryNames[0];

    //call buildCharts
    buildChart(firstCountry);
    //call buildmetadata
    buildMetadata(firstCountry);
    };




initialize()

//the end!