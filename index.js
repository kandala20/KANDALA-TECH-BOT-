const { default: makeWASocket, useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion } = require("@whiskeysockets/baileys")
const { TelegramBot } = require("node-telegram-bot-api")
const qrcode = require("qrcode")
const express = require("express")
const fs = require("fs")
const pino = require("pino")
const os = require("os")

console.log("=== BOT STARTING ===")

const app = express()
const port = process.env.PORT || 3000
app.get("/", (req, res) => res.send("𝗞𝗔𝗡𝗗𝗔𝗟𝗔 𝗧𝗘𝗖𝗛® Bot is Live"))
app.listen(port, () => console.log(`Server running on ${port}`))

// CHECK TELEGRAM TOKEN
if (!process.env.TELEGRAM_TOKEN) {
    console.log("❌ ERROR: TELEGRAM_TOKEN not set in Environment")
}
const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: true })
console.log("✅ Telegram Bot initialized")

let sock
let qrSent = false
global.latestQR = null

const OWNER_NAME = "KANDALA TECH"
const PREFIX = "."
const DEVELOPER = "@KandalaDev"

async function connectWA() {
    try {
        console.log("=== CONNECTING WHATSAPP ===")
        if (!fs.existsSync("./session")) {
            fs.mkdirSync("./session")
            console.log("✅ Session folder created")
        }
        
        const { state, saveCreds } = await useMultiFileAuthState("./session")
        const { version } = await fetchLatestBaileysVersion()
        console.log("✅ Baileys version:", version)

        sock = makeWASocket({
            version,
            auth: state,
            printQRInTerminal: false,
            logger: pino({ level: "silent" }),
            browser: ["KANDALA TECH", "Chrome", "1.0.0"]
        })
        console.log("✅ WhatsApp Socket created")

        sock.ev.on("creds.update", saveCreds)
        
        sock.ev.on("connection.update", async (update) => {
            const { connection, lastDisconnect, qr } = update
            console.log("Connection Update:", connection, qr? "QR Available" : "No QR")
            
            if (qr &&!qrSent) {
                qrSent = true
                global.latestQR = await qrcode.toBuffer(qr)
                console.log("✅ QR Code generated successfully")
            }
            if (connection === "close") {
                qrSent = false
                global.latestQR = null
                const reason = lastDisconnect?.error?.output?.statusCode
                console.log("❌ Connection closed. Reason:", reason)
                const shouldReconnect = reason!== DisconnectReason.loggedOut
                if (shouldReconnect) {
                    console.log("🔄 Reconnecting in 3s...")
                    setTimeout(connectWA, 3000)
                }
            } else if (connection === "open") {
                console.log("✅✅✅ WHATSAPP CONNECTED ✅✅✅")
            }
        })

        sock.ev.on("messages.upsert", async (m) => {
            const msg = m.messages[0]
            if (!msg.message || msg.key.fromMe) return
            const from = msg.key.remoteJid
            const body = msg.message.conversation || msg.message.extendedTextMessage?.text || ""
            const command = body.toLowerCase().split(" ")[0]

            if (command === ".menu") {
                await sock.sendMessage(from, { text: `𝗞𝗔𝗡𝗗𝗔𝗟𝗔 𝗧𝗘𝗖𝗛® BOT\n✅ Online 24/7\nCommands:.ping,.owner` })
            }
            else if (command === ".ping") {
                await sock.sendMessage(from, { text: `🏓 PONG! Bot is working` })
            }
        })

    } catch (err) {
        console.log("❌❌ ERROR IN connectWA:", err.message)
    }
}

connectWA()

// TELEGRAM COMMANDS
bot.onText(/\/start/, (msg) => {
    console.log("/start from:", msg.from.id)
    bot.sendMessage(msg.chat.id, `🔥 *Official KANDALA TECH® WhatsApp Bot*\n\nType /pair 255... to get code\n\n*Developer: ${DEVELOPER}*`, { parse_mode: "Markdown" })
})

bot.onText(/\/pair (.+)/, async (msg, match) => {
    console.log("/pair command received")
    if (!sock) {
        console.log("❌ Sock is undefined")
        return bot.sendMessage(msg.chat.id, "❌ *Bot not started yet*\n\nCheck Render Logs. Try /pair again in 1 minute", { parse_mode: "Markdown" })
    }
    if (sock?.user) {
        return bot.sendMessage(msg.chat.id, "✅ *Bot Already Linked!*")
    }
    
    const number = match[1].replace(/[^0-9]/g, "")
    console.log("Requesting pair code for:", number)
    
    try {
        const code = await sock.requestPairingCode(number)
        console.log("✅ Pair code generated:", code)
        bot.sendMessage(msg.chat.id, `✅ *Pair Code:* \`${code}\`\n\nWhatsApp > Link with phone number`, { parse_mode: "Markdown" })
    } catch (e) {
        console.log("❌ Pair Code Error:", e.message)
        bot.sendMessage(msg.chat.id, `❌ *Error:* ${e.message}\n\nTry /qr`, { parse_mode: "Markdown" })
    }
})

bot.onText(/\/qr/, async (msg) => {
    console.log("/qr command received")
    if (!sock) {
        return bot.sendMessage(msg.chat.id, "❌ *Bot not started yet*\n\nCheck Render Logs", { parse_mode: "Markdown" })
    }
    if (sock?.user) {
        return bot.sendMessage(msg.chat.id, "✅ *Bot Already Linked!*")
    }
    if (global.latestQR) {
        await bot.sendPhoto(msg.chat.id, global.latestQR)
        global.latestQR = null
        qrSent = false
    } else {
        bot.sendMessage(msg.chat.id, "⏳ *No QR yet*\n\nWait 20 seconds then send /qr again\nCheck Render Logs for errors", { parse_mode: "Markdown" })
    }
})

console.log("=== BOT STARTUP COMPLETE ===")
