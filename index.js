const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const { default: makeWASocket, useMultiFileAuthState, DisconnectReason } = require('@whiskeysockets/baileys');
const { Boom } = require('@hapi/boom');

// --- KEEP-ALIVE SERVER ---
const app = express();
const PORT = process.env.PORT || 10000;
app.get('/', (req, res) => res.send('𝗞𝗔𝗡𝗗𝗔𝗟𝗔 𝗧𝗘𝗖𝗛® Bot is Alive!'));
app.listen(PORT, () => console.log(`Keep-alive server running on ${PORT}`));

// --- TELEGRAM BOT ---
const BOT_TOKEN = process.env.BOT_TOKEN;
if (!BOT_TOKEN) {
    console.error('FATAL ERROR: BOT_TOKEN is not set!');
    process.exit(1);
}
const bot = new TelegramBot(BOT_TOKEN, { polling: true });
console.log('𝗞𝗔𝗡𝗗𝗔𝗟𝗔 𝗧𝗘𝗖𝗛® Bot Started Successfully');

// --- STORE USER SESSIONS ---
const sessions = {};

// --- COMMANDS ---
bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, `
🔥 *WELCOME TO 𝗞𝗔𝗡𝗗𝗔𝗟𝗔 𝗧𝗘𝗖𝗛® BOT* 🔥

Created by *𝕂𝔸ℕ𝔻𝔸𝕃𝔸 𝕋𝔼ℂℍ®*

Use /pair +254xxx to get WhatsApp pair code
Use /help to see commands.
    `, { parse_mode: 'Markdown' });
});

bot.onText(/\/help/, (msg) => {
    bot.sendMessage(msg.chat.id, `
📋 *AVAILABLE COMMANDS:*

/start - Start the bot
/help - Help
/ping - Test if bot is alive
/pair +254xxx - Get WhatsApp pair code
    `, { parse_mode: 'Markdown' });
});

bot.onText(/\/ping/, (msg) => {
    bot.sendMessage(msg.chat.id, '🏓 Pong! Bot is online 💪');
});

// --- REAL PAIR COMMAND ---
bot.onText(/\/pair (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const number = match[1].replace(/[^0-9]/g, ''); // Remove +, spaces
    
    if (number.length < 10) {
        return bot.sendMessage(chatId, '❌ Invalid number. Use: `/pair +254712345678`', { parse_mode: 'Markdown' });
    }

    bot.sendMessage(chatId, `⏳ Generating pair code for +${number}...`);

    try {
        const { state, saveCreds } = await useMultiFileAuthState(`./auth_${chatId}`);
        
        const sock = makeWASocket({
            auth: state,
            printQRInTerminal: false,
            browser: ['KANDALA TECH', 'Chrome', '1.0.0']
        });

        sessions[chatId] = sock;

        sock.ev.on('creds.update', saveCreds);

        sock.ev.on('connection.update', (update) => {
            const { connection, lastDisconnect } = update;
            
            if (connection === 'open') {
                bot.sendMessage(chatId, `✅ *Successfully Paired!*\n\nNumber +${number} is now linked to 𝗞𝗔𝗡𝗗𝗔𝗟𝗔 𝗧𝗘𝗖𝗛®`, { parse_mode: 'Markdown' });
            } else if (connection === 'close') {
                const shouldReconnect = (lastDisconnect?.error instanceof Boom)?.output?.statusCode !== DisconnectReason.loggedOut;
                if (!shouldReconnect) {
                    bot.sendMessage(chatId, '❌ Session logged out. Use /pair again to link.');
                }
            }
        });

        if (!sock.authState.creds.registered) {
            setTimeout(async () => {
                const code = await sock.requestPairingCode(number);
                bot.sendMessage(chatId, `
🔐 *WHATSAPP PAIR CODE*

Number: \`+${number}\`
Code: \`${code}\`

*How to link:*
1. Open WhatsApp on your phone
2. Settings > Linked Devices > Link a Device
3. Link with phone number instead
4. Enter this 8-digit code

Code expires in 20 seconds!
                `, { parse_mode: 'Markdown' });
            }, 3000);
        } else {
            bot.sendMessage(chatId, `✅ Number +${number} is already linked!`);
        }

    } catch (err) {
        console.log('Pair error:', err);
        bot.sendMessage(chatId, `❌ Failed to generate code. Error: ${err.message}`);
    }
});

bot.onText(/\/pair$/, (msg) => {
    bot.sendMessage(msg.chat.id, `
❌ *Use it like this:*

\`/pair +254712345678\`

Enter your full WhatsApp number with country code
    `, { parse_mode: 'Markdown' });
});

bot.on('polling_error', (error) => {
    console.log('Polling error:', error.code);
});
