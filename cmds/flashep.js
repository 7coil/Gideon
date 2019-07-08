const Discord = module.require("discord.js");
const snekfetch = require("snekfetch");

module.exports.run = async (gideon, message, args) => {
    let season = str[0];
    let episode = str[2] + str[3]
    const api = `http://api.tvmaze.com/shows/13/episodebynumber?season=${season.join('%20')}&number=${episode.join('%20')}`;
    let sen = args[0];
    if(!sen) return message.channel.send("You must supply the season and episode number!");

    snekfetch.get(api).then(r => {
        console.log(r.body);
        let body = r.body;   
        let airdate = new Date(body.airstamp);

        const flashep = new Discord.RichEmbed()
        .setColor('#2791D3')
        .setTitle(`The Flash ${body.season}x${body.number<10?"0"+body.number:body.number} - ${body.name}`)
        .setDescription(body.summary + `\n\nAirdate: \`${airdate.toUTCString()}\` \nRuntime: \`${body.runtime} Minutes\``)
        .setImage(body.original)     
        .setTimestamp()
        .setFooter('Gideon - The Arrowverse Bot | Developed by adrifcastr', 'https://i.imgur.com/3RihwQS.png');

        message.channel.send(flashep);
    });
}
module.exports.help = {
    name: "flashep"
}