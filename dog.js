const Discord = require("discord.js")
const botconfig = require("../botconfig.json");
const colours = require("../colours.json");
const superagent = require("superagent")

module.exports.run = async (bot, message, args) => {
    let msg = await message.channel.send("Generating...")

    let {body} = await superagent
    .get (`https://dog.ceo/api/breeds/image/random`)
    //console.log(body.message)
    if(!{body}) return message.channel.send("Sorry, I broke, try again!")

        let dEmbed = new Discord.RichEmbed()
        .setColor(colours.cyan)
        .setAuthor(`SupremeBot DOGS!`, message.guild.iconURL)
        .setImage(body.message)
        .setTimestamp()
        .setFooter(`SupremeBot`, bot.user.displayAvatarURL)

        message.channel.send({embed: dEmbed});

        msg.delete();
}

module.exports.config = {
    name: "dog",
    aliases: ["doggo", " dogs", " puppy"],
    usage: "%dog",
    description: "Sends a random picture of a dog!",
    acessableby: "Members"
}