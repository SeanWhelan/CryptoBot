const Discord = require('discord.js');
const client = new Discord.Client();
const https = require('https')
require('dotenv').config()

const gasPriceOptions = {
  hostname: 'ethgasstation.info',
  port: 443,
  path: '/api/ethgasAPI.json?api-key=' + process.env.EGS_API_KEY,
  method: 'GET'
}

client.once('ready', () => {
    console.log('Ready!');
});

client.on('message', message => {
	if (!message.content.startsWith("!") || message.author.bot) return;

	const args = message.content.slice("!".length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	if (command === 'gasprices') {
        let chunks = []
        const req = https.request(gasPriceOptions, res => {
            console.log(`statusCode: ${res.statusCode}`)
          
            res.on('data', d => {
                chunks.push(d);
            }).on('end', function() {
                let d   = Buffer.concat(chunks);
                let schema = JSON.parse(d);

                const embed = new Discord.MessageEmbed()
                .setTitle("ETH Network Transaction fees")
                .addField("Safe low gas price", schema.safeLow.toString().slice(0, -1) + " gwei, est. ~" + schema.safeLowWait + " minutes", false)
                .addField("Average gas price", schema.average.toString().slice(0, -1) + " gwei, est. ~" + schema.avgWait + " minutes", false)
                .addField("Fast gas price", schema.fast.toString().slice(0, -1) + " gwei, est. ~" + schema.fastWait + " minutes", false)
                .addField("Fastest gas price", schema.fastest.toString().slice(0, -1) + " gwei, est. ~" + schema.fastestWait + " minutes", false)
                .setColor("#0069ff")
                .setFooter("via EthGasStation", "https://ethgasstation.info/images/egs_transparent.png")
                message.channel.send(embed)
            })
        })
          
        req.on('error', error => {
            console.error(error)
        })
          
        req.end()
	} else if (command === 'coin') {
        let chunks = []
        const cmcOptions = {
            hostname: 'pro-api.coinmarketcap.com',
            port: 443,
            method: 'GET',
            path: '/v1/cryptocurrency/quotes/latest?CMC_PRO_API_KEY=' + process.env.CMC_API_KEY + '&symbol=' + args[0]
        }
        const req = https.request(cmcOptions, res => {
            console.log(`statusCode: ${res.statusCode}`)
          
            res.on('data', d => {
                chunks.push(d);
            }).on('end', function() {
                let d   = Buffer.concat(chunks);
                let schema = JSON.parse(d);

                function numberWithCommas(x) {
                    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
                }

                try {
                    const embed = new Discord.MessageEmbed()
                    .setTitle(schema.data[args[0].toString().toUpperCase()].name + ' (' + args[0].toString().toUpperCase() + ")")
                    .addField('CMC Rank', schema.data[args[0].toString().toUpperCase()].cmc_rank)
                    .addField("Market Cap", "$" + numberWithCommas(schema.data[args[0].toString().toUpperCase()].quote.USD.market_cap.toFixed(2)))
                    .addField('24h Volume', "$" + numberWithCommas(schema.data[args[0].toString().toUpperCase()].quote.USD.volume_24h.toFixed(2)))
                    .addField("Price", "$" + numberWithCommas(schema.data[args[0].toString().toUpperCase()].quote.USD.price.toFixed(2)))
                    .setColor("#0069ff")
                    .setFooter("via CoinMarketCap", "https://www.homihelp.com/frontend/images/cmc.png")
                    .setTimestamp()
                    message.channel.send(embed)
                } catch {
                    message.channel.send('Whoops! Invalid value for symbol: ' + args[0].toString().toUpperCase())
                }
            })
        })
          
        req.on('error', error => {
            console.error(error)
        })
          
        req.end()
	}
});

client.login(process.env.DISCORD_BOT_KEY);