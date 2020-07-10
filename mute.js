const Discord = require("discord.js")
const botconfig = require("../botconfig.json");
const colours = require("../colours.json");
const superagent = require("superagent")


module.exports.run = async (bot, message, args) => {
    //Check if the command caller has permission to use the command
    if (!message.member.hasPermission("MANAGE_ROLES") || !message.guild.owner) return message.channel.send("You don't have permission to use this command.");

    if (!message.guild.me.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) return message.channel.send("I don't have permission to add roles!")

    //Define the reason and mutee
    let mutee = message.mentions.members.first() || !message.guild.members.get(args[0]);
    if (!mutee) return message.channel.send("Please supply a user to be muted!");

    let reason = args.slice(1).join(" ");
    if (!reason) reason = "No reason given"

    //Define mute role and if the mute role doens't exist then create one
    let muterole = message.guild.roles.find(r => r.name === "Muted")
    if (!muterole) {
        try {
            muterole = await message.guild.createRole({
                name: "Muted",
                color: "#514f48",
                permissions: []
            })
            message.guild.channels.forEach(async (channel, id) => {
                await channel.overwritePermissions(muterole, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false,
                    SEND_TTS_MESSAGES: false,
                    ATTACH_FILES: false,
                    SPEAK: false
                })
            })
        } catch(e) {
            console.log(e.stack);
        }
    }

//Add role to the mentioned user and also send the user a dm explaining where and why they were muted

mutee.addRole(muterole.id).then(() => {
    message.delete()
    mutee.send(`Hello, you have been muted in ${message.guild.name} for: ${reason}`)
    message.channel.send(`${mutee.user.username} was succesfully muted.`)
})

//Send and embed to the modlogs channel

let embed = new Discord.RichEmbed()
.setColor(colours.orange)
.setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
.addField("Moderation: ", "mute")
.addField("Mutee:", mutee.user.username)
.addField("Moderator:", message.author.username)
.addField("Reason:", reason)
.addField("Date", message.createdAt.toLocaleString())

let sChannel = message.guild.channels.find(c => c.name === "mod-logs")
sChannel.send(embed)
}




module.exports.config = {
    name: "mute",
    description: "Mutes a member in Discord!",
    usage: "!mute <@user> <reason>",
    acessableby: "Members",
    aliases: ["m", "nospeak"]
}