const Discord = require("discord.js")
const botconfig = require("../botconfig.json");
const colours = require("../colours.json");
const superagent = require("superagent")

module.exports.run = async (bot, message, args) => {
    let msg = await message.channel.send("Generating...")

    let {body} = await superagent
    .get ('http://aws.random.cat/meow')
    //console.log(body.file)
    if(!{body}) return message.channel.send("Sorry, I broke, try again!")

        let cEmbed = new Discord.RichEmbed()
        .setColor(colours.cyan)
        .setAuthor(`SupremeBot CATS!`, message.guild.iconURL)
        .setImage(body.file)
        .setTimestamp()
        .setFooter(`SupremeBot`, bot.user.displayAvatarURL)

        message.channel.send({embed: cEmbed});

        msg.delete();
}

module.exports.config = {
    name: "cat",
    aliases: ["catto", " cats", " kitten"],
    usage: "%cat",
    description: "Sends a random picture of a cat!",
    acessableby: "Members"
}