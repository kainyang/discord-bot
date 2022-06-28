const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Intents } = require('discord.js');
const { token } = require('./config.json');

// const { Captcha } = require("captcha-canvas");
// const { MessageAttachment } = require("discord.js");

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
module.exports = client;

// Slash Commands
client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    // Set a new item in the Collection
    // With the key as the command name and the value as the exported module
    client.commands.set(command.data.name, command);
}

// Events
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

// client.on("guildMemberAdd", async (member) => {
//     const captcha = new Captcha(); //create a captcha canvas of 100x300.
//     captcha.async = true;
//     captcha.addDecoy(); //Add decoy text on captcha canvas.
//     captcha.drawTrace(); //draw trace lines on captcha canvas.
//     captcha.drawCaptcha(); //draw captcha text on captcha canvas.

//     const captchaAttachment = new MessageAttachment(
//         await captcha.png,
//         "captcha.png"
//     );

//     const msg = {
//         files: [captchaAttachment],
//         content: `Code: ${captcha.text}`,
//     };

//     console.log(msg);
//     await member.send(msg);
// })

// Login to Discord with your client's token
client.login(token);
