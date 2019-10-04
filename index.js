require('dotenv').config();
const config = require("./config.json");
const delay = require('delay');
const Discord = require('discord.js');
const fs = require("fs");
const fetch = require('node-fetch');
const gideon = new Discord.Client();
const prefix = config.prefix.toLowerCase();
const prefix2 = config.prefix2.toLowerCase();
const Util = require("./Util");

gideon.commands = new Discord.Collection();

fs.readdir("./cmds", (err, files) => {
    if (err) {
        Util.log("Error while reading commands:\n" + err);
        console.log(err);
        return;
    }

    let jsfiles = files.filter(f => f.endsWith(".js"));
    if (jsfiles.length < 1) {
        console.log("No commands to load!");
        return;
    }

    console.log(`Loading ${jsfiles.length} commands!`)

    jsfiles.forEach((f, i) => {
        let props = require(`./cmds/${f}`);
        console.log(`${i + 1}: ${f} loaded!`)
        gideon.commands.set(props.help.name, props);
    });
});

gideon.once('ready', async () => {
    async function status() {
        const tmvt = gideon.guilds.get('595318490240385037');
        if (!tmvt) return;

        let mbc = tmvt.members.filter(member => !member.user.bot).size;
        const st1 = `!help | invite.gg/tmvt`;
        let st2 = `${mbc} Time Vault members`;
        const st3 = 'over Queen JPK!';

        gideon.user.setActivity(st1, { type: 'PLAYING' }); 
        await delay(10000);
        gideon.user.setActivity(st2, { type: 'WATCHING' }); 
        await delay(10000);
        gideon.user.setActivity(st3, { type: 'WATCHING' });
    }
    
    console.log('Ready!');
    Util.log(`${gideon.user.tag} ready`);
    setInterval(status, 30000);
});

process.on("uncaughtException", err => {
    console.log("Uncaught Exception: " + err);
    Util.log("Uncaught Exception: " + err);
});

process.on("unhandledRejection", err => {
    console.log("Unhandled Rejection: " + err + "\n\nJSON: " + JSON.stringify(err, null, 2));
    Util.log("Unhandled Rejection: " + err + "\n\nJSON: " + JSON.stringify(err, null, 2));
});

gideon.on("error", err => {
    console.log("Bot error: " + err);
    Util.log("Bot error: " + err);
});

gideon.on('message', async message => {
    if (!message || !message.author || message.author.bot || !message.guild) return;

    const apm = [/(?:pagey)/i, /(?:https\:\/\/twitter\.com\/Pagmyst)/i,
                 /(?:https\:\/\/www\.instagram\.com\/pageyyt)/i,
                 /(?:https\:\/\/www\.youtube\.com\/user\/SmallScreenYT)/i];

    for (var i = 0; i < apm.length; i++) {
        if (message.content.match(apm[i])) {
            message.delete();
            message.reply('Anti-Pagey-Mode is enabled!\nFuck this bitch.');
          break;
        }
    }

    const ytrg = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;

    if (message.content.match(ytrg)){
        const id = message.content.match(ytrg);
        const google_api_key = process.env.GOOGLE_API_KEY;
        const api = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${id[1]}&key=${google_api_key}`;
        const body = await fetch(api).then(res => res.json()); 
        const channelid = body.items[0].snippet.channelId;

        if (channelid == 'UCTbT2FgB9oMpi4jB9gNPadQ') {
            message.delete();
            message.reply('Anti-Pagey-Mode is enabled!\nFuck this bitch.');
        }
    }

    const msg = message.content.toLowerCase();
    if (!msg.startsWith(prefix) && !msg.startsWith(prefix2)) return;

    const args = message.content.slice(msg.startsWith(prefix) ? prefix.length : prefix2.length).trim().split(" ");

    const cmd = args.shift().toLowerCase();
    const command = gideon.commands.get(cmd);

    if (!command) return;
    command.run(gideon, message, args);

});

gideon.login(process.env.CLIENT_TOKEN);