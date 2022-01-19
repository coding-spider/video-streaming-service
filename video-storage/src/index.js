
const express = require("express");
const fs = require("fs");
const path = require('path');

const app = express();

const APP_NAME = 'VIDEO-STORAGE';
const PORT = parseInt(process.env.PORT);

app.use((req, res, next) => {
   console.log(`API Request - ${APP_NAME} - ${req.url}`);
   next();
});

app.get("/video", (req, res) => {
    const video_path = req.query.path;
    const file_path = path.resolve(__dirname, `../videos/${video_path}`);
    fs.stat(file_path, (err, stats) => {
        if (err) {
            console.error(err);
            console.error("An error occurred");
            res.sendStatus(500);
            return;
        }
        res.writeHead(200, {
            "Content-Length": stats.size,
            "Content-Type": "video/mp4",
        });
        fs.createReadStream(file_path).pipe(res);
    });
});

app.listen(PORT, () => {
    console.log(`${APP_NAME} app listening on port ${PORT}!`);
});