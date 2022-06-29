const client = require("../index");
const { jsonReader } = require('./../data/services/database');

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
                        await interaction.member.roles.add('990657075518517318');
                        await interaction.reply({ content: 'Verification completed!', ephemeral: true });
                    } catch (err) {
                        console.log(err);
                    }
                } else {
                    await interaction.reply({ content: 'Verification failed!', ephemeral: true });
                }
            });
        }
    },
};