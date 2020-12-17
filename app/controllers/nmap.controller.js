const nmap = require("node-nmap");
const db = require("../models/index");
const Scan = db.Scan;
const Port = db.Port;
const NetObject = db.NetObject;
const ScanNetObjectPort = db.ScanNetObjectPort;

exports.get_list = async()=>{
    let NetObject_list = await NetObject.findAll();
    let list = [];
    await NetObject_list.forEach((NO)=> {
        list.push(NO.IP.toString());
        console.log("Net Object: " + NO.IP.toString());
    });
    return list;
};
// func for nmap
exports.scan_art = (IPaddr) => {
    const nmap_scan = new nmap.NmapScan(IPaddr.toString());
    console.log("Starting nmap scan...");
    nmap_scan.on('complete', function(data){
        let sca = {"date": Date.now()};
        // Циклом проходим результаты скана (там может быть более 1 адреса), создаем Scan, NetObject (если его нет), ScanNetObjectPort
        Scan.create(sca)
            .then ((newScan) => {
                NetObject.findOrCreate({where:{IP: IPaddr}, defaults: {IP: IPaddr}})
                    .then((newNetObject) => {
                        for (let var_host in data){
                            for (let var_port in data[var_host].openPorts){
                                let str_port = data[var_host].openPorts[var_port].port.toString();
                                let str_desc = data[var_host].openPorts[var_port].service.toString();
                                Port.create({"number": str_port, "description": str_desc})
                                    .then((newPort)=>{
                                        const nSNOP = {
                                            "portId": newPort.id,
                                            "netObjectId": newNetObject[0].id,
                                            "scanId": newScan.id
                                        };
                                        ScanNetObjectPort.create(nSNOP)
                                            .then(() => {
                                                console.log("Port "+str_port+" for host "+IPaddr+" is added to database");
                                            })
                                            .catch ((error)=> {console.log("Error on create: newScanNetObjectPort: \n"+error.message)});
                                    })
                            }
                        }
                    })
                    .catch ((error)=> {console.log("Error on create: newNetObject: \n"+error.message)});
            })
            .catch ((error)=> {console.log("Error on create: newScan: \n"+error.message)});
    });
    nmap_scan.on('error', function(error){
        console.log(error);
    });
    nmap_scan.startScan();
};
