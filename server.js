const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const nmap = require("./app/controllers/nmap.controller");
const db_instance = require("./app/models/index");
const app = express();
const Telegram = require("./app/controllers/telegram");

const corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to application." });
});

////// NMAP FUNCTIONS
// nmap scan on demand
app.get('/nmap', (req, res) => {
  nmap.scan_art(req.query.IP.toString());
  res.sendStatus(200);
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
// telegram
Telegram.run().catch((error)=>{console.log("Telegram error: " + error.message)});
// function for cycle scan
async function array_scan () {
    nmap.get_list().then((scan_list)=>{
        scan_list.forEach((scanListKey) =>{
            console.log("Scan " + scanListKey.toString() + "\n");
            nmap.scan_art(scanListKey.toString());
        });
    })
}

setInterval(array_scan, 10000);

process.on('SIGINT', CloseUp);
process.on('SIGTERM', CloseUp);
function CloseUp() {
    console.info('\nSignal received.');
    console.log('Closing HTTP server...');
    server.close(() => {
      console.log('HTTP server closed.');
      db_instance.db.sequelize.close().then(r => console.log('Disconnecting DB...\nBye..!'));
      process.exit(0);
    });
}
