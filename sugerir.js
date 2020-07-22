const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {

    message.delete()

    //reasoning definition
    let reason = args.slice(0).join(" ")
    if(!reason) return message.channel.send(`Por favor forneça a sugestão desejada`).then(m => m.delete(15000))

    //grab sugestions channel
    let sChannel = message.guild.channels.find(x => x.name === "📑・sugestoes")

    

    //send to reports channel and add tick or cross
    message.channel.send("Sua sugestão foi enviada à equipe administrativa. Obrigado!").then(m => m.delete(15000))
    sChannel.send(`O usuário **${message.author.username}** enviou a seguinte sugestão: **${reason}**.`).then(async msg => {
        await msg.react("✅")
        await msg.react("❌")
    })

}

module.exports.config = {
    name: "sugerir",
    aliases: ["No aliases"],
    usage: "%sugerir <sugestao>",
    description: "Sugere alguma mudança ao servidor",
    acessableby: "Members"
}