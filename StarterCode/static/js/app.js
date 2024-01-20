const url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json'

const directory = document.getElementById('selDataset');
let selectedId = '';

function optionChanged(){
    let selectedId = directory.value;
    
    d3.json(url).then(response => {
        let samples = response.samples.find(item => item.id === selectedId);
        let otuIds = samples.otu_ids;
        let sampleValues = samples.sample_values;

        let trace1 = {
            x: sampleValues.slice(0, 10).reverse(),
            y: otuIds.map(id => `OTU ${id}`).slice(0, 10).reverse(),
            type: 'bar',
            orientation: 'h'
        };

        let layout = {
            autosize: true,
        };

        let data = [trace1];

        Plotly.newPlot('bar', data, layout);
    });
}

function populateDropdown(names) {
        for (let i = 0; i < names.length; i++) {
            const option = document.createElement('option');
            option.text = names[i];
            directory.add(option);
        }
    };

directory.addEventListener('change', optionChanged);

d3.json(url).then(response => {
    let samples = response.samples;
    let names = samples.map(item => item.id);
    populateDropdown(names);
});