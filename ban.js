const Discord = require("discord.js")
const botconfig = require("../botconfig.json");
const colours = require("../colours.json");
const superagent = require("superagent")


module.exports.run = async (bot, message, args) => {

    if (!message.member.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR", ])) return message.channel.send("You do not have permission to perform this command.");

    let banMember = message.mentions.members.first() || message.guild.members.get(args[0]);
    if (!banMember) return message.channel.send("Pelase provide a user to ban!")

    let reason = args.slice(1).join(" ");
    if (!reason) reason = "No reason given!"

    if (!message.guild.me.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR", ])) return message.channel.send("I don't have permission to perform this command.")

    banMember.send(`Hello, you have been banned from ${message.guild.name} for: ${reason}`).then(() =>
        message.guild.ban(banMember, {
            days: 1,
            reason: reason
        })).catch(err => console.log(err))

    message.channel.send(`**${banMember.user.tag}** has been banned!`).then(m => m.delete(5000))

    let embed = new Discord.RichEmbed()
        .setColor(colours.red_dark)
        .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
        .addField("Moderation: ", "ban")
        .addField("Banned:", `${banMember.user.username} ${bannedMember.id}`)
        .addField("Moderator:", message.author.username)
        .addField("Reason:", reason)
        .addField("Date", message.createdAt.toLocaleString())

    let sChannel = message.guild.channels.find(c => c.name === "mod-logs")
    sChannel.send(embed)

}

module.exports.config = {
    name: "ban",
    aliases: ["b", "banish", "remove"],
    usage: "%ban <@user> <reason>",
    description: "Ban a user from the server",
    acessableby: "Administrators"
}