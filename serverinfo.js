const Discord = require("discord.js")
const botconfig = require("../botconfig.json");
const colours = require("../colours.json");

module.exports.run = async (bot, message, args) => {
    let sEmbed = new Discord.RichEmbed()
        .setColor(colours["purple-light"])
        .setTitle("Server Info")
        .setThumbnail(message.guild.iconURL)
        .setAuthor(`${message.guild.name} Info`, message.guild.iconURL)
        .addField("**Guild Name:**", `${message.guild.name}`)
        .addField("**Guild Owner:**", `${message.guild.owner}`)
        .addField("**Member Count:**", `\n${message.guild.memberCount}`, true)
        .addField("**Role Count:**", `${message.guild.roles.size}`, true)
        .addField("**Region**", `${message.guild.region}`)
        .setFooter(`SupremeBot | Supremacy`, bot.user.displayAvatarURL, );
    message.channel.send({
        embed: sEmbed
    });
}

module.exports.config = {
    name: "serverinfo",
    aliases: ["si", " serverdesc"],
    usage: "%serverinfo",
    description: "Pulls the server info of the guild!",
    acessableby: "Members"
}