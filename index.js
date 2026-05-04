const TelegramBot = require('node-telegram-bot-api');
const express = require('express');

// --- KEEP-ALIVE SERVER ---
const app = express();
const PORT = process.env.PORT || 10000;
app.get('/', (req, res) => res.send('𝗞𝗔𝗡𝗗𝗔𝗟𝗔 𝗧𝗘𝗖𝗛® Bot is Alive!'));
app.listen(PORT, () => console.log(`Keep-alive server running on ${PORT}`));

// --- YOUR BOT ---
const BOT_TOKEN = process.env.BOT_TOKEN;

if (!BOT_TOKEN) {
    console.error('FATAL ERROR: BOT_TOKEN is not set in Environment Variables!');
    process.exit(1);
}

const bot = new TelegramBot(BOT_TOKEN, { polling: true });

console.log('𝗞𝗔𝗡𝗗𝗔𝗟𝗔 𝗧𝗘𝗖𝗛® Bot Started Successfully');

// --- COMMANDS ---
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const welcomeMsg = `
🔥 *WELCOME TO 𝗞𝗔𝗡𝗗𝗔𝗟𝗔 𝗧𝗘𝗖𝗛® BOT* 🔥

Created by *𝕂𝔸ℕ𝔻𝔸𝕃𝔸 𝕋𝔼ℂℍ®*

Use /help to see commands.
    `;
    bot.sendMessage(chatId, welcomeMsg, { parse_mode: 'Markdown' });
});

bot.onText(/\/help/, (msg) => {
    const chatId = msg.chat.id;
    const helpMsg = `
📋 *AVAILABLE COMMANDS:*

/start - Start the bot
/help - Help
/ping - Test if bot is alive
/pair - Connect your number
    `;
    bot.sendMessage(chatId, helpMsg, { parse_mode: 'Markdown' });
});

bot.onText(/\/ping/, (msg) => {
    bot.sendMessage(msg.chat.id, '🏓 Pong! Bot is online 💪');
});

// --- NEW PAIR COMMAND ---
bot.onText(/\/pair (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const number = match[1]; 
    
    bot.sendMessage(chatId, `
✅ *Number Saved*

Number: \`${number}\`
Status: Waiting for verification...

𝗞𝗔𝗡𝗗𝗔𝗟𝗔 𝗧𝗘𝗖𝗛® will notify you when complete.
    `, { parse_mode: 'Markdown' });
});

bot.onText(/\/pair$/, (msg) => {
    bot.sendMessage(msg.chat.id, `
❌ *Use it like this:*

\`/pair +254712345678\`

Type your full number after /pair
    `, { parse_mode: 'Markdown' });
});

bot.on('polling_error', (error) => {
    console.log('Polling error:', error.code);
});
