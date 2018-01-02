const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const fs = require("fs");
var template = {};

client.on("message", message => {
    if(message.author.id === client.user.id || message.author.id === config.ownerid){
        if(message.content.startsWith(".guild-clone") && message.guild){
            var template = {
                textChannels: [],
                textChannelTopic: [],
                voiceChannels: [],
                roles: [],
                roleColors: [],
                emojiURLs: [],
                emojiNames: [],
                verificationLevel:0,
                servername:0,
                serverIcon:0
            };
              template.textChannels = message.guild.channels.filterArray(c => c.type === "text").map(c => c.name);
              template.textChannelTopic = message.guild.channels.filter(c => c.type === "text").map(c => c.topic);
              template.voiceChannels = message.guild.channels.filterArray(c => c.type === "voice").map(c => c.name);
              template.roles = message.guild.roles.map(r => r.name);
              template.roleColors = message.guild.roles.map(r => r.hexColor);
              template.emojiURLs = message.guild.emojis.map(e => e.url);
              template.emojiNames = message.guild.emojis.map(e => e.name);
              template.verificationLevel = message.guild.verificationLevel;
              template.servername = message.guild.name;
              template.serverIcon = message.guild.iconURL;
              console.log("Done!");
              fs.writeFileSync("./result.json", JSON.stringify(template));
        }
    }
});


client.login(config.token);
