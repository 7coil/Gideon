const Discord = module.require("discord.js");


module.exports.run = async (gideon, message, args) => {
    const fsurl = 'https://discordapp.com/channels/595318490240385037/595935089070833708';

    const help = new Discord.RichEmbed()
	    .setColor('#2791D3')
	    .setTitle('__You can check the list of available commands below:__')
        .addField('!help', 'Displays this message')  
        .addField('!wiki <term>', 'Searches the Arrowverse Wiki for the given term')  
        .addField('!ep <show> NxNN', 'Fetches episode info\n(replace <show> with: flash | arrow | supergirl | legends | constantine | batwoman)')  
        .addField('!nxeps', 'Displays a countdown to the next airing Arrowverse episodes')  
        .addField('!meme', 'Displays a random Arrowverse meme')  
        .addField('!quote', 'Displays a random Arrowverse quote')  
        .addField('!accelerator', 'Blows up the S.T.A.R. labs particle accelerator to gain a methuman ability')  
        .addField('!cuddle <user>', 'Gives the selected user a Beebo-tastic cuddle')
        .addField('!at <attack> <user>', 'Attacks the selected user with the selected attack\n(replace <attack> with: iceblast | lthrow | reverseflash | vibeblast | shootarrow | heatvision)')
        .addField('!crossovers', 'Displays a list of all Arrowverse crossover episodes in their respective watching order')
        .addField('Gideon, show me the future!', 'Displays an easter egg')
        .addField('Gideon, plot a course!', 'Displays an easter egg')
        .addField('!ping', 'Displays the bot\'s uptime')
        .addField('!uptime', 'Displays the bot\'s uptime')
        .addField('!github', 'Displays Github repository info')
        .addField('!donate', 'Displays info to support maintainance and hosting of Gideon')       
        .addField('Feature Suggestions:', `**[Click here to suggest a feature](${fsurl} 'Time Vault - #feature-suggestions')**`)
        .setTimestamp()
    	.setFooter('Gideon - The Arrowverse Bot | Developed by adrifcastr', 'https://i.imgur.com/3RihwQS.png');

        message.channel.send(help);
}

module.exports.help = {
    name: "help"
}