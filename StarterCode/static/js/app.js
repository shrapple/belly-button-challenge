const url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json'


function optionChanged(){
    let selectedId = document.getElementById('selDataset').value;
    
    d3.json(url).then(response => {
        let samples = response.samples[0];
        let name = response.samples.find(item => item.id === selectedId);
        let otuIds = name.otu_ids;
        let sampleValues = name.sample_values;
        let otuLabels = name.otu_labels;

        let barData = [{
            x: sampleValues.slice(0, 10).reverse(),
            y: otuIds.map(id => `OTU ${id}`).slice(0, 10).reverse(),
            type: 'bar',
            orientation: 'h'
        }];

        let barLayout = {
            autosize: true,};

    Plotly.newPlot('bar', barData, barLayout);

            
    let ethnicity = name.ethnicity;
    let gender = name.gender;
    let age = name.age;
    let location = name.location;
    let bbtype = name.bbtype;
    let wfreq = name.wfreq;
    });
}

function populateDropdown(names) {
        for (let i = 0; i < names.length; i++) {
            let option = document.createElement('option');
            option.text = names[i];
            document.getElementById('selDataset').add(option);
        }
    };

document.getElementById('selDataset').addEventListener('change', optionChanged);

d3.json(url).then(response => {
    let samples = response.samples;
    let names = samples.map(item => item.id);
    populateDropdown(names);
});

document.getElementById('selDataset').removeEventListener('change', optionChanged);

d3.json(url).then(response => {
    let samples = response.samples[0];
    let otuIds = samples.otu_ids;
    let sampleValues = samples.sample_values;
    let otuLabels = samples.otu_labels;

    let bubbleData = [{
    x: otuIds,
    y: sampleValues,
    mode: 'markers',
    marker: {
        size: sampleValues,
        color: otuIds,
    },
    text: otuLabels,
    }];
    
    let bubbleLayout = {
        autosize: true,
    };

Plotly.newPlot('bubble', bubbleData, bubbleLayout);
});
