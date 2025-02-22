const Discord = module.require("discord.js");

module.exports.run = async (gideon, message, args) => {
    const donate = new Discord.MessageEmbed()
	.setColor('#2791D3')
	.setTitle('Donations')
    .setDescription(`Donations are gladly accepted. \nPlease send them to one of the options below. \nDonating supports the development, maintenance and hosting of this project. \nThank you!`)
    .addField('PayPal', `[Paypal.me](https://www.paypal.me/adrifcastr 'https://www.paypal.me/adrifcastr')`)
    .addField('Patreon', `[Patreon.com](https://www.patreon.com/gideonbot 'https://www.patreon.com/gideonbot')`)
	.setThumbnail('https://i.imgur.com/f3fvsRe.png')
    .setTimestamp()
    .setFooter('The Arrowverse Bot | Time Vault Discord | Developed by adrifcastr', gideon.user.avatarURL());

    message.channel.send(donate);
}

module.exports.help = {
    name: "donate"
}