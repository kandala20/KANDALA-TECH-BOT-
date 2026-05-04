const TelegramBot = require('node-telegram-bot-api');
const express = require('express');

// --- SERVER YA KEEP-ALIVE ---
const app = express();
const PORT = process.env.PORT || 10000;
app.get('/', (req, res) => res.send('𝗞𝗔𝗡𝗗𝗔𝗟𝗔 𝗧𝗘𝗖𝗛® Bot is Alive!'));
app.listen(PORT, () => console.log(`Keep-alive server running on ${PORT}`));

// --- BOT YAKO ---
const BOT_TOKEN = process.env.BOT_TOKEN;

if (!BOT_TOKEN) {
    console.error('FATAL ERROR: BOT_TOKEN haijawekwa kwa Environment Variables!');
    process.exit(1);
}

const bot = new TelegramBot(BOT_TOKEN, { polling: true });

console.log('𝗞𝗔𝗡𝗗𝗔𝗟𝗔 𝗧𝗘𝗖𝗛® Bot Started Successfully');

// --- COMMANDS ---
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const welcomeMsg = `
🔥 *KARIBU 𝗞𝗔𝗡𝗗𝗔𝗟𝗔 𝗧𝗘𝗖𝗛® BOT* 🔥

Nimeundwa na *𝕂𝔸ℕ𝔻𝔸𝕃𝔸 𝕋𝔼ℂℍ®*

Tumia /help kuona commands.
    `;
    bot.sendMessage(chatId, welcomeMsg, { parse_mode: 'Markdown' });
});

bot.onText(/\/help/, (msg) => {
    const chatId = msg.chat.id;
    const helpMsg = `
📋 *COMMANDS ZINAZOPATIKANA:*

/start - Anza bot
/help - Msaada
/ping - Test kama bot iko hai
    `;
    bot.sendMessage(chatId, helpMsg, { parse_mode: 'Markdown' });
});

bot.onText(/\/ping/, (msg) => {
    bot.sendMessage(msg.chat.id, '🏓 Pong! Bot iko hewani mkuu 💪');
});

bot.on('polling_error', (error) => {
    console.log('Polling error:', error.code);
});
