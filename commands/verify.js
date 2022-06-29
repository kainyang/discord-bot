const { Captcha } = require("captcha-canvas");
const { MessageAttachment, MessageEmbed, MessageActionRow, MessageSelectMenu } = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');
const { randomString, shuffle } = require('./../utils/common.utils');
const { jsonWriter } = require('./../data/services/database');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('verify')
        .setDescription('Show captcha!'),
    async execute(interaction) {
        const captcha = new Captcha(); //create a captcha canvas of 100x300.
        captcha.async = true //Sync
        captcha.addDecoy(); //Add decoy text on captcha canvas.
        captcha.drawTrace(); //draw trace lines on captcha canvas.
        captcha.drawCaptcha(); //draw captcha text on captcha canvas.

        const memberId = interaction.member.id;
        const jsonData = {
            memberId,
            value: captcha.text,
        }
        jsonWriter(memberId, jsonData);

        const captchaAttachment = new MessageAttachment(
            await captcha.png,
            "captcha.png"
        );

        const captchaEmbed = new MessageEmbed()
            .setDescription("Please complete this captcha")
            .setImage("attachment://captcha.png");

        const options = [{
            label: captcha.text,
            value: captcha.text,
        }];

        for (let i = 0; i < 3; i++) {
            const randomValue = randomString(6);
            options.push({
                label: randomValue,
                value: randomValue,
            });
        }

        shuffle(options);

        const row = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId('select')
                    .setPlaceholder('Nothing selected')
                    .addOptions(options),
            );

        const content = {
            files: [captchaAttachment],
            embeds: [captchaEmbed],
            ephemeral: true,
            components: [row],
        };

        return interaction.reply(content);
    },
};
// TODO: Add events handling