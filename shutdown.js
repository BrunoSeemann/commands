const Discord = require("discord.js")
const botconfig = require("../botconfig.json");


module.exports.run = async (bot, message, args) => {

    if (message.author.id != "265944896639074304") return message.channel.send("You're not the bot owner!")

    try{
        await message.channel.send("Bot is shutting down...")
        process.exit()
    } catch(e) {
        message.channel.send(`ERROR: ${e.message}`)
    }

}

module.exports.config = {
    name: "shutdown",
    aliases: ["botstop"],
    usage: "%shutdown",
    description: "Shuts down the bot!",
    acessableby: "Members"
}