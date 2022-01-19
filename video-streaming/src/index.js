
const express = require("express");
const http = require('http');

const app = express();

const APP_NAME = 'VIDEO-STREAMING';
const PORT = parseInt(process.env.PORT);
const VIDEO_STORAGE_HOST = process.env.VIDEO_STORAGE_HOST;
const VIDEO_STORAGE_PORT = parseInt(process.env.VIDEO_STORAGE_PORT);

app.use((req, res, next) => {
    console.log(`API Request - ${APP_NAME} - ${req.url}`);
    next();
});

app.get("/video", (req, res) => {
    const forwardRequest = http.request(
        {
            host: VIDEO_STORAGE_HOST,
            port: VIDEO_STORAGE_PORT,
            path: '/video?path=video-1.mp4',
            method: 'GET',
            headers: req.headers,
        },
    forwardResponse => {
            res.writeHeader(forwardResponse.statusCode, forwardResponse.headers);
            forwardResponse.pipe(res);
        });

    req.pipe(forwardRequest);
});

app.listen(PORT, () => {
    console.log(`${APP_NAME} app listening on port ${PORT}!`);
});