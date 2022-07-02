const client = require("../index");
const { Captcha } = require("captcha-canvas");
const { MessageAttachment, MessageEmbed, MessageActionRow, MessageButton, Modal, TextInputComponent } = require("discord.js");
const { randomString, shuffle } = require('./../utils/common.utils');
const { jsonReader, jsonWriter } = require('./../data/services/database');

const { memberRoleId } = require('../config.json');

module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        if (interaction.isCommand()) {
            const command = client.commands.get(interaction.commandName);

            if (!command) return;

            try {
                await command.execute(interaction);
            } catch (error) {
                console.error(error);
                await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
            }
        }

        if (interaction.isSelectMenu()) {
            const memberId = interaction.member.id;

            jsonReader(memberId, async (err, data) => {
                if (err) {
                    console.log(err);
                    await interaction.reply({ content: 'There was an error while verifying this captcha!', ephemeral: true });
                    return;
                }

                const captchaValue = data.value;
                if (interaction.values.includes(captchaValue)) {
                    try {
                        await interaction.member.roles.add(memberRoleId);
                        await interaction.reply({ content: 'Verification completed!', ephemeral: true });
                    } catch (err) {
                        console.log(err);
                    }
                } else {
                    await interaction.reply({ content: 'Verification failed!', ephemeral: true });
                }
            });
        }

        if (interaction.isModalSubmit()) {
            if (interaction.customId === 'solveCaptchaModal') {
                const memberId = interaction.member.id;

                jsonReader(memberId, async (err, data) => {
                    if (err) {
                        console.log(err);
                        await interaction.reply({ content: 'There was an error while verifying this captcha!', ephemeral: true });
                        return;
                    }

                    const captchaValue = data.value;
                    const submittedCaptcha = interaction.fields.getTextInputValue('captchaAnswer');

                    if (submittedCaptcha === captchaValue) {
                        try {
                            await interaction.member.roles.add(memberRoleId);
                            await interaction.reply({ content: 'Verification completed!', ephemeral: true });
                        } catch (err) {
                            console.log(err);
                        }
                    } else {
                        await interaction.reply({ content: 'Verification failed!', ephemeral: true });
                    }
                });
            }
        }

        if (interaction.isButton()) {
            if (interaction.customId === 'startVerification') {
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
                        new MessageButton()
                            .setCustomId('solveCaptcha')
                            .setLabel('Solve')
                            .setStyle('PRIMARY'),
                    );

                const content = {
                    files: [captchaAttachment],
                    embeds: [captchaEmbed],
                    ephemeral: true,
                    components: [row],
                };

                return interaction.reply(content);
            }

            if (interaction.customId === 'solveCaptcha') {
                const modal = new Modal()
                    .setCustomId('solveCaptchaModal')
                    .setTitle('Solve Captcha');

                const favoriteColorInput = new TextInputComponent()
                    .setCustomId('captchaAnswer')
                    .setLabel("Note: Captcha is case-sensitive")
                    .setStyle('SHORT');

                const firstActionRow = new MessageActionRow().addComponents(favoriteColorInput);

                modal.addComponents(firstActionRow);

                await interaction.showModal(modal);
            }
        }
    },
};