import dotenv from 'dotenv';
const env = dotenv.config()

export function getEnvironmentValues() {
    return {
        clientId: env.parsed.CLIENT_ID,
        guildId: env.parsed.GUILD_ID,
        token: env.parsed.DISCORD_TOKEN,
    }
}
