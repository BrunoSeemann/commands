const Discord = require("discord.js")
const botconfig = require("../botconfig.json");
const colours = require("../colours.json");
const superagent = require("superagent")


module.exports.run = async (bot, message, args) => {
//check if the command caller has permission to use the command
if (!message.member.hasPermission("MANAGE_ROLES") || !message.guild.owner) return message.channel.send("You don't have permission to use this command.");

if (!message.guild.me.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) return message.channel.send("I don't have permission to add roles!")

//define the reason and unmutee
let mutee = message.mentions.members.first() || !message.guild.members.get(args[0]);
if (!mutee) return message.channel.send("Please supply a user to be muted!");

let reason = args.slice(1).join(" ");
if (!reason) reason = "No reason given"

//define mute role and if the mute role doesn't exist then send a message
let muterole = message.guild.roles.find(r => r.name === "Muted")
if(!muterole) return message.channel.send("There is no mute role to remove!")

//Remove role to the mentioned user and also send the user a dm explaining where and why they were unmuted
mutee.removeRole(muterole.id).then(() => {
    message.delete
    mutee.send(`Hello, you have been unmuted in ${message.guild.name} for: ${reason}`).catch(err => console.log(err))
    message.channel.send(`${mutee.user.username} was unmuted!`)
})

//Send an embed to the modlogs channel
let embed = new Discord.RichEmbed()
.setColor(colours.green_light)
.setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
.addField("Moderation: ", "unmute")
.addField("Unmutee:", mutee.user.username)
.addField("Moderator:", message.author.username)
.addField("Reason:", reason)
.addField("Date", message.createdAt.toLocaleString())

let sChannel = message.guild.channels.find(c => c.name === "mod-logs")
sChannel.send(embed)

}


module.exports.config = {
    name: "unmute",
    description: "Unmutes a member in Discord!",
    usage: "unmute <@user> <reason>",
    accessableby: "Members",
    aliases: ["unm", "speak "]
}