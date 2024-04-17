import fetch from 'node-fetch';

export default async function handler(req, res) {
  const { username } = req.query;

  try {
    const response = await fetch(`https://api.mojang.com/users/profiles/minecraft/${username}`);
    const data = await response.json();
    
    if (data.errorMessage) {
      return res.status(404).json({ error: 'Username not found' });
    }

    res.status(200).json({ sucess: true });

  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch username', username });
}
}