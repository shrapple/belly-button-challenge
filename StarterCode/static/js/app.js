const url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json';

document.getElementById('selDataset').addEventListener('change', optionChanged);


function optionChanged(){
    let selectedId = document.getElementById('selDataset').value;
    
    d3.json(url).then(response => {
        let samples = response.samples;
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
            autosize: true,
                width: 800};

    Plotly.newPlot('bar', barData, barLayout);

    let metadata = response.metadata.find(item => item.id === parseInt(selectedId));

    if (metadata) {
      // Create tableData
      let tableData = `
        <table>
          <tr>
            <td><strong>Ethnicity:</strong></td>
            <td>${metadata.ethnicity}</td>
          </tr>
          <tr>
            <td><strong>Gender:</strong></td>
            <td>${metadata.gender}</td>
          </tr>
          <tr>
            <td><strong>Age:</strong></td>
            <td>${metadata.age}</td>
          </tr>
          <tr>
            <td><strong>Location:</strong></td>
            <td>${metadata.location}</td>
          </tr>
          <tr>
            <td><strong>BBType:</strong></td>
            <td>${metadata.bbtype}</td>
          </tr>
          <tr>
            <td><strong>WFreq:</strong></td>
            <td>${metadata.wfreq}</td>
          </tr>
        </table>`;

      // Update the sample-metadata div with the table data
      let metadataDiv = document.getElementById('sample-metadata');
      metadataDiv.innerHTML = tableData;};});};

function populateDropdown(names) {
    for (let i = 0; i < names.length; i++) {
        let option = document.createElement('option');
        option.text = names[i];
        document.getElementById('selDataset').add(option);
    }
};

d3.json(url).then(response => {
    let samples = response.samples;
    let names = samples.map(item => item.id);
    populateDropdown(names);
});


document.getElementById('selDataset').removeEventListener('change', optionChanged);

d3.json(url).then(response => {
    let metadata = response.metadata[0];
    let otuIds = response.samples[0].otu_ids;
    let sampleValues = response.samples[0].sample_values;
    let otuLabels = response.samples[0].otu_labels;

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

