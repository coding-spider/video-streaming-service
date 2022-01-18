
const express = require("express");
const fs = require("fs");
const app = express();
const path = require('path');
const port = 3000;

app.get("/video", (req, res) => {
    const file_path = path.resolve(__dirname, '../videos/video-1.mp4');
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

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});