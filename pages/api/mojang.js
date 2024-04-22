export default async function handler(req, res) {
  const { username } = req.query;

  try {
    const response = await fetch(`https://api.mojang.com/users/profiles/minecraft/${username}`);
    if (response.status === 429) {
      return res.status(429).json({ status: response.status, error: 'Too many requests to Mojang API', username: username });
    }

    if (response.headers.get('content-type').includes('application/json')) {
      if (response.status === 404) {
        return res.status(404).json({ status: response.status, error: `Couldn't find any profile with name ${username}` });
      }
    
      if (response.status === 200) {
        res.status(200).json({ status: response.status, success: true });
      }
    } else {
      res.status(500).json({ error: 'Response is not JSON', username: username });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to check if username is valid', username: username, errorMessage: err.message });
  }
}