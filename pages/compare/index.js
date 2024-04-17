import React, { useState, useEffect } from 'react';
import NavBar from '@/components/NavBar';
import RatioViews from '@/components/RatioViews';
import ComparisonTable from '@/components/ComparisonTable';
import PlayerTabs from '@/components/PlayerTabs';
import Footer from '@/components/Footer';
import Head from 'next/head';

export default function Compare() {
  const [playersData, setPlayersData] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem('playerData');
    if (data) {
      setPlayersData(JSON.parse(data));
      localStorage.removeItem('playerData');
    }
  }, []);

  const [avatars, setAvatars] = useState({});

  useEffect(() => {
    async function fetchAvatars() {
      const newAvatars = {};
      await Promise.all(playersData.map(async (player) => {
        const uuid = player.data.general.uuid;
        const avatarURL = `https://visage.surgeplay.com/face/128/${uuid}`;
        newAvatars[uuid] = avatarURL;
      }));
      setAvatars(newAvatars);
    };

    fetchAvatars();
  }, [playersData]);

  return (
    <div className="bg-coal">
      <Head>
        <title>Bedwars Benchmark - Compare Players</title>
      </Head>
      <NavBar />
      <div className="mx-8 space-y-12">
        <RatioViews playersData={playersData} avatars={avatars} />
        <ComparisonTable playersData={playersData} avatars={avatars} />
        <PlayerTabs playersData={playersData} avatars={avatars} />
        <Footer />
      </div>
    </div>
  );
}