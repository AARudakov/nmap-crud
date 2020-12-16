const { Telegraf } = require('telegraf');
const BOT_TOKEN = "";
const bot = new Telegraf(BOT_TOKEN);
const report = require("../controllers/report.controller");

exports.run = async ()=> {
    bot.start((ctx) => ctx.reply('Welcome'));
    bot.help((ctx) => ctx.reply('Command report for report'));
    bot.command('report', (ctx) => {
        const netObjectName = ctx.message.text.split(" ")[1];
        if (netObjectName === undefined) {return;}
        let promise = new Promise(async function (resolve, reject) {
            let var_report = await report.get_test_report(netObjectName.toString());
            resolve(var_report);
        });
        promise.then(function (result) {
                //console.log("typeof " + typeof result + result.valueOf());
                ctx.reply(result.toString())
                    .then(()=>{console.log("report generating successful!")})
                    .catch((error)=>{console.log("Error on report promise" + error)});
        },
            function (error) {
                ctx.reply("error on generating report..." + error).then(()=>{console.log("error on generating report..." + error)});
            });
    });

    bot.launch().then (function () {
        console.log("telegram bot is started");
    })
};

