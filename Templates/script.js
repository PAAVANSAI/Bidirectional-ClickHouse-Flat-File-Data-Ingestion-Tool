// Function to toggle the configuration fields based on the source selected (ClickHouse or Flat File)
document.getElementById('source').addEventListener('change', function () {
    const source = this.value;
    if (source === 'clickhouse') {
        document.getElementById('clickhouse-config').style.display = 'block';
        document.getElementById('flatfile-config').style.display = 'none';
    } else {
        document.getElementById('clickhouse-config').style.display = 'none';
        document.getElementById('flatfile-config').style.display = 'block';
    }
});

// Call this function when the 'Connect' button is clicked
function connectToSource() {
    const source = document.getElementById('source').value;
    let data = {};

    if (source === 'clickhouse') {
        data = {
            host: document.getElementById('host').value,
            port: document.getElementById('port').value,
            jwt: document.getElementById('jwt').value,
            database: document.getElementById('database').value,
        };
    } else {
        data = {
            file: document.getElementById('file').files[0],
            delimiter: document.getElementById('delimiter').value,
        };
    }

    // Send connection request to backend
    fetch('/connect', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(result => {
        document.getElementById('status').innerHTML = `Connected to ${source}`;
        loadColumns();
    })
    .catch(error => {
        document.getElementById('status').innerHTML = 'Error connecting to source';
    });
}

// Function to load available columns (from backend)
function loadColumns() {
    fetch('/load-columns')
    .then(response => response.json())
    .then(data => {
        let columnsHtml = '';
        data.columns.forEach(col => {
            columnsHtml += `<input type="checkbox" name="columns" value="${col}">${col}<br>`;
        });
        document.getElementById('column-selection').innerHTML = columnsHtml;
    });
}

// Function to start ingestion
function startIngestion() {
    const selectedColumns = Array.from(document.querySelectorAll('input[name="columns"]:checked')).map(input => input.value);
    fetch('/ingest', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ columns: selectedColumns }),
    })
    .then(response => response.json())
    .then(result => {
        document.getElementById('status').innerHTML = 'Ingestion started';
    });
}

// Function to preview data
function previewData() {
    fetch('/preview')
    .then(response => response.json())
    .then(data => {
        let previewHtml = '<h3>Preview Data:</h3><table>';
        data.records.forEach(record => {
            previewHtml += '<tr>';
            for (let key in record) {
                previewHtml += `<td>${record[key]}</td>`;
            }
            previewHtml += '</tr>';
        });
        previewHtml += '</table>';
        document.getElementById('status').innerHTML = previewHtml;
    });
}
