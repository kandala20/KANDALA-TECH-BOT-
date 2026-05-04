const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const { default: makeWASocket, useMultiFileAuthState, DisconnectReason } = require('@whiskeysockets/baileys');
const { Boom } = require('@hapi/boom');
const QRCode = require('qrcode');
const os = require('os');
const { performance } = require('perf_hooks');

process.env.TZ = 'Africa/Nairobi';

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

const sessions = {};
const startTime = Date.now();

// --- HELPER FUNCTIONS ---
function formatBytes(bytes) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Byte';
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}

function getUptime() {
    const sec = Math.floor((Date.now() - startTime) / 1000);
    const h = Math.floor(sec / 3600);
    const m = Math.floor(sec % 3600 / 60);
    const s = Math.floor(sec % 60);
    return `${h}h ${m}m ${s}s`;
}

function getRamUsage() {
    const totalMem = os.totalmem();
    const freeMem = os.freemem();
    const usedMem = totalMem - freeMem;
    const usagePercent = Math.round((usedMem / totalMem) * 100);
    const bar = '█'.repeat(Math.floor(usagePercent / 10)) + '░'.repeat(10 - Math.floor(usagePercent / 10));
    return `[${bar}] ${usagePercent}%`;
}

const FULL_MENU = `
┏▣ ◈ *𝗞𝗔𝗡𝗗𝗔𝗟𝗔 𝗧𝗘𝗖𝗛®* ◈
┃ *ᴏᴡɴᴇʀ* : {owner}
┃ *ᴘʀᴇғɪx* : [. ]
┃ *ʜᴏsᴛ* : Render
┃ *ᴍᴏᴅᴇ* : Public
┃ *ᴠᴇʀsɪᴏɴ* : 1.9.4
┃ *sᴘᴇᴇᴅ* : {speed} ms
┃ *ᴜᴘᴛɪᴍᴇ* : {uptime}
┃ *ᴜsᴀɢᴇ* : {usage} of {total}
┃ *ʀᴀᴍ:* {ram}
┗▣

┏▣ ◈ *AI MENU* ◈
│➽.analyze.blackbox.code.dalle
│➽.deepseek.doppleai.gemini.generate
│➽.gpt.programming.recipe.story
│➽.summarize.teach.translate2
┗▣

┏▣ ◈ *AUDIO MENU* ◈
│➽.bass.blown.deep.earrape
│➽.reverse.robot.tomp3.toptt
│➽.volaudio
┗▣

┏▣ ◈ *DOWNLOAD MENU* ◈
│➽.apk.download.facebook.gdrive
│➽.gitclone.image.instagram.itunes
│➽.mediafire.pin.savestatus.song
│➽.song2.telesticker.tiktok.tiktokaudio
│➽.twitter.video.videodoc.xvideo
┗▣

┏▣ ◈ *EPHOTO360 MENU* ◈
│➽.1917style.advancedglow.blackpinklogo
│➽.blackpinkstyle.cartoonstyle.deletingtext
│➽.dragonball.effectclouds.flag3dtext
│➽.flagtext.freecreate.galaxystyle
│➽.galaxywallpaper.glitchtext.glowingtext
│➽.gradienttext.graffiti.incandescent
│➽.lighteffects.logomaker.luxurygold
│➽.makingneon.matrix.multicoloredneon
│➽.neonglitch.papercutstyle.pixelglitch
│➽.royaltext.sand.summerbeach
│➽.topography.typography.watercolortext
│➽.writetext
┗▣

┏▣ ◈ *FUN MENU* ◈
│➽.fact.jokes.memes.quotes
│➽.trivia.truthdetector.xxqc
┗▣

┏▣ ◈ *GAMES MENU* ◈
│➽.dare.truth.truthordare
┗▣

┏▣ ◈ *GROUP MENU* ◈
│➽.add.addcode.allow.announcements
│➽.antibadword.antibot.antidemote.antiforeign
│➽.antigroupmention.antilink.antilinkgc.antisticker
│➽.antitag.antitagadmin.approve.approveall
│➽.cancelkick.close.closetime.delallowed
│➽.delcode.delppgroup.demote.disapproveall
│➽.editsettings.getgrouppp.hidetag.invite
│➽.kick.kickall.kickinactive.link
│➽.listactive.listallowed.listcode.listinactive
│➽.listrequests.mediatag.open.opentime
│➽.poll.promote.reject.resetlink
│➽.setdesc.setgroupname.setppgroup.tag
│➽.tagadmin.tagall.totalmembers.userid
│➽.vcf.welcome
┗▣

┏▣ ◈ *IMAGE MENU* ◈
│➽.remini.wallpaper
┗▣

┏▣ ◈ *OTHER MENU* ◈
│➽.botstatus.pair.ping.ping2
│➽.repo.runtime.time
┗▣

┏▣ ◈ *OWNER MENU* ◈
│➽.autosavestatus.aza.block.delete
│➽.deljunk.delstickercmd.disk.dlvo
│➽.gcaddprivacy.groupid.hostip.join
│➽.lastseen.leave.listbadword.listblocked
│➽.listignorelist.listsudo.modestatus.online
│➽.owner.ppprivacy.react.readreceipts
│➽.resetaza.restart.setaza.setbio
│➽.setprofilepic.setstickercmd.tostatus.toviewonce
│➽.unblock.unblockall.update.vv2
│➽.warn
┗▣

┏▣ ◈ *RELIGION MENU* ◈
│➽.bible.quran
┗▣

┏▣ ◈ *SEARCH MENU* ◈
│➽.define.define2.imdb.lyrics
│➽.shazam.weather.yts
┗▣

┏▣ ◈ *SETTINGS MENU* ◈
│➽.addbadword.addcountrycode.addignorelist
│➽.addsudo.alwaysonline.antibug.anticall
│➽.antidelete.antideletestatus.antiedit.antiviewonce
│➽.autobio.autoblock.autoreact.autoreactstatus
│➽.autoread.autorecordtyping.autotype
│➽.autoviewstatus.chatbot.delanticallmsg.delcountrycode
│➽.deletebadword.delgoodbye.delignorelist.delsudo
│➽.delwelcome.getsettings.listcountrycode.listwarn
│➽.mode.resetsetting.resetwarn.setanticallmsg
│➽.setbotname.setcontextlink.setfont.setgoodbye
│➽.setmenu.setmenuimage.setownername.setownernumber
│➽.setprefix.setstatusemoji.setstickerauthor.setstickerpackname
│➽.settimezone.setwarn.setwatermark.setwelcome
│➽.showanticallmsg.showgoodbye.showwelcome.statusdelay
│➽.statussettings.testanticallmsg.testgoodbye.testwelcome
┗▣

┏▣ ◈ *SPORTS MENU* ◈
│➽.bundesligamatches.bundesligascorers.bundesligastandings
│➽.bundesligaupcoming.clmatches.clscorers.clstandings
│➽.clupcoming.eflmatches.eflscorers.eflstandings
│➽.eflupcoming.elmatches.elscorers.elstandings
│➽.elupcoming.eplmatches.eplscorers.eplstandings
│➽.eplupcoming.laligamatches.laligascorers.laligastandings
│➽.laligaupcoming.ligue1matches.ligue1scorers.ligue1standings
│➽.ligue1upcoming.serieamatches.serieascorers.serieastandings
│➽.serieaupcoming.wcmatches.wcscorers.wcstandings
│➽.wcupcoming.wrestlingevents.wwenews.wweschedule
┗▣

┏▣ ◈ *SUPPORT MENU* ◈
│➽.feedback.helpers
┗▣

┏▣ ◈ *TOOLS MENU* ◈
│➽.browse.calculate.device.emojimix
│➽.fancy.filtervcf.fliptext.genpass
│➽.getabout.getpp.gsmarena.obfuscate
│➽.qrcode.runeval.say.ssweb
│➽.sswebpc.sswebtab.sticker.take
│➽.texttopdf.tinyurl.toimage.tourl
│➽.vcc
┗▣

┏▣ ◈ *TRANSLATE MENU* ◈
│➽.translate
┗▣

┏▣ ◈ *VIDEO MENU* ◈
│➽.toaudio.tovideo.volvideo
┗▣

_Type_ *.command* _to use_
_Powered by 𝗞𝗔𝗡𝗗𝗔𝗟𝗔 𝗧𝗘𝗖𝗛®_
`;

async function startWhatsAppSock(chatId, number = null) {
    const sessionPath = number? `./auth_${chatId}_${number}` : `./auth_${chatId}`;
    const { state, saveCreds } = await useMultiFileAuthState(sessionPath);

    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: false,
        browser: ['KANDALA TECH', 'Chrome', '1.0.0']
    });

    const sessionKey = number? `${chatId}_${number}` : `${chatId}`;
    sessions[sessionKey] = sock;
    sock.ev.on('creds.update', saveCreds);

    sock.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect, qr } = update;

        if (qr &&!number) {
            const qrImage = await QRCode.toBuffer(qr);
            bot.sendPhoto(chatId, qrImage, {
                caption: `📱 *SCAN THIS QR CODE*\n\nWhatsApp > Linked Devices > Link a Device\n\nQR expires in 20 seconds!`,
                parse_mode: 'Markdown'
            });
        }

        if (connection === 'open') {
            const msg = number?
                `✅ *Successfully Paired!*\n\nNumber +${number} is now linked.\n\nSend *menu* in WhatsApp to see commands.` :
                `✅ *WhatsApp Linked Successfully!*\n\nNow send *menu* in WhatsApp to see commands.`;
            bot.sendMessage(chatId, msg, { parse_mode: 'Markdown' });

            // WHATSAPP MESSAGE HANDLER
            sock.ev.on('messages.upsert', async (m) => {
                const msg = m.messages[0];
                if (!msg.message || msg.key.fromMe) return;

                const text = msg.message.conversation || msg.message.extendedTextMessage?.text || '';
                const sender = msg.key.remoteJid;

                // MENU COMMAND
                if (text.toLowerCase() === 'menu' || text.toLowerCase() === '.menu') {
                    const start = performance.now();
                    await new Promise(r => setTimeout(r, 50));
                    const speed = (performance.now() - start).toFixed(4);
                    const owner = msg.pushName || 'User';

                    const menuText = FULL_MENU
                       .replace('{owner}', owner)
                       .replace('{speed}', speed)
                       .replace('{uptime}', getUptime())
                       .replace('{usage}', formatBytes(process.memoryUsage().rss))
                       .replace('{total}', formatBytes(os.totalmem()))
                       .replace('{ram}', getRamUsage());

                    await sock.sendMessage(sender, { text: menuText });
                }

                // PING COMMAND
                if (text.toLowerCase() === '.ping' || text.toLowerCase() === 'ping') {
                    const start = performance.now();
                    await sock.sendMessage(sender, { text: 'Testing speed...' });
                    const end = performance.now();
                    await sock.sendMessage(sender, { text: `🏓 Pong!\nSpeed: ${(end - start).toFixed(2)} ms\nUptime: ${getUptime()}` });
                }

                // RUNTIME COMMAND
                if (text.toLowerCase() === '.runtime') {
                    await sock.sendMessage(sender, { text: `⏰ *Runtime*\n\nBot has been running for: ${getUptime()}` });
                }

                // OWNER COMMAND
                if (text.toLowerCase() === '.owner') {
                    await sock.sendMessage(sender, { text: `👑 *Owner*\n\nContact: wa.me/254143210157\nDeveloper: 𝗞𝗔𝗡𝗗𝗔𝗟𝗔 𝗧𝗘𝗖𝗛®` });
                }
            });
        } else if (connection === 'close') {
            const shouldReconnect = (lastDisconnect?.error instanceof Boom)?.output?.statusCode!== DisconnectReason.loggedOut;
            if (!shouldReconnect) {
                const numText = number? ` for +${number}` : '';
                bot.sendMessage(chatId, `❌ Session${numText} logged out. Use /qr or /pair again.`);
            }
        }
    });

    return sock;
}

// --- TELEGRAM COMMANDS ---
bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, `
🔥 *WELCOME TO 𝗞𝗔𝗡𝗗𝗔𝗟𝗔 𝗧𝗘𝗖𝗛® BOT* 🔥

*Link WhatsApp:*
/qr - Get QR Code to scan
/pair +254xxx - Get 8-digit pair code

*Other:*
/help - See all commands
/ping - Test bot

Powered by *𝕂𝔸ℕ𝔻𝔸𝕃𝔸 𝕋𝔼ℂℍ®*
    `, { parse_mode: 'Markdown' });
});

bot.onText(/\/help/, (msg) => {
    bot.sendMessage(msg.chat.id, `
📋 *TELEGRAM COMMANDS:*

*WhatsApp Linking:*
/qr - Get QR Code
/pair +254xxx - Get Pair Code

*Other:*
/start - Start message
/ping - Test if bot is alive

*WhatsApp Commands:*
After linking, type *menu* in WhatsApp
    `, { parse_mode: 'Markdown' });
});

bot.onText(/\/ping/, (msg) => {
    bot.sendMessage(msg.chat.id, '🏓 Pong! Bot is online 💪');
});

// --- QR CODE COMMAND ---
bot.onText(/\/qr/, async (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, '⏳ Generating QR Code... Wait 10 seconds...');
    try {
        await startWhatsAppSock(chatId);
    } catch (err) {
        console.log('QR error:', err);
        bot.sendMessage(chatId, `❌ Failed to generate QR. Error: ${err.message}`);
    }
});

// --- PAIR CODE COMMAND ---
bot.onText(/\/pair (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const number = match[1].replace(/[^0-9]/g, '');

    if (number.length < 10) {
        return bot.sendMessage(chatId, '❌ Invalid number. Use: `/pair +254712345678`', { parse_mode: 'Markdown' });
    }

    bot.sendMessage(chatId, `⏳ Generating pair code for +${number}...`);

    try {
        const sock = await startWhatsAppSock(chatId, number);

        if (!sock.authState.creds.registered) {
            setTimeout(async () => {
                try {
                    const code = await sock.requestPairingCode(number);
                    bot.sendMessage(chatId, `
🔐 *WHATSAPP PAIR CODE*

Number: \`+${number}\`
Code: \`${code}\`

*How to link:*
1. Open WhatsApp
2. Linked Devices > Link a Device
3. Link with phone number instead
4. Enter this code

Code expires in 20 seconds!
                    `, { parse_mode: 'Markdown' });
                } catch (e) {
                    bot.sendMessage(chatId, `❌ Failed to get code. Try /qr instead. Error: ${e.message}`);
                }
            }, 3000);
        } else {
            bot.sendMessage(chatId, `✅ Number +${number} is already linked!`);
        }

    } catch (err) {
        console.log('Pair error:', err);
        bot.sendMessage(chatId, `❌ Failed to generate code. Try /qr instead. Error: ${err.message}`);
    }
});

bot.onText(/\/pair$/, (msg) => {
    bot.sendMessage(msg.chat.id, `
❌ *Use it like this:*

\`/pair +254712345678\`

Or use /qr for QR Code
    `, { parse_mode: 'Markdown' });
});

bot.on('polling_error', (error) => {
    console.log('Polling error:', error.code);
});
