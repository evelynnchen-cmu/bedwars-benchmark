import fetch from 'node-fetch';

function formatDate(timestamp) {
    return new Date(timestamp).toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: 'numeric',
        minute: '2-digit',
        timeZoneName: 'short',
        hour12: true
    });
}

export default async function handler(req, res) {
    const { username } = req.query;

    if (!username) {
        return res.status(400).json({ error: 'Username is required' });
    }

    const url = `https://api.hypixel.net/player?key=${process.env.API_KEY}&name=${username}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (!data.success || !data.player) {
            return res.status(404).json({ error: 'Player not found' });
        }

        const playerData = {
            general: {
                uuid: data.player.uuid,
                name: data.player.displayname,
                rank: data.player.newPackageRank,
                karma: data.player.karma,
                experience: data.player.stats.Bedwars.Experience,
                coins: data.player.stats.Bedwars.coins,
                achievement_points: data.player.achievementPoints,
                kills: data.player.stats.Bedwars.kills_bedwars,
                deaths: data.player.stats.Bedwars.deaths_bedwars,
                final_kills: data.player.stats.Bedwars.final_kills_bedwars,
                final_deaths: data.player.stats.Bedwars.final_deaths_bedwars,
                wins: data.player.stats.Bedwars.wins_bedwars,
                losses: data.player.stats.Bedwars.losses_bedwars,
                beds_broken: data.player.stats.Bedwars.beds_broken_bedwars,
                beds_lost: data.player.stats.Bedwars.beds_lost_bedwars,
                last_login: formatDate(data.player.lastLogin),
                first_login: formatDate(data.player.firstLogin),
            },
            squad: {
                games_played: data.player.stats.Bedwars.eight_one_games_played_bedwars,
                wins: data.player.stats.Bedwars.eight_one_wins_bedwars,
                losses: data.player.stats.Bedwars.eight_one_losses_bedwars,
                beds_broken: data.player.stats.Bedwars.eight_one_beds_broken_bedwars,
                beds_lost: data.player.stats.Bedwars.eight_one_beds_lost_bedwars,
                kills: data.player.stats.Bedwars.eight_one_kills_bedwars,
                deaths: data.player.stats.Bedwars.eight_one_deaths_bedwars,
                final_kills: data.player.stats.Bedwars.eight_one_final_kills_bedwars,
                final_deaths: data.player.stats.Bedwars.eight_one_final_deaths_bedwars,
                resources_collected: data.player.stats.Bedwars.eight_one_resources_collected_bedwars,
            },
            trio: {
                games_played: data.player.stats.Bedwars.four_three_games_played_bedwars,
                wins: data.player.stats.Bedwars.four_three_wins_bedwars,
                losses: data.player.stats.Bedwars.four_three_losses_bedwars,
                beds_broken: data.player.stats.Bedwars.four_three_beds_broken_bedwars,
                beds_lost: data.player.stats.Bedwars.four_three_beds_lost_bedwars,
                kills: data.player.stats.Bedwars.four_three_kills_bedwars,
                deaths: data.player.stats.Bedwars.four_three_deaths_bedwars,
                final_kills: data.player.stats.Bedwars.four_three_final_kills_bedwars,
                final_deaths: data.player.stats.Bedwars.four_three_final_deaths_bedwars,
                resources_collected: data.player.stats.Bedwars.four_three_resources_collected_bedwars,
            },
            duo: {
                games_played: data.player.stats.Bedwars.eight_two_games_played_bedwars,
                wins: data.player.stats.Bedwars.eight_two_wins_bedwars,
                losses: data.player.stats.Bedwars.eight_two_losses_bedwars,
                beds_broken: data.player.stats.Bedwars.eight_two_beds_broken_bedwars,
                beds_lost: data.player.stats.Bedwars.eight_two_beds_lost_bedwars,
                kills: data.player.stats.Bedwars.eight_two_kills_bedwars,
                deaths: data.player.stats.Bedwars.eight_two_deaths_bedwars,
                final_kills: data.player.stats.Bedwars.eight_two_final_kills_bedwars,
                final_deaths: data.player.stats.Bedwars.eight_two_final_deaths_bedwars,
                resources_collected: data.player.stats.Bedwars.eight_two_resources_collected_bedwars,
            },
            solo: {
                games_played: data.player.stats.Bedwars.eight_one_games_played_bedwars,
                wins: data.player.stats.Bedwars.eight_one_wins_bedwars,
                losses: data.player.stats.Bedwars.eight_one_losses_bedwars,
                beds_broken: data.player.stats.Bedwars.eight_one_beds_broken_bedwars,
                beds_lost: data.player.stats.Bedwars.eight_one_beds_lost_bedwars,
                kills: data.player.stats.Bedwars.eight_one_kills_bedwars,
                deaths: data.player.stats.Bedwars.eight_one_deaths_bedwars,
                final_kills: data.player.stats.Bedwars.eight_one_final_kills_bedwars,
                final_deaths: data.player.stats.Bedwars.eight_one_final_deaths_bedwars,
                resources_collected: data.player.stats.Bedwars.eight_one_resources_collected_bedwars,
            },
        }

        res.status(200).json(playerData);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch player data', username });
    }
}
