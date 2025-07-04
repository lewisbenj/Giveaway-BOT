<div align="center">

 <p>
   <img src="https://cdn.discordapp.com/attachments/919711569632440382/1009914431607681034/Discord_giveaways.png" width="546"  alt="Bot Banner"/></a>
 </p>
  <p>
    <a href="https://discord.gg/5cSNTar8T3"><img src="https://img.shields.io/discord/745925853229350972?color=5865F2&logo=discord&logoColor=white&style=for-the-badge" alt="Discord server" /></a>
    <a><img src="https://img.shields.io/badge/version-1.0.0-green.svg?cacheSeconds=2592000&style=for-the-badge" alt="bot version" /></a>
    <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/license-MIT-orange?style=for-the-badge" alt="License" /></a>
    <a href="https://discord.js.org"><img src="https://img.shields.io/badge/Powered_by-Discord.js-%235865F2?style=for-the-badge" alt="Bot Lib" /></a>
  </p>
</div>



# 🎉 Simple giveaways
This is a bot that provides all the necessary utilities to run a giveaway in Discord. The bot is built on top of [my discord.js v14 discord bot template](https://github.com/lewisbenj) and uses [discord-giveaways](https://github.com/lewisbenj) to handle most of the giveaway stuff.

# 💻 Setting the bot up

First, clone this github project
```sh
git clone
```
Next up you will have to install all the dependencies by running 
```sh
npm install
```
Then, you are going to create a file with the name config.json. Copy and paste the example bellow.
```json
{
  "token": "BotToken",
  "devs": ["Benjamin Lewis",],
  "clientId": "BotClientID"
}
```
- token - your bot's token, acquired in the developer portal
- devs - the ID's of the bot developer(s)
- clientID - The bot's client ID, can be acquired from the developer portal

In order to keep track of the giveaways, discord-giveaways uses a json file. Create a file name giveaways.json and put in an empty array.
```json
[]
```

You are all set to run the bot now. Have fun!
```sh
npm run start
```

> ⚠️ Bear in mind that you must be using Node.js v16.9.0 or higher!


## 👥 Author and contributors

* [@Benjamin Lewis](https://github.com/lewisbenj)

If you want to be a **developer** then DM me on Discord (tonyG#0001) or you could contribute directly by Pull Requests. Please note you **cannot** withdraw the credits, unless you donate me a small sum 


*** 
Made with ❤️ by [Lewis](https://github.com/lewisbenj)
