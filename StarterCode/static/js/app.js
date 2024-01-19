const url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json'

d3.json(url).then(response => {
    let samples = response.samples;
    // console.log(samples);
    let otuIds = samples.map((item) => item.otu_ids);
    let sampleValues = samples.map((item) => item.sample_values);
    // console.log(sampleValues);
    let trace1 = {
    x: otuIds,
    y: sampleValues,
    type: 'bar'
    };

    data = [trace1];
  
    Plotly.newPlot('bar', data);
});
// d3.selectAll('#selDataset').on('change', updateDrop);

// let labels = Object.keys(data.unique);

// let selector = d3.select('body').append('select');
// Object.keys(data).map((label) => {selector.append('option').text(label)});


// function updateDrop(){
//     let dropdownMenu = d3.select('#selDataset');
//     let dataset = dropdownMenu.property('value')
// }