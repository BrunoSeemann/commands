const Discord = require("discord.js")
const botconfig = require("../botconfig.json");
const colours = require("../colours.json");
const superagent = require("superagent")

module.exports.run = async (bot, message, args) => {
    let msg = await message.channel.send("Generating...")

    let {body} = await superagent
    .get (`https://meme-api.herokuapp.com/gimme`)
    //console.log(data.image)
    if(!{body}) return message.channel.send("Sorry, I broke, try again!")

        let mEmbed = new Discord.RichEmbed()
        .setColor(colours.cyan)
        .setAuthor(`SupremeBot MEMES!`, message.guild.iconURL)
        .setImage(body.url)
        .setTimestamp()
        .setFooter(`SupremeBot`, bot.user.displayAvatarURL)

        message.channel.send({embed: mEmbed});

        msg.delete();
}

module.exports.config = {
    name: "meme",
    aliases: ["memeimg", " memes"],
    usage: "%meme",
    description: "Sends a random meme from reddit!",
    acessableby: "Members"
}