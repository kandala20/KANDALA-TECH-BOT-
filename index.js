const { default: makeWASocket, useMultiFileAuthState, DisconnectReason, Browsers } = require('@whiskeysockets/baileys')
const TelegramBot = require('node-telegram-bot-api')
const pino = require('pino')
const fs = require('fs')

const BOT_TOKEN = process.env.BOT_TOKEN
const bot = new TelegramBot(BOT_TOKEN, { polling: true })

// START COMMAND
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id
    const text = `🔥 *Karibu 𝗞𝗔𝗡𝗗𝗔𝗟𝗔 𝗧𝗘𝗖𝗛® Bot* 🔥\n\n✅ *Get WhatsApp Pair Codes - ALL Countries*\n✅ *200+ Features | All Menu*\n✅ *24/7 Online | Fast & Secure*\n\n📌 *Commands:*\n/pair 254712345678 - Get pair code\n/menu - View all features\n/ping - Check bot speed\n/help - Jinsi ya kutumia\n\n_Developer: @kandala_tech_`
    bot.sendMessage(chatId, text, { parse_mode: 'Markdown' })
})

// MENU COMMAND  
bot.onText(/\/menu/, (msg) => {
    const chatId = msg.chat.id
    const menu = `🏠 *𝗞𝗔𝗡𝗗𝗔𝗟𝗔 𝗧𝗘𝗖𝗛® MAIN MENU* 🏠\n\n1️⃣ */pair* - WhatsApp Pair Code All Countries\n2️⃣ */ping* - Speed Test\n3️⃣ */start* - Restart Bot\n4️⃣ */help* - Maelekezo\n\n_200+ Features Loading..._\n\n_© 𝗞𝗔𝗡𝗗𝗔𝗟𝗔 𝗧𝗘𝗖𝗛® 2026_`
    bot.sendMessage(chatId, menu, { parse_mode: 'Markdown' })
})

// PING COMMAND
bot.onText(/\/ping/, (msg) => {
    const start = Date.now()
    bot.sendMessage(msg.chat.id, '🏓 Pong!').then((sent) => {
        const end = Date.now()
        bot.editMessageText(`🏓 *Pong!* ${end - start}ms\n\n⚡ *𝗞𝗔𝗡𝗗𝗔𝗟𝗔 𝗧𝗘𝗖𝗛® Fast*`, {
            chat_id: msg.chat.id,
            message_id: sent.message_id,
            parse_mode: 'Markdown'
        })
    })
})

// HELP COMMAND
bot.onText(/\/help/, (msg) => {
    const help = `📖 *HOW TO USE 𝗞𝗔𝗡𝗗𝗔𝗟𝗔 𝗧𝗘𝗖𝗛® BOT*\n\n1. Andika /pair ikifuatiwa na namba yako\n2. Mfano: \`/pair 254712345678\`\n3. Utaipata code ya digits 8\n4. Ingiza WhatsApp > Linked Devices > Link with phone number\n\n*Supports All Countries:* 254, 255, 256, 1, 44, 91, 234...\n\n_Maswali? @kandala_tech_`
    bot.sendMessage(msg.chat.id, help, { parse_mode: 'Markdown' })
})

// PAIR COMMAND - ALL COUNTRIES
bot.onText(/\/pair (.+)/, async (msg, match) => {
    const chatId = msg.chat.id
    const phoneNumber = match[1].replace(/[^0-9]/g, '')
    
    if (phoneNumber.length < 10 || phoneNumber.length > 15) {
        return bot.sendMessage(chatId, '❌ *Namba si sahihi!*\n\n✅ *Format:* `/pair 254712345678`\n✅ *Nchi zote zinakubalika*\n✅ *Usitumie + au 00*\n\n_Mfano: /pair 255712345678_', { parse_mode: 'Markdown' })
    }

    const waitMsg = await bot.sendMessage(chatId, '⏳ *Inaunganisha WhatsApp...*\n\n_𝗞𝗔𝗡𝗗𝗔𝗟𝗔 𝗧𝗘𝗖𝗛® Processing_', { parse_mode: 'Markdown' })

    try {
        const { state, saveCreds } = await useMultiFileAuthState(`./session_${chatId}`)
        const sock = makeWASocket({
            auth: state,
            printQRInTerminal: false,
            logger: pino({ level: 'silent' }),
            browser: Browsers.macOS('Desktop')
        })

        if (!sock.authState.creds.registered) {
            await new Promise(r => setTimeout(r, 2000))
            const code = await sock.requestPairingCode(phoneNumber)
            await bot.editMessageText(`✅ *PAIR CODE YAKO*\n\n📱 *Namba:* +${phoneNumber}\n🔐 *Code:* \`${code}\`\n\n📌 *Jinsi ya kutumia:*\n1. Fungua WhatsApp\n2. Settings > Linked Devices\n3. Link a Device > Link with phone number\n4. Ingiza code hii\n\n⏰ *Code inaaisha baada ya dakika chache*\n\n_© 𝗞𝗔𝗡𝗗𝗔𝗟𝗔 𝗧𝗘𝗖𝗛® 2026_`, {
                chat_id: chatId,
                message_id: waitMsg.message_id,
                parse_mode: 'Markdown'
            })
        }

        sock.ev.on('creds.update', saveCreds)
        setTimeout(() => sock.end(), 60000)

    } catch (error) {
        await bot.editMessageText(`❌ *Error:* ${error.message}\n\nJaribu tena baada ya dakika 1\n\n_𝗞𝗔𝗡𝗗𝗔𝗟𝗔 𝗧𝗘𝗖𝗛® Support_`, {
            chat_id: chatId,
            message_id: waitMsg.message_id,
            parse_mode: 'Markdown'
        })
    }
})

console.log('🔥 𝗞𝗔𝗡𝗗𝗔𝗟𝗔 𝗧𝗘𝗖𝗛® Bot Started - All Countries Supported')
const express = require('express')
const app = express()
app.get('/', (req, res) => res.send('𝗞𝗔𝗡𝗗𝗔𝗟𝗔 𝗧𝗘𝗖𝗛® Bot Running'))
app.listen(process.env.PORT || 3000)
