import React, { useState } from 'react';
import Image from 'next/image';

const PlayerTabs = ({ playersData, avatars }) => {
    const gameModes = ['Solo', 'Duo', 'Trio', 'Squad'];
    const [activeTab, setActiveTab] = useState(0);
    const statCategories = [
        'games_played', 'wins', 'losses', 'kills', 'deaths',
        'beds_broken', 'beds_lost', 'final_kills', 'final_deaths', 'resources_collected'
    ];

    function calculateRatio(numerator, denominator) {
        if (isNaN(numerator) || isNaN(denominator) || denominator === 0) {
            return "0";
        } else {
            return (numerator / denominator).toFixed(2);
        }
    };

    return (
        <div className="max-w-5xl mx-auto">
            <h1 className="text-2xl md:text-3xl lg:text-4xl mb-8 text-center">Break it down by player.</h1>
            <ul className="flex  flex-wrap text-sm text-center border-b border-gray-500">
                {playersData.map((player, index) => (
                    <li key={index} className="mr-2 flex-auto text-center">
                        <button onClick={() => setActiveTab(index)}
                            className={`inline-flex items-center justify-center w-full p-4 rounded-t-lg border-b-2 ${activeTab === index
                                ? 'text-mc-green border-mc-green'
                                : 'border-transparent hover:text-mc-green-dark hover:border-mc-green-dark'} group focus:outline-none relative`}>
                            {avatars[player.data.general.uuid] && (
                                <div className="inline-flex flex-col items-center">
                                    <Image
                                        src={avatars[player.data.general.uuid]}
                                        width={24}
                                        height={24}
                                        alt={`Head of ${player.username}'s avatar`}
                                        unoptimized={true}
                                    />
                                </div>
                            )}
                            <span className="ml-2 mc-font hidden md:block text-sm md:text-base lg:text-xl">{player.username}</span>
                            {activeTab === index && (
                                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-mc-green"></div>
                            )}
                        </button>
                    </li>
                ))}
            </ul>

            <div className="p-4">
                {playersData.map((player, index) => (
                    <div key={index} className={`grid grid-cols-1 lg:grid-cols-3 gap-4 space-y-8 lg:space-y-0 ${index === activeTab ? 'block' : 'hidden'}`}>
                        <ul className="p-4 bg-mc-gray space-y-2">
                            <h4 className="text-base md:text-xl lg:text-2xl text-center font-semibold mb-4">{player.username}</h4>
                            {player.data.general.uuid && (
                                <Image
                                    src={`https://visage.surgeplay.com/full/128/${player.data.general.uuid}`}
                                    width={128}
                                    height={128}
                                    alt={`Head of ${player.username}'s avatar`}
                                    unoptimized={true}
                                    className="mx-auto"
                                />
                            )}
                            <div className="grid grid-cols-4 gap-1">
                                <div className="text-center">
                                    <p>W/L</p>
                                    <p>{calculateRatio(player.data.general.wins, player.data.general.losses)}</p>
                                </div>
                                <div className="text-center">
                                    <p>BB/BL</p>
                                    <p>{calculateRatio(player.data.general.beds_broken, player.data.general.beds_lost)}</p>
                                </div>
                                <div className="text-center">
                                    <p>K/D</p>
                                    <p>{calculateRatio(player.data.general.kills, player.data.general.deaths)}</p>
                                </div>
                                <div className="text-center">
                                    <p>FK/FD</p>
                                    <p>{calculateRatio(player.data.general.final_kills, player.data.general.final_deaths)}</p>
                                </div>
                            </div>
                            <li>Hypixel Level: {player.data.general.experience}</li>
                            <li>Rank: {player.data.general.rank}</li>
                            <li>Karma: {player.data.general.karma}</li>
                            <li>Coins: {player.data.general.coins}</li>
                            <li>Achievement Points: {player.data.general.achievement_points}</li>
                            <li>Total Kills: {player.data.general.kills}</li>
                            <li>Total Wins: {player.data.general.wins}</li>
                            <li>Last Login: {player.data.general.last_login}</li>
                            <li>First Login: {player.data.general.first_login}</li>
                        </ul>
                        <div className="overflow-x-auto col-span-2">
                            <table className="w-full divide-y divide-gray-400">
                                <thead className="bg-mc-gray">
                                    <tr>
                                        <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">Stat</th>
                                        {gameModes.map((mode, index) => (
                                            <th key={index} className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">
                                                {mode}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="bg-gray-200">
                                    {statCategories.map((stat, statIndex) => (
                                        <tr key={statIndex} className={`${statIndex % 2 === 0 ? 'bg-mc-gray/95' : 'bg-mc-gray/85'}`}>
                                            <td className="px-6 py-4 text-sm text-right capitalize">
                                                {stat.replace(/_/g, ' ')}
                                            </td>
                                            {gameModes.map((mode, modeIndex) => {
                                                const modeData = playersData[activeTab].data[mode.toLowerCase()];
                                                const statValue = modeData && modeData[stat] ? modeData[stat] : '-';
                                                return (
                                                    <td key={`${modeIndex}-${statIndex}`} className="px-6 py-4 text-sm text-center"> {statValue} </td>
                                                );
                                            })}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <h5 className="text-right text-sm italic block lg:hidden">Scroll to view more</h5>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PlayerTabs;
