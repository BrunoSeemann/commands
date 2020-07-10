const Discord = require("discord.js")
const botconfig = require("../botconfig.json");
const colours = require("../colours.json");
const superagent = require("superagent")

module.exports.run = async (bot, message, args) => {

    if (!message.member.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("You don't have permission to perform this command!")

    let bannedMember = await bot.fetchUser(args[0])
    if (!bannedMember) return message.channel.send("Please provide someone to unban")

    let reason = args.slice(1).join(" ")
    if (!reason) reason = "No reason given"

    if (!message.guild.me.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("I don't have permission to perform this command!")
    message.delete()
    try {
        message.guild.unban(bannedMember, {reason: reason})
        message.channel.send(`${bannedMember.tag} has been unbanned from the server!`)
    } catch(e) {
    console.log(e.message)
    }
    
    
    let embed = new Discord.RichEmbed()
    .setColor(colours.green_light)
    .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
    .addField("Moderation: ", "unban")
    .addField("Unbanned:", `${bannedMember.username} (${bannedMember.id})`)
    .addField("Moderator:", message.author.username)
    .addField("Reason:", reason)
    .addField("Date", message.createdAt.toLocaleString())

let sChannel = message.guild.channels.find(c => c.name === "mod-logs")
sChannel.send(embed)

}

module.exports.config = {
    name: "unban",
    aliases: ["ub", "unbanish", "unremove"],
    usage: "%unban <user_id> <reason>",
    description: "Unban a user from the server",
    acessableby: "Administrators"
}