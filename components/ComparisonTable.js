import React from 'react';
import Image from 'next/image';

export default function ComparisonTable({ playersData, avatars }) {
    const gameModes = ['Solo', 'Duo', 'Trio', 'Squad'];

    const statCategories = [
        'games_played', 'wins', 'losses', 'kills', 'deaths',
        'beds_broken', 'beds_lost', 'final_kills', 'final_deaths', 'resources_collected'
    ];

    function getStatValue(playerData, gameModeKey, statKey) {
        const modeData = playerData.data[gameModeKey.toLowerCase()];
        return modeData && modeData[statKey] ? modeData[statKey] : '-';
    };

    function findHighestStats(data) {
        const highestStats = {
            squad: { wins: 0, beds_broken: 0, kills: 0, final_kills: 0 },
            trio: { wins: 0, beds_broken: 0, kills: 0, final_kills: 0 },
            duo: { wins: 0, beds_broken: 0, kills: 0, final_kills: 0 },
            solo: { wins: 0, beds_broken: 0, kills: 0, final_kills: 0 },
        };

        data.forEach(player => {
            Object.keys(player.data).filter(m => m !== 'general').forEach(mode => {
                Object.keys(highestStats[mode]).forEach(stat => {
                    const playerStatValue = player.data[mode][stat];
                    if (!isNaN(playerStatValue) && playerStatValue > 0) {
                        highestStats[mode][stat] = Math.max(highestStats[mode][stat], playerStatValue);
                    }
                });
            });
        });

        return highestStats;
    }

    const highestStats = findHighestStats(playersData);

    return (
        <div>
            <h5 className="text-right text-sm italic block lg:hidden mb-2">Scroll to view more</h5>
            <div className="overflow-x-auto">
                <table className="mx-auto">
                    <thead className="bg-mc-gray divide-y divide-gray-400">
                        <tr>
                            <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">Stat</th>
                            {gameModes.map((mode, index) => (
                                <th key={index} colSpan={playersData.length} className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider"> {mode} </th>
                            ))}
                        </tr>
                        <tr>
                            <th className="px-6 py-2 whitespace-nowrap text-sm text-right capitalize font-medium">Players</th>
                            {gameModes.map((mode, modeIndex) =>
                                playersData.map((player, playerIndex) => (
                                    // render gray divider if last player in mode
                                    <th key={modeIndex + playerIndex} className={`text-center ${modeIndex < gameModes.length - 1 && playerIndex === playersData.length - 1 ? 'border-r border-gray-400' : ''}`}>
                                        {avatars[player.data.general.uuid] && (
                                            <div className="inline-flex flex-col items-center">
                                                <Image
                                                    src={avatars[player.data.general.uuid]}
                                                    width={24}
                                                    height={24}
                                                    alt={`Head of ${player.username}'s avatar`}
                                                    unoptimized={true}
                                                    className=" lg:mx-6 my-2"
                                                />
                                            </div>
                                        )}
                                    </th>
                                ))
                            )}
                        </tr>
                    </thead>
                    <tbody className="bg-gray-300">
                        {statCategories.map((statKey, index) => (
                            <tr key={statKey} className={`${index % 2 === 0 ? 'bg-mc-gray/95' : 'bg-mc-gray/85'}`}>
                                <td className="px-6 py-3 whitespace-nowrap text-sm text-right capitalize"> {statKey.replace(/_/g, ' ')} </td>
                                {gameModes.map((mode, modeIndex) =>
                                    playersData.map((player, playerIndex) => {
                                        const currentValue = getStatValue(player, mode, statKey);
                                        const highestValue = highestStats[mode.toLowerCase()][statKey] || 0;
                                        const isHighest = currentValue === highestValue;
                                        return (
                                            <td key={modeIndex + statKey + playerIndex}
                                                className={`whitespace-nowrap text-sm text-center ${isHighest ? 'text-mc-green' : ''} ${modeIndex < gameModes.length - 1 && playerIndex === playersData.length - 1 ? 'border-r border-gray-400' : ''}`}>
                                                {currentValue} </td>
                                        );
                                    })
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
