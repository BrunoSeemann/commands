const Discord = require("discord.js")

module.exports.run = async(bot, message, args) => {

    if(!message.member.hasPermission(["MANAGE_MESSAGES", "ADMINISTRATOR"])) return message.channel.send("You can not use this command")

    
    let argsresult;
    let mchannel = message.mentions.channels.first()

    message.delete()
    
    if(mchannel) {
        argsresult = args.slice(1).join(" ")
        mchannel.send(argsresult)
    } else {
        argsresult = args.join(" ")
        message.channel.send(argsresult)
    }

}

module.exports.config = {
    name: "say",
    aliases: ["acc", "announcement"],
    usage: "%say",
    description: "Sends a message that was inputted to a channel",
    acessableby: "Administrators"
}