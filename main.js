const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const fs = require("fs");

client.on("message", message => {
    if(message.author.id === client.user.id || message.author.id === config.ownerid){
        if(message.content.startsWith(".guild-clone") && message.guild){
            const channels = message.guild.channels.map(v => ({
                name: v.name,
                topic: v.topic || null,
                type: v.type,
                nsfw: v.nsfw || false,
                ratelimit: v.rateLimitPerUser || null,
                position: v.position
            }));
            const roles = message.guild.roles.map(v => ({
                name: v.name,
                permissions: v.permissions.bitfield,
                color: v.color
            }));
            const emojis = message.guild.emojis.map(v => ({
                name: v.name,
                url: v.url
            }));

            console.log("Done!");
            fs.writeFileSync("./result.json", JSON.stringify({
                channels,
                roles,
                emojis,
                verificationLevel: message.guild.verificationLevel,
                servername: message.guild.name,
                serverid: message.guild.id,
                serverIcon: message.guild.iconURL,
                timeout: 150
            }, null, 4));
        }
    }
});


client.login(config.token);
