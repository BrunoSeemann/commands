const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {

    message.delete()

    //mentioned or grabbed user
    let target = message.mentions.members.first() || message.guild.members.get(args[0])
    if(!target) return message.channel.send("Please provide a valid user").then(m => m.delete(15000))

    //reasoning definition
    let reason = args.slice(1).join(" ")
    if(!reason) return message.channel.send(`Please provide a reason for reporting **${target.user.tag}**`).then(m => m.delete(15000))

    //grab reports channel
    let sChannel = message.guild.channels.find(x => x.name === "report-test")

    

    //send to reports channel and add tick or cross
    message.channel.send("Your report has been filed to the staff team. Thank you!").then(m => m.delete(15000))
    sChannel.send(`**${message.author.username}** has reported **${target.user.tag}** for **${reason}**.`).then(async msg => {
        await msg.react("✅")
        await msg.react("❌")
    })

}

module.exports.config = {
    name: "report",
    aliases: [],
    usage: "%report <user> <reason>",
    description: "Reports a user from the guild",
    acessableby: "Members"
}