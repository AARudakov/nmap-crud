const db = require("../models/index");
const Scan = db.Scan;
const NetObject = db.NetObject;
const ScanNetObjectPort = db.ScanNetObjectPort;
const Port = db.Port;
// REPORT FUNCTION
exports.test_report = (IPaddr) => {
    let text_report = "";
    if (IPaddr === undefined) {console.log("IPaddr is undefined..!"); return;}

    let report_promise =  new Promise(function (resolve, reject) {
        NetObject.findOne({where: {"IP": IPaddr}}).then(function (NOp) {
            if (NOp === null) {console.log("Not found NetObject by IP "+ IPaddr); return;}
            text_report += "Report for " + NOp.IP.toString() + "\n";
            ScanNetObjectPort.findAll({where:{"netObjectId":  NOp.id}, include:  [{model: Scan}, {model: Port}]})
                .then(async function (sel) {
                    let scan_id = sel[0].scanId; // запоминаем id первого найденного скана как текущий
                    let scan_date = null;
                    await Scan.findByPk(scan_id).then(function (scan1) {
                        scan_date = scan1.date;
                    });
                    text_report += "Date: "+ scan_date.toString() +"\n";
                    for (const item of sel) {
                        if (item.scanId !== scan_id) {  // проверяем, текущий ли скан
                            scan_id = item.scanId;
                            await Scan.findByPk(scan_id).then(function (scan1) {
                                scan_date = scan1.date;
                                text_report += "Date: "+ scan_date.toString() +"\n";
                            });
                        }
                        await Port.findByPk(item.portId).then (function (p) {
                            text_report += "Port "+ p.number + " with service " + p.description +"\n";
                        });
                    }
                    return sel;
                })
                .then (() => { resolve(text_report);})
                .catch((error) =>{console.log("Error on: ScanNetObjectPort.findAll" + error.message); reject(error);});
        });
    });

    return report_promise.then(
        function (result) {
            console.log("Print FULL REPORT.:");
            console.log(result.toString());
            return result;
        },
        function (error) {
            console.log("Error on resolving promise test_report... " + error.message);
            return null;
        }
    );
};

exports.get_test_report = async(gIPaddr) => {
    return exports.test_report(gIPaddr);
};