![](https://i.imgur.com/PyzY5IQ.png)
A simple, lightweight Node.js Discord cryptocurrency bot.
## Getting Started
### Prerequisites
Ensure Node.js is installed, and run `npm install` to install the project's dependencies.
 - Rename `.env.example` to `.env`
 - If you haven't already, sign up for a free **EthGasStation** API key here:  https://data.defipulse.com/
 - If you haven't already, sign up for a free **CoinMarketCap** API key here: https://pro.coinmarketcap.com/
 - Create your Discord bot on the **Discord Developer Portal** here: https://discord.com/developers/applications
 - Paste all of your keys into the `.env` file.
## Usage
All commands can either be sent directly to the bot or sent in a server or channel that the bot is also in.
 - Use the command `!gasprices` to see current Ethereum network gas prices, as well as how long transactions are expected to take if you use each respective gas price.
 - Use the command `!coin` followed by the symbol of the coin you would like information on. By default, the bot returns the *CMC rank*, *market cap*, *24hr volume* and *price* of the coin supplied; however the bot can be edited very easily to provide more detailed information.
	 - Example: `!coin btc`, `!coin cake`
## Deployment
As this is a Node.js bot, it can be run on Windows, macOS and Linux. I would recommend deploying it on a Raspberry Pi, or a very lightweight cloud server such as Google Cloud Platform. You can use [PM2](https://www.npmjs.com/package/pm2) to very easily turn the bot into a process with very little downtime.

### Authors

 - Seán Whelan
	 - [Twitter](https://twitter.com/shazsnks)
### License
This project is licensed under the [MIT license](https://github.com/SeanWhelan/CryptoBot/blob/main/LICENSE).
