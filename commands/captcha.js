const { Captcha } = require("captcha-canvas");
const { MessageAttachment } = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('captcha')
        .setDescription('Show captcha!'),
    async execute(interaction) {
        const captcha = new Captcha(); //create a captcha canvas of 100x300.
        captcha.async = true //Sync
        captcha.addDecoy(); //Add decoy text on captcha canvas.
        captcha.drawTrace(); //draw trace lines on captcha canvas.
        captcha.drawCaptcha(); //draw captcha text on captcha canvas.

        const captchaAttachment = new MessageAttachment(
            await captcha.png,
            "captcha.png"
        );

        return interaction.reply({
            files: [captchaAttachment],
            content: `Code: ${captcha.text}`,
        });
    },
};
// TODO: Add events handling