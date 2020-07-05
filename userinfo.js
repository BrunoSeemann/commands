const Discord = require("discord.js")
const botconfig = require("../botconfig.json");
const colours = require("../colours.json");

module.exports.run = async (bot, message, args) => {
    let uEmbed = new Discord.RichEmbed()
        .setColor(colours.red_light)
        .setTitle("User Info")
        .setThumbnail(message.author.displayAvatarURL)
        .setAuthor(`${message.author.username} Info`, message.author.displayAvatarURL)
        .addField("**Username:**", `${message.author.username}`, true)
        .addField("**Discriminator:**", `#${message.author.discriminator}`, true)
        .addField("**ID:**", `${message.author.id}`)
        .addField("**Status:**", `${message.author.presence.status}`, true)
        .addField("**In game**", `${message.author.presence.game}`, true)
        .addField("**Created At:**", `${message.author.createdAt}`)
        .setFooter(`SupremeBot | Supremacy`, bot.user.displayAvatarURL, );
    message.channel.send({
        embed: uEmbed
    });
}

module.exports.config = {
    name: "userinfo",
    aliases: ["ui", " userdesc"],
    usage: "%userinfo (@mention)",
    description: "Pulls the userinfo of yourself or another user!",
    acessableby: "Members"
}