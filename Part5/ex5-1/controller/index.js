const k8s = require('@kubernetes/client-node');
const axios = require('axios');
const fs = require('fs').promises;
const express = require('express');
const path = require('path');
const request = require('request');
const JSONStream = require('json-stream');

const kc = new k8s.KubeConfig();
process.env.NODE_ENV === 'development' ? kc.loadFromDefault() : kc.loadFromCluster();

const opts = {};
kc.applyToRequest(opts);

const client = kc.makeApiClient(k8s.CustomObjectsApi);
const app = express();
const port = 5672;
const htmlDirectory = path.join(__dirname, 'html');

// Ensure the HTML directory exists
fs.mkdir(htmlDirectory, { recursive: true }).catch(err => console.error('Failed to create directory', err));

app.use('/html', express.static(htmlDirectory));

app.get('/', (req, res) => {
    res.send('DummySite Controller is running');
});

const fetchAndSaveHTML = async (url) => {
    try {
        const response = await axios.get(url);
        const htmlContent = response.data;
        await fs.writeFile(path.join(htmlDirectory, `dummysite.html`), htmlContent);
        console.log(`HTML content of ${url} saved as dummysite.html`);
    } catch (error) {
        console.error(`Error fetching HTML content from ${url}:`, error);
    }
};

const watchDummySites = () => {
    const dummySiteStream = new JSONStream();

    dummySiteStream.on('data', ({ type, object }) => {
        console.log(`Received event type: ${type}`);
        console.log(`Received object: ${JSON.stringify(object, null, 2)}`);
        
        if (type === 'ADDED' || type === 'MODIFIED') {
            const websiteUrl = object.spec.website_url;
            console.log(`Processing URL: ${websiteUrl}`);
            fetchAndSaveHTML(websiteUrl).catch(err => console.error('Error in fetchAndSaveHTML:', err));
        }
    });
    request.get(`${kc.getCurrentCluster().server}/apis/stable.dwk/v1/dummysites?watch=true`, opts)
    .on('response', (response) => {
        console.log(`HTTP Status Code: ${response.statusCode}`);
    })
    .pipe(dummySiteStream)
    .on('error', err => console.error('Error watching DummySite resources:', err));

};

app.listen(port, () => {
    console.log(`DummySite controller listening at http://localhost:${port}`);
    watchDummySites();
});