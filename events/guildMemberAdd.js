const { Captcha } = require("captcha-canvas");
const { MessageAttachment } = require("discord.js");

const client = require("../index");

module.exports = {
    name: 'guildMemberAdd',
    async execute(member) {
        const captcha = new Captcha(); //create a captcha canvas of 100x300.
        captcha.async = true;
        captcha.addDecoy(); //Add decoy text on captcha canvas.
        captcha.drawTrace(); //draw trace lines on captcha canvas.
        captcha.drawCaptcha(); //draw captcha text on captcha canvas.

        const captchaAttachment = new MessageAttachment(
            await captcha.png,
            "captcha.png"
        );

        const msg = {
            files: [captchaAttachment],
            content: `Code: ${captcha.text}`,
        };

        console.log(msg);
        await member.send(msg);
        //990658112354660403
        //await client.channels.cache.get('990658112354660403').send(msg);
    },
};