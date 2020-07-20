const Discord = require("discord.js")
const colours = require("../colours.json");

module.exports.run = async (bot, message, args) => {

    if(!message.member.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) return message.channel.send("You don't have permission to perform this command!")
    let rMember = message.mentions.members.first() || message.guild.members.find(m => m.user.tag === args[0]) || message.guild.members.get(args[0])
    if(!rMember) return message.channel.send("Please provide a user to remove a role from!")
    let role = message.guild.roles.find(r => r.name === args[1]) || message.guild.roles.find(r => r.id == args[1]) || message.mentions.roles.first()
    if(!role) return message.channel.send('Please provide a role to remove from said user!')
    let reason = args.slice(2).join(" ")
    if(!reason) reason = "No reason provided"

    if(!message.guild.me.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) return message.channel.send("I don't have permission to perform this command!")
    
    if(!rMember.roles.has(role.id)) {
        return message.channel.send(`${rMember.displayName} doesn't have this role`)
    } else {
        await rMember.removeRole(role.id).catch(e => console.log(e.message))
        message.channel.send(`The role, ${role.name}, has been removed from ${rMember.displayName}`)
    }
    
    let embed = new Discord.RichEmbed()
        .setColor(colours.orange)
        .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
        .addField("Moderation: ", "addrole")
        .addField("User:", `${rMember.user.username}`)
        .addField("Moderator:", message.author.username)
        .addField("Reason:", reason)
        .addField("Date", message.createdAt.toLocaleString())

    let sChannel = message.guild.channels.find(c => c.name === "mod-logs")
    sChannel.send(embed)

}

module.exports.config = {
    name: "removerole",
    aliases: ["rr", "roleremove"],
    usage: "%removerole <member> <role> <reason>",
    description: "Removes a role from a member of the guild!",
    acessableby: "Moderators"
} 