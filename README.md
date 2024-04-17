# Bedwars Benchmark
CMU 05-430 Spring 2024 Final Project  
by Evelynn Chen

**About:**  
Bedwars Benchmark is an advanced statistics comparison tool for the game Bedwars from the Minecraft server Hypixel. Enter 2 to 4 usernames to see which player comes out on top solely based on hard cold stats. It's built for the competitive gamers, offering a simple and intuitive interface and a pleasant user experience.

**What is Bedwars:**  
Bedwars a team-based multiplayer game where players collect resources and obtain items for combat and for fortifying their bed. The players must protect their bed, as it allows them to respawn, while trying to destroy the opposing teams' beds. The objective is to be the last team standing.

**Technologies:**  
This tool was built with Next.js & Tailwind CSS and employs [Mojang's Public API](https://api.mojang.com/) and [Hypixel's Public API](https://api.hypixel.net/).

**How to Run the Project:**  
1. Rename `.env.local.example` to `.env.local`.
2. Generate your own free Hypixel API key from the [Hypixel Developer Dashboard](https://developer.hypixel.net/).
3. Paste your generated key into `.env.local`.
4. Run the development server with `npm run dev`.