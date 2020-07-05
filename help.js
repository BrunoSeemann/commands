const Discord = require("discord.js")
const botconfig = require("../botconfig.json");
const colours = require("../colours.json");
const prefix = botconfig.prefix

module.exports.run = async (bot, message, args) => {

    if (args[0] == "help") return message.channel.send(`Just do ${prefix}help instead.`)

    if (args[0]) {
        let command = args[0];
        if (bot.commands.has(command)) {
            command = bot.commands.get(command);
            var SHembed = new Discord.RichEmbed()
                .setColor(colours["purple-light"])
                .setAuthor(`SupremeBot HELP`, message.guild.iconURL)
                .setThumbnail(bot.user.displayAvatarURL)
                .setDescription(`The bot prefix is ${prefix}\n\n**>Command:** ${command.config.name}\n**>Description:** ${command.config.description  || "No Description"}\n**>Usage:** ${command.config.usage || "No Usage"}\n**>Acessable by:** ${command.config.acessableby || "Members"}\n**>Aliases:** ${command.config.noalias || command.config.aliases}`)
                message.channel.send(SHembed);
        }
    }
    if (!args[0]) {
        message.delete();
        let embed = new Discord.RichEmbed()
        .setAuthor('Help Command!', message.author.displayAvatarURL)
        .setColor(colours.red_light)
        .setDescription(`${message.author.username} check your dms!`)
        
        let Sembed = new Discord.RichEmbed()
        .setColor(colours["purple-light"])
        .setAuthor(`SupremeBot`, message.guild.iconURL)
        .setThumbnail(bot.user.displayAvatarURL)
        .setTimestamp()
        .setDescription(`These are the available commands for the SupremeBot till now!\nThe bot prefix is: ${prefix}`)
        .addField(`Commands:`, "``cat`` ``dog`` ``meme`` ``help`` ``serverinfo`` ``userinfo``")
        .setFooter("SupremeBot 2k20", bot.user.displayAvatarURL)
        message.channel.send(embed).then(m => m.delete(10000))
        message.author.send(Sembed)
    }

}

module.exports.config = {
    name: "help",
    aliases: ["h", " halp", " commands"],
    usage: "%help command",
    description: "",
    noalias: "No Aliases",
    acessableby: "Members"
}