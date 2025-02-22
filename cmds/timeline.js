const Discord = module.require("discord.js");
const fetch = require('node-fetch');
const Util = require("../Util");

module.exports.run = async (gideon, message, args) => {
    const api = 'https://api.myjson.com/bins/zixur';
    try {
        const body = await fetch(api).then(res => res.json()); 
        let min = 0;
        let max = body.content.length - 1;
        let ranum = Math.floor(Math.random() * (max - min + 1)) + min;
    
        const tli = new Discord.MessageEmbed()
        .setColor('#2791D3')
        .setTitle(`Timeline change detected!`)
        .setDescription(body.content[ranum].text)
        .setImage('https://i.imgur.com/qWN3luc.gif')
        .setTimestamp()
        .setFooter('The Arrowverse Bot | Time Vault Discord | Developed by adrifcastr', gideon.user.avatarURL());
    
        message.channel.send(tli);
    }
    
    catch (ex) {
        console.log("An error occurred while trying to fetch a timeline change: " + ex);
        Util.log("An error occurred while trying to fetch a timeline change: " + ex);
        return message.channel.send("Failed to fetch a timeline change, please try again later");
    }
}

module.exports.help = {
    name: "timeline"
}