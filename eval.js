const config = require ("../botconfig.json");
const { inspect } = require ("util");
const ownerid = "265944896639074304"

module.exports.run = async (bot, message, args) => {
    if(message.author.id == ownerid) {
        let toEval = args.join(" ");
        let evaluated = inspect(eval(toEval, { deth: 0 } ))
        try {
            if(toEval) {
                let hrStart = process.hrtime()
                let hrDiff;
                hrDiff = process.hrtime(hrStart)
                return message.channel.send(`*Executed in ${hrDiff[0] > 0 ? `${hrDiff[0]}s` : ''}${hrDiff[1] / 1000000}ms.*\`\`\`javascript\n${evaluated}\n\`\`\``, { maxLength: 1900})
         
            } else {
                message.channel.send("Error whilst evaluating: `cannot evaluated ait")
            }
        } catch(e) {
            message.channel.send(`Error whilst evaluating \`${e.message}\``)
        }
    } else {
        return message.reply("You don't have permission to use this command").then(m => m.delete(10000))
    }
}

module.exports.config = {
    name: "eval",
    description: "Evaluates js code",
    acessableby: "Bot Owner",
    type: "owner",
    aliases: ["e"],
    usage: `${config.prefix}eval <input>`
}