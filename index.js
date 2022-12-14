require('dotenv').config()
const { WebhookClient, EmbedBuilder } = require("discord.js");
const DBL = require('top.gg');
const dbl = new DBL(process.env.TOPGG_TOKEN, { webhookPort: process.env.TOPGG_WEBHOOK_PORT, webhookAuth: process.env.TOPGG_WEBHOOK_AUTHPASSWORD });

const webhook = new WebhookClient({
    id: process.env.DISCORD_WEBHOOK_ID,
    token: process.env.DISCORD_WEBHOOK_TOKEN
});

dbl.webhook.on("ready", hook => {
    console.log(`Webhook running at http://${hook.hostname}:${hook.port}${hook.path}`);
});

dbl.webhook.on('vote', vote => {
    console.log(`User with ID ${vote.user} just voted!`);
    const voteembed = new EmbedBuilder()
        .setTitle("🎉 User Voted")
        .setDescription(`User with ID ${vote.user} just voted!`)
        .setFooter({
            iconURL: "https://blog.top.gg/content/images/size/w2000/2021/12/logo-white-5.png",
            text: "Vote here: [LINK]"
        })
        .setColor("Blurple")
        .setTimestamp();
    webhook.send({embeds: [voteembed]});
});
