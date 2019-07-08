const Discord = module.require("discord.js");
const snekfetch = require("snekfetch");

module.exports.run = async (gideon, message, args) => {
    let input = args.toString().substr(-4)
    let season = input[0];
    let episode = input[2] + input[3];
    const api = `http://api.tvmaze.com/shows/13/episodebynumber?season=${season}&number=${episode}`;
    let sen = args[0];
    if(!sen) return message.channel.send("You must supply the shows name, season and its episode number!");

    snekfetch.get(api).then(r => {
        console.log(r.body);
        let body = r.body;   
        let airdate = new Date(body.airstamp);
        let sum = body.summary.substring(3);
        let desc = sum.substring(0, sum.length - 4);
        //if (!Object.keys(body.id).length) message.channel.send(`There was no data for this episode!`).catch(console.error);  
        
        localTime = airdate.getTime();
        localOffset = airdate.getTimezoneOffset() * 60000;  
        utc = localTime + localOffset;
        offset = -5;   
        cst = utc + (3600000*offset);
        nd = new Date(cst); 
        newdate = (nd.toLocaleString());  

        // Parse our locale string to [date, time]
        var date = new Date().toLocaleString('en-US',{hour12:false}).split(" ");

        // Now we can access our time at date[1], and monthdayyear @ date[0]
        var time = date[1];
        var mdy = date[0];

        // We then parse  the mdy into parts
        mdy = mdy.split('/');
        var month = parseInt(mdy[0]);
        var day = parseInt(mdy[1]);
        var year = parseInt(mdy[2]);

// Putting it all together
var formattedDate = year + '-' + month + '-' + day + ' ' + time;

        const flashep = new Discord.RichEmbed()
        .setColor('#2791D3')
        .setTitle(`The Flash ${body.season}x${body.number<10?"0"+body.number:body.number} - ${body.name}`)
        .setDescription(desc + `\n\nAirdate: \`${newdate + ' CST'}\` \nRuntime: \`${body.runtime} Minutes\``)
        .setImage(body.image.original)     
        .setTimestamp()
        .setFooter('Gideon - The Arrowverse Bot | Developed by adrifcastr', 'https://i.imgur.com/3RihwQS.png');

        message.channel.send(flashep);
    });
}
module.exports.help = {
    name: "ep"
}