const { Captcha } = require("captcha-canvas");
const { MessageAttachment, MessageEmbed } = require("discord.js");

const client = require("../index");

module.exports = {
    name: 'guildMemberAdd',
    async execute(member) {
        // const captcha = new Captcha(); //create a captcha canvas of 100x300.
        // captcha.async = true;
        // captcha.addDecoy(); //Add decoy text on captcha canvas.
        // captcha.drawTrace(); //draw trace lines on captcha canvas.
        // captcha.drawCaptcha(); //draw captcha text on captcha canvas.

        // const captchaAttachment = new MessageAttachment(
        //     await captcha.png,
        //     "captcha.png"
        // );

        // const captchaEmbed = new MessageEmbed()
        //     .setDescription("Please complete this captcha")
        //     .setImage("attachment://captcha.png");

        // const content = {
        //     files: [captchaAttachment],
        //     embeds: [captchaEmbed],
        // };

        // // Send to #verify channel
        // await client.channels.cache.get('990658112354660403').send(content);
    },
};