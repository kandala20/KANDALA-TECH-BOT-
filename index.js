const { default: makeWASocket, useMultiFileAuthState, Browsers, makeCacheableSignalKeyStore } = require("@whiskeysockets/baileys")
const pino = require("pino")
const TelegramBot = require("node-telegram-bot-api")
const express = require("express")

// EXPRESS KWA RENDER FREE - MUHIMU SANA
const app = express()
app.get('/', (req, res) => res.send('𝗞𝗔𝗡𝗗𝗔𝗟𝗔 𝗧𝗘𝗖𝗛® Bot Running 24/7'))
const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Keep-alive server running on ${PORT}`))

// BOT TOKEN
const token = process.env.BOT_TOKEN
const bot = new TelegramBot(token, { polling: true })

// STORE SESSIONS
const sessions = new Map()

async function startPairing(phoneNumber, chatId) {
    try {
        const { state, saveCreds } = await useMultiFileAuthState(`./session_${chatId}`)
        
        const sock = makeWASocket({
            auth: {
                creds: state.creds,
                keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "silent" }))
            },
            printQRInTerminal: false,
            logger: pino({ level: "silent" }),
            browser: Browsers.macOS("Desktop")
        })

        sock.ev.on("creds.update", saveCreds)

        sock.ev.on("connection.update", async (update) => {
            const { connection, lastDisconnect } = update
            
            if (connection === "open") {
                await bot.sendMessage(chatId, `✅ *Imefanikiwa!* Namba ${phoneNumber} imeunganishwa na WhatsApp\n\n𝗞𝗔𝗡𝗗𝗔𝗟𝗔 𝗧𝗘𝗖𝗛®`, { parse_mode: 'Markdown' })
                sessions.delete(chatId)
            }
            
            if (connection === "close") {
                await bot.sendMessage(chatId, `❌ Connection failed. Jaribu tena /pair ${phoneNumber}`)
                sessions.delete(chatId)
            }
        })

        // REQUEST PAIRING CODE
        if (!sock.authState.creds.registered) {
            const code = await sock.requestPairingCode(phoneNumber)
            const formatted
