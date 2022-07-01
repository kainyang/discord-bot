const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);

		const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('startVerification')
					.setLabel('Verify')
					.setStyle('PRIMARY'),
			);

		const embed = new MessageEmbed()
			.setColor('#0099ff')
			.setTitle('Verification required')
			.setDescription('To gain access, you will need to prove you are a human by completing a captcha.\nClick on the button below to get started!');

		const content = { embeds: [embed], components: [row] };

		client.channels.cache.get('990658112354660403').send(content);
	},
};