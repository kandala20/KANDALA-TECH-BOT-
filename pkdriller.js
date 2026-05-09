'use strict';
var __createBinding = this && this.__createBinding || (Object.create ? function (_0x50c0f, _0x2c795a, _0x3e0982, _0x468796) {
    if (_0x468796 === undefined) {
        _0x468796 = _0x3e0982;
    }
    var _0x9ab34c = Object.getOwnPropertyDescriptor(_0x2c795a, _0x3e0982);
    if (!_0x9ab34c || ('get' in _0x9ab34c ? !_0x2c795a.__esModule : _0x9ab34c.writable || _0x9ab34c.configurable)) {
        _0x9ab34c = {
            'enumerable': true,
            'get': function () {
                return _0x2c795a[_0x3e0982];
            }
        };
    }
    Object.defineProperty(_0x50c0f, _0x468796, _0x9ab34c);
} : function (_0x5677b0, _0x1fc39c, _0x366b8b, _0x3839f7) {
    if (_0x3839f7 === undefined) {
        _0x3839f7 = _0x366b8b;
    }
    _0x5677b0[_0x3839f7] = _0x1fc39c[_0x366b8b];
});
var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (_0x4e536a, _0xa5b63b) {
    Object.defineProperty(_0x4e536a, 'default', {
        'enumerable': true,
        'value': _0xa5b63b
    });
} : function (_0x52bdd7, _0x36e46c) {
    _0x52bdd7.default = _0x36e46c;
});
var __importStar = this && this.__importStar || function (_0x23eb7d) {
    if (_0x23eb7d && _0x23eb7d.__esModule) {
        return _0x23eb7d;
    }
    var _0x2fad32 = {};
    if (_0x23eb7d != null) {
        for (var _0x1e483a in _0x23eb7d)
            if (_0x1e483a !== 'default' && Object.prototype.hasOwnProperty.call(_0x23eb7d, _0x1e483a)) {
                __createBinding(_0x2fad32, _0x23eb7d, _0x1e483a);
            }
    }
    __setModuleDefault(_0x2fad32, _0x23eb7d);
    return _0x2fad32;
};
var __importDefault = this && this.__importDefault || function (_0x1cc369) {
    return _0x1cc369 && _0x1cc369.__esModule ? _0x1cc369 : { 'default': _0x1cc369 };
};
Object.defineProperty(exports, '__esModule', { 'value': true });
const baileys_1 = __importStar(require('@whiskeysockets/baileys'));
const logger_1 = __importDefault(require('@whiskeysockets/baileys/lib/Utils/logger'));
const logger = logger_1.default.child({});
logger.level = 'silent';
const pino = require('pino');
const boom_1 = require('@hapi/boom');
const conf = require('./set');
let fs = require('fs-extra');
let path = require('path');
const FileType = require('file-type');
const {Sticker, createSticker, StickerTypes} = require('wa-sticker-formatter');
const {verifierEtatJid, recupererActionJid} = require('./bdd/antilien');
const {atbverifierEtatJid, atbrecupererActionJid} = require('./bdd/antibot');
let evt = require(__dirname + '/framework/zokou');
const {isUserBanned, addUserToBanList, removeUserFromBanList} = require('./bdd/banUser');
const {addGroupToBanList, isGroupBanned, removeGroupFromBanList} = require('./bdd/banGroup');
const {isGroupOnlyAdmin, addGroupToOnlyAdminList, removeGroupFromOnlyAdminList} = require('./bdd/onlyAdmin');
let {reagir} = require(__dirname + '/framework/app');
var session = conf.session.replace(/Zokou-MD-WHATSAPP-BOT;;;=>/g, '');
const prefixe = conf.PREFIXE;
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.static(path.join(__dirname, 'public')));
app.listen(PORT, () => {
    console.log('Server is running at http://localhost:' + PORT);
});
async function authentification() {
    try {
        if (!fs.existsSync(__dirname + '/scan/creds.json')) {
            console.log('connexion en cour ...');
            await fs.writeFileSync(__dirname + '/scan/creds.json', atob(session), 'utf8');
        } else {
            if (fs.existsSync(__dirname + '/scan/creds.json') && session != 'zokk') {
                await fs.writeFileSync(__dirname + '/scan/creds.json', atob(session), 'utf8');
            }
        }
    } catch (_0xa2a8b) {
        console.log('Session Invalid ' + _0xa2a8b);
        return;
    }
}
authentification();
0;
const store = baileys_1.makeInMemoryStore({
    'logger': pino().child({
        'level': 'silent',
        'stream': 'store'
    })
});
setTimeout(() => {
    async function _0x1b1480() {
        0;
        const {
            version: _0x3729c6,
            isLatest: _0x2bc48f
        } = await baileys_1.fetchLatestBaileysVersion();
        0;
        const {
            state: _0xfe616d,
            saveCreds: _0x43ea6e
        } = await baileys_1.useMultiFileAuthState(__dirname + '/scan');
        0;
        const _0x34e3ed = {
            'version': _0x3729c6,
            'logger': pino({ 'level': 'silent' }),
            'browser': [
                'Bmw-Md',
                'safari',
                '1.0.0'
            ],
            'printQRInTerminal': true,
            'fireInitQueries': false,
            'shouldSyncHistoryMessage': true,
            'downloadHistory': true,
            'syncFullHistory': true,
            'generateHighQualityLinkPreview': true,
            'markOnlineOnConnect': false,
            'keepAliveIntervalMs': 30000,
            'auth': {
                'creds': _0xfe616d.creds,
                'keys': baileys_1.makeCacheableSignalKeyStore(_0xfe616d.keys, logger)
            },
            'getMessage': async _0x415751 => {
                if (store) {
                    const _0x47b422 = await store.loadMessage(_0x415751.remoteJid, _0x415751.id, undefined);
                    return _0x47b422.message || undefined;
                }
                return { 'conversation': 'An Error Occurred, Repeat Command!' };
            }
        };
        0;
        const _0x243e88 = baileys_1.default(_0x34e3ed);
        store.bind(_0x243e88.ev);
        const _0x32404a = new Map();
        function _0x507042(_0x3dc481) {
            const _0x155b79 = Date.now();
            if (!_0x32404a.has(_0x3dc481)) {
                _0x32404a.set(_0x3dc481, _0x155b79);
                return false;
            }
            const _0x42a7dd = _0x32404a.get(_0x3dc481);
            if (_0x155b79 - _0x42a7dd < 3000) {
                return true;
            }
            _0x32404a.set(_0x3dc481, _0x155b79);
            return false;
        }
        const _0xe9147a = new Map();
        async function _0x29c430(_0x1d4240, _0xd3aa26) {
            if (_0xe9147a.has(_0xd3aa26)) {
                return _0xe9147a.get(_0xd3aa26);
            }
            try {
                const _0x461194 = await _0x1d4240.groupMetadata(_0xd3aa26);
                _0xe9147a.set(_0xd3aa26, _0x461194);
                setTimeout(() => _0xe9147a.delete(_0xd3aa26), 60000);
                return _0x461194;
            } catch (_0xb096db) {
                if (_0xb096db.message.includes('rate-overlimit')) {
                    await new Promise(_0x277665 => setTimeout(_0x277665, 5000));
                }
                return null;
            }
        }
        process.on('uncaughtException', _0x2a166b => {
        });
        process.on('unhandledRejection', _0x475030 => {
        });
        _0x243e88.ev.on('messages.upsert', async _0x2223dd => {
            const {messages: _0x5c7afd} = _0x2223dd;
            if (!_0x5c7afd || _0x5c7afd.length === 0) {
                return;
            }
            for (const _0x4dcb45 of _0x5c7afd) {
                if (!_0x4dcb45.message) {
                    continue;
                }
                const _0x5c4539 = _0x4dcb45.key.remoteJid;
                if (_0x507042(_0x5c4539)) {
                    continue;
                }
            }
        });
        _0x243e88.ev.on('groups.update', async _0x4faac6 => {
            for (const _0xb576f0 of _0x4faac6) {
                const {id: _0x22b220} = _0xb576f0;
                if (!_0x22b220.endsWith('@g.us')) {
                    continue;
                }
                await _0x29c430(_0x243e88, _0x22b220);
            }
        });
        _0x243e88.ev.on('messages.upsert', async _0x43b2d7 => {
            if (conf.ANTIDELETE1 === 'yes') {
                const {messages: _0x17eec3} = _0x43b2d7;
                const _0x20b50c = _0x17eec3[0];
                if (!_0x20b50c.message) {
                    return;
                }
                const _0x48820c = _0x20b50c.key;
                const _0x213692 = _0x48820c.remoteJid;
                if (!store.chats[_0x213692]) {
                    store.chats[_0x213692] = [];
                }
                store.chats[_0x213692].push(_0x20b50c);
                if (_0x20b50c.message.protocolMessage && _0x20b50c.message.protocolMessage.type === 0) {
                    const _0x4c6c05 = _0x20b50c.message.protocolMessage.key;
                    const _0x1d7b3e = store.chats[_0x213692];
                    const _0x475212 = _0x1d7b3e.find(_0x341e45 => _0x341e45.key.id === _0x4c6c05.id);
                    if (_0x475212) {
                        try {
                            const _0x388b74 = _0x475212.key.participant || _0x475212.key.remoteJid;
                            const _0x574f91 = '*\uD83E\uDDE8\uD83D\uDEAFAntidelete message alert\uD83D\uDEAB\u26D4 Rahmani-xmd doesn\'t allow deleting of messages This message was deleted by @' + _0x388b74.split('@')[0] + '*';
                            const _0x22e8bf = conf.NUMERO_OWNER + '@s.whatsapp.net';
                            if (_0x475212.message.conversation) {
                                await _0x243e88.sendMessage(_0x22e8bf, {
                                    'text': _0x574f91 + '\nDeleted message: ' + _0x475212.message.conversation,
                                    'mentions': [_0x388b74]
                                });
                            } else {
                                if (_0x475212.message.imageMessage) {
                                    const _0x60860 = _0x475212.message.imageMessage.caption || '';
                                    const _0x8248a0 = await _0x243e88.downloadAndSaveMediaMessage(_0x475212.message.imageMessage);
                                    await _0x243e88.sendMessage(_0x22e8bf, {
                                        'image': { 'url': _0x8248a0 },
                                        'caption': _0x574f91 + '\n' + _0x60860,
                                        'mentions': [_0x388b74]
                                    });
                                } else {
                                    if (_0x475212.message.videoMessage) {
                                        const _0x381d95 = _0x475212.message.videoMessage.caption || '';
                                        const _0x10b612 = await _0x243e88.downloadAndSaveMediaMessage(_0x475212.message.videoMessage);
                                        await _0x243e88.sendMessage(_0x22e8bf, {
                                            'video': { 'url': _0x10b612 },
                                            'caption': _0x574f91 + '\n' + _0x381d95,
                                            'mentions': [_0x388b74]
                                        });
                                    } else {
                                        if (_0x475212.message.audioMessage) {
                                            const _0x25a748 = await _0x243e88.downloadAndSaveMediaMessage(_0x475212.message.audioMessage);
                                            await _0x243e88.sendMessage(_0x22e8bf, {
                                                'audio': { 'url': _0x25a748 },
                                                'ptt': true,
                                                'caption': _0x574f91,
                                                'mentions': [_0x388b74]
                                            });
                                        } else {
                                            if (_0x475212.message.stickerMessage) {
                                                const _0x2ed7e2 = await _0x243e88.downloadAndSaveMediaMessage(_0x475212.message.stickerMessage);
                                                await _0x243e88.sendMessage(_0x22e8bf, {
                                                    'sticker': { 'url': _0x2ed7e2 },
                                                    'caption': _0x574f91,
                                                    'mentions': [_0x388b74]
                                                });
                                            }
                                        }
                                    }
                                }
                            }
                        } catch (_0x4be404) {
                            console.error('Error handling deleted message:', _0x4be404);
                        }
                    }
                }
            }
        })
;_0x243e88.ev.on('messages.upsert', async ({ messages }) => {
    const m = messages[0]
    if (!m.message) return

    // RUHUSU BOT KUJIBU MESSAGES ZAKO
    // if (m.key.fromMe) return <-- USIWEKE HII

    const body = m.message.conversation || m.message.extendedTextMessage?.text || ""
    const from = m.key.remoteJid
    const prefix = "."

    // COMMAND HANDLER
    if (body.startsWith(prefix)) {
        const args = body.slice(prefix.length).trim().split(/ +/)
        const command = args.shift().toLowerCase()

        console.log(`[CMD] ${command}`)

        if (command === "menu") {
            await _0x243e88.sendMessage(from, {
                text: `*𝗞𝗔𝗡𝗗𝗔𝗟𝗔 𝗧𝗘𝗖𝗛® BOT*\n\n*.menu* - Orodha\n*.alive* - Bot online\n*.ping* - Speed\n\n*Baileys 6.7.18 ✅*`
            }, { quoted: m })
        }

        if (command === "alive") {
            await _0x243e88.sendMessage(from, { text: `*KANDALA TECH IS ALIVE* 🕸\n✅ Online` }, { quoted: m })
        }

        if (command === "ping") {
            const start = Date.now()
            await _0x243e88.sendMessage(from, { text: '*Testing...*' }, { quoted: m })
            await _0x243e88.sendMessage(from, { text: `*Pong!* ${Date.now() - start}ms` }, { quoted: m })
        }
    }
})
        const _0xe3bf32 = _0x3c0a4d => new Promise(_0x6b4f98 => setTimeout(_0x6b4f98, _0x3c0a4d));
        let _0x242b59 = 0;
        if (conf.AUTO_REACT_STATUS === 'yes') {
            console.log('AUTO_REACT_STATUS is enabled. Listening for status updates...');
            _0x243e88.ev.on('messages.upsert', async _0x34d193 => {
                const {messages: _0x494066} = _0x34d193;
                for (const _0x5b0b1e of _0x494066) {
                    if (_0x5b0b1e.key && _0x5b0b1e.key.remoteJid === 'status@broadcast') {
                        console.log('Detected status update from:', _0x5b0b1e.key.remoteJid);
                        const _0x2826c5 = Date.now();
                        if (_0x2826c5 - _0x242b59 < 5000) {
                            console.log('Throttling reactions to prevent overflow.');
                            continue;
                        }
                        const _0x511531 = _0x243e88.user && _0x243e88.user.id ? _0x243e88.user.id.split(':')[0] + '@s.whatsapp.net' : null;
                        if (!_0x511531) {
                            console.log('Bot\'s user ID not available. Skipping reaction.');
                            continue;
                        }
                        await _0x243e88.sendMessage(_0x5b0b1e.key.remoteJid, {
                            'react': {
                                'key': _0x5b0b1e.key,
                                'text': '\uD83D\uDC9B'
                            }
                        }, {
                            'statusJidList': [
                                _0x5b0b1e.key.participant,
                                _0x511531
                            ]
                        });
                        _0x242b59 = Date.now();
                        console.log('Successfully reacted to status update by ' + _0x5b0b1e.key.remoteJid);
                        await _0xe3bf32(2000);
                    }
                }
            });
        }
        const _0x8a5dbb = {
            'hello': [
                '\uD83D\uDC4B',
                '\uD83D\uDE42',
                '\uD83D\uDE0A',
                '\uD83D\uDE4B‍\u2642️',
                '\uD83D\uDE4B‍\u2640️'
            ],
            'hi': [
                '\uD83D\uDC4B',
                '\uD83D\uDE42',
                '\uD83D\uDE01',
                '\uD83D\uDE4B‍\u2642️',
                '\uD83D\uDE4B‍\u2640️'
            ],
            'good morning': [
                '\uD83C\uDF05',
                '\uD83C\uDF1E',
                '\u2600️',
                '\uD83C\uDF3B',
                '\uD83C\uDF3C'
            ],
            'good night': [
                '\uD83C\uDF19',
                '\uD83C\uDF1C',
                '\u2B50',
                '\uD83C\uDF1B',
                '\uD83D\uDCAB'
            ],
            'bye': [
                '\uD83D\uDC4B',
                '\uD83D\uDE22',
                '\uD83D\uDC4B\uD83C\uDFFB',
                '\uD83E\uDD72',
                '\uD83D\uDEB6‍\u2642️',
                '\uD83D\uDEB6‍\u2640️'
            ],
            'see you': [
                '\uD83D\uDC4B',
                '\uD83D\uDE0A',
                '\uD83D\uDC4B\uD83C\uDFFB',
                '\u270C️',
                '\uD83D\uDEB6‍\u2642️'
            ],
            'bro': [
                '\uD83E\uDD1C\uD83E\uDD1B',
                '\uD83D\uDC4A',
                '\uD83D\uDCA5',
                '\uD83E\uDD4A',
                '\uD83D\uDC51'
            ],
            'sister': [
                '\uD83D\uDC6D',
                '\uD83D\uDC81‍\u2640️',
                '\uD83C\uDF38',
                '\uD83D\uDC96',
                '\uD83D\uDE4B‍\u2640️'
            ],
            'buddy': [
                '\uD83E\uDD17',
                '\uD83D\uDC6F‍\u2642️',
                '\uD83D\uDC6F‍\u2640️',
                '\uD83E\uDD1C\uD83E\uDD1B',
                '\uD83E\uDD1D'
            ],
            'niaje': [
                '\uD83D\uDC4B',
                '\uD83D\uDE04',
                '\uD83D\uDCA5',
                '\uD83D\uDD25',
                '\uD83D\uDD7A',
                '\uD83D\uDC83'
            ],
            'ibrahim': [
                '\uD83D\uDE0E',
                '\uD83D\uDCAF',
                '\uD83D\uDD25',
                '\uD83D\uDE80',
                '\uD83D\uDC51'
            ],
            'adams': [
                '\uD83D\uDD25',
                '\uD83D\uDCA5',
                '\uD83D\uDC51',
                '\uD83D\uDCAF',
                '\uD83D\uDE0E'
            ],
            'thanks': [
                '\uD83D\uDE4F',
                '\uD83D\uDE0A',
                '\uD83D\uDC96',
                '\u2764️',
                '\uD83D\uDC90'
            ],
            'thank you': [
                '\uD83D\uDE4F',
                '\uD83D\uDE0A',
                '\uD83D\uDE4C',
                '\uD83D\uDC96',
                '\uD83D\uDC9D'
            ],
            'love': [
                '\u2764️',
                '\uD83D\uDC96',
                '\uD83D\uDC98',
                '\uD83D\uDE0D',
                '\uD83D\uDE18',
                '\uD83D\uDC8D',
                '\uD83D\uDC91'
            ],
            'miss you': [
                '\uD83D\uDE22',
                '\uD83D\uDC94',
                '\uD83D\uDE14',
                '\uD83D\uDE2D',
                '\uD83D\uDC96'
            ],
            'sorry': [
                '\uD83D\uDE14',
                '\uD83D\uDE4F',
                '\uD83D\uDE13',
                '\uD83D\uDC94',
                '\uD83E\uDD7A'
            ],
            'apologies': [
                '\uD83D\uDE14',
                '\uD83D\uDC94',
                '\uD83D\uDE4F',
                '\uD83D\uDE1E',
                '\uD83D\uDE47‍\u2642️',
                '\uD83D\uDE47‍\u2640️'
            ],
            'congratulations': [
                '\uD83C\uDF89',
                '\uD83C\uDF8A',
                '\uD83C\uDFC6',
                '\uD83C\uDF81',
                '\uD83D\uDC4F'
            ],
            'well done': [
                '\uD83D\uDC4F',
                '\uD83D\uDCAA',
                '\uD83C\uDF89',
                '\uD83C\uDF96️',
                '\uD83D\uDC4D'
            ],
            'good job': [
                '\uD83D\uDC4F',
                '\uD83D\uDCAF',
                '\uD83D\uDC4D',
                '\uD83C\uDF1F',
                '\uD83C\uDF89'
            ],
            'happy': [
                '\uD83D\uDE01',
                '\uD83D\uDE0A',
                '\uD83C\uDF89',
                '\uD83C\uDF8A',
                '\uD83D\uDC83',
                '\uD83D\uDD7A'
            ],
            'sad': [
                '\uD83D\uDE22',
                '\uD83D\uDE2D',
                '\uD83D\uDE1E',
                '\uD83D\uDC94',
                '\uD83D\uDE13'
            ],
            'angry': [
                '\uD83D\uDE21',
                '\uD83E\uDD2C',
                '\uD83D\uDE24',
                '\uD83D\uDCA2',
                '\uD83D\uDE3E'
            ],
            'excited': [
                '\uD83E\uDD29',
                '\uD83C\uDF89',
                '\uD83D\uDE06',
                '\uD83E\uDD17',
                '\uD83E\uDD73'
            ],
            'surprised': [
                '\uD83D\uDE32',
                '\uD83D\uDE33',
                '\uD83D\uDE2F',
                '\uD83D\uDE2E',
                '\uD83D\uDE32'
            ],
            'help': [
                '\uD83C\uDD98',
                '\u2753',
                '\uD83D\uDE4F',
                '\uD83D\uDCA1',
                '\uD83D\uDC68‍\uD83D\uDCBB',
                '\uD83D\uDC69‍\uD83D\uDCBB'
            ],
            'how': [
                '\u2753',
                '\uD83E\uDD14',
                '\uD83D\uDE15',
                '\uD83D\uDE33',
                '\uD83E\uDDD0'
            ],
            'what': [
                '\u2753',
                '\uD83E\uDD37‍\u2642️',
                '\uD83E\uDD37‍\u2640️',
                '\uD83D\uDE15',
                '\uD83D\uDE32'
            ],
            'where': [
                '\u2753',
                '\uD83C\uDF0D',
                '\uD83D\uDDFA️',
                '\uD83C\uDFD9️',
                '\uD83C\uDF0E'
            ],
            'party': [
                '\uD83C\uDF89',
                '\uD83E\uDD73',
                '\uD83C\uDF7E',
                '\uD83C\uDF7B',
                '\uD83C\uDFA4',
                '\uD83D\uDC83',
                '\uD83D\uDD7A'
            ],
            'fun': [
                '\uD83E\uDD23',
                '\uD83D\uDE02',
                '\uD83E\uDD73',
                '\uD83C\uDF89',
                '\uD83C\uDFAE',
                '\uD83C\uDFB2'
            ],
            'hangout': [
                '\uD83C\uDF55',
                '\uD83C\uDF54',
                '\uD83C\uDF7B',
                '\uD83C\uDFAE',
                '\uD83C\uDF7F',
                '\uD83D\uDE06'
            ],
            'good': [
                '\uD83D\uDC4D',
                '\uD83D\uDC4C',
                '\uD83D\uDE0A',
                '\uD83D\uDCAF',
                '\uD83C\uDF1F'
            ],
            'awesome': [
                '\uD83D\uDD25',
                '\uD83D\uDE80',
                '\uD83E\uDD29',
                '\uD83D\uDC4F',
                '\uD83D\uDCA5'
            ],
            'cool': [
                '\uD83D\uDE0E',
                '\uD83D\uDC4C',
                '\uD83C\uDFAE',
                '\uD83C\uDFB8',
                '\uD83D\uDCA5'
            ],
            'boring': [
                '\uD83D\uDE34',
                '\uD83E\uDD71',
                '\uD83D\uDE44',
                '\uD83D\uDE11',
                '\uD83E\uDD10'
            ],
            'tired': [
                '\uD83D\uDE34',
                '\uD83E\uDD71',
                '\uD83D\uDE0C',
                '\uD83D\uDCA4',
                '\uD83D\uDECC'
            ],
            'bot': [
                '\uD83E\uDD16',
                '\uD83D\uDCBB',
                '\u2699️',
                '\uD83E\uDDE0',
                '\uD83D\uDD27'
            ],
            'robot': [
                '\uD83E\uDD16',
                '\u2699️',
                '\uD83D\uDCBB',
                '\uD83D\uDD0B',
                '\uD83E\uDD13'
            ],
            'cool bot': [
                '\uD83E\uDD16',
                '\uD83D\uDE0E',
                '\uD83E\uDD18',
                '\uD83D\uDCA5',
                '\uD83C\uDFAE'
            ],
            'love you': [
                '\u2764️',
                '\uD83D\uDC96',
                '\uD83D\uDE18',
                '\uD83D\uDC8B',
                '\uD83D\uDC91'
            ],
            'thank you bot': [
                '\uD83D\uDE4F',
                '\uD83E\uDD16',
                '\uD83D\uDE0A',
                '\uD83D\uDC96',
                '\uD83D\uDC90'
            ],
            'good night bot': [
                '\uD83C\uDF19',
                '\uD83C\uDF1B',
                '\u2B50',
                '\uD83D\uDCA4',
                '\uD83D\uDE34'
            ],
            'laughter': [
                '\uD83D\uDE02',
                '\uD83E\uDD23',
                '\uD83D\uDE06',
                '\uD83D\uDE04',
                '\uD83E\uDD2A'
            ],
            'crying': [
                '\uD83D\uDE22',
                '\uD83D\uDE2D',
                '\uD83D\uDE3F',
                '\uD83D\uDE13',
                '\uD83D\uDC94'
            ],
            'john': [
                '\uD83D\uDC51',
                '\uD83D\uDD25',
                '\uD83D\uDCA5',
                '\uD83D\uDE0E',
                '\uD83D\uDCAF'
            ],
            'mike': [
                '\uD83D\uDCAA',
                '\uD83C\uDFC6',
                '\uD83D\uDD25',
                '\uD83D\uDCA5',
                '\uD83D\uDE80'
            ],
            'lisa': [
                '\uD83D\uDC96',
                '\uD83D\uDC51',
                '\uD83C\uDF38',
                '\uD83D\uDE0D',
                '\uD83C\uDF3A'
            ],
            'emily': [
                '\uD83D\uDC96',
                '\uD83D\uDC83',
                '\uD83D\uDC51',
                '\uD83C\uDF89',
                '\uD83C\uDF80'
            ],
            'happy': [
                '\uD83D\uDE01',
                '\uD83D\uDE04',
                '\uD83D\uDE0A',
                '\uD83D\uDE4C',
                '\uD83C\uDF89',
                '\uD83E\uDD73',
                '\uD83D\uDC83',
                '\uD83D\uDD7A',
                '\uD83D\uDD25'
            ],
            'excited': [
                '\uD83E\uDD29',
                '\uD83C\uDF89',
                '\uD83E\uDD73',
                '\uD83C\uDF8A',
                '\uD83D\uDE06',
                '\uD83E\uDD17',
                '\uD83D\uDCA5',
                '\uD83D\uDE80'
            ],
            'love': [
                '\u2764️',
                '\uD83D\uDC96',
                '\uD83D\uDC98',
                '\uD83D\uDC9D',
                '\uD83D\uDE0D',
                '\uD83D\uDE18',
                '\uD83D\uDC8D',
                '\uD83D\uDC91',
                '\uD83C\uDF39'
            ],
            'grateful': [
                '\uD83D\uDE4F',
                '\uD83D\uDC90',
                '\uD83E\uDD70',
                '\u2764️',
                '\uD83D\uDE0A'
            ],
            'thankful': [
                '\uD83D\uDE4F',
                '\uD83D\uDC96',
                '\uD83D\uDC90',
                '\uD83E\uDD17',
                '\uD83D\uDE07'
            ],
            'sad': [
                '\uD83D\uDE22',
                '\uD83D\uDE2D',
                '\uD83D\uDE1E',
                '\uD83D\uDC94',
                '\uD83D\uDE14',
                '\uD83D\uDE13',
                '\uD83D\uDE16'
            ],
            'angry': [
                '\uD83D\uDE21',
                '\uD83D\uDE20',
                '\uD83E\uDD2C',
                '\uD83D\uDCA2',
                '\uD83D\uDC4A',
                '\uD83D\uDCA5',
                '\u26A1'
            ],
            'frustrated': [
                '\uD83D\uDE24',
                '\uD83D\uDE29',
                '\uD83E\uDD2F',
                '\uD83D\uDE11',
                '\uD83C\uDF00'
            ],
            'bored': [
                '\uD83D\uDE34',
                '\uD83E\uDD71',
                '\uD83D\uDE44',
                '\uD83D\uDE11',
                '\uD83D\uDE12'
            ],
            'surprised': [
                '\uD83D\uDE32',
                '\uD83D\uDE33',
                '\uD83D\uDE2E',
                '\uD83D\uDE2F',
                '\uD83D\uDE32',
                '\uD83D\uDE40'
            ],
            'shocked': [
                '\uD83D\uDE31',
                '\uD83D\uDE33',
                '\uD83D\uDE2F',
                '\uD83D\uDCA5',
                '\uD83E\uDD2F'
            ],
            'wow': [
                '\uD83D\uDE32',
                '\uD83D\uDE31',
                '\uD83E\uDD29',
                '\uD83E\uDD2F',
                '\uD83D\uDCA5',
                '\uD83D\uDE80'
            ],
            'crying': [
                '\uD83D\uDE2D',
                '\uD83D\uDE22',
                '\uD83D\uDC94',
                '\uD83D\uDE1E',
                '\uD83D\uDE13'
            ],
            'miss you': [
                '\uD83D\uDE2D',
                '\uD83D\uDC94',
                '\uD83D\uDE14',
                '\uD83D\uDE22',
                '\u2764️'
            ],
            'lonely': [
                '\uD83D\uDE14',
                '\uD83D\uDE2D',
                '\uD83D\uDE22',
                '\uD83D\uDC94',
                '\uD83D\uDE41'
            ],
            'help': [
                '\uD83C\uDD98',
                '\u2753',
                '\uD83E\uDD14',
                '\uD83D\uDE4B‍\u2642️',
                '\uD83D\uDE4B‍\u2640️',
                '\uD83D\uDCA1'
            ],
            'need assistance': [
                '\uD83C\uDD98',
                '\uD83D\uDC81‍\u2642️',
                '\uD83D\uDC81‍\u2640️',
                '\u2753',
                '\uD83D\uDE4F'
            ],
            'sorry': [
                '\uD83D\uDE14',
                '\uD83D\uDE4F',
                '\uD83D\uDC94',
                '\uD83D\uDE13',
                '\uD83E\uDD7A',
                '\uD83D\uDE47‍\u2642️',
                '\uD83D\uDE47‍\u2640️'
            ],
            'apology': [
                '\uD83D\uDE14',
                '\uD83D\uDE1E',
                '\uD83D\uDE4F',
                '\uD83D\uDC94',
                '\uD83D\uDE47‍\u2642️',
                '\uD83D\uDE47‍\u2640️'
            ],
            'good job': [
                '\uD83D\uDC4F',
                '\uD83D\uDCAF',
                '\uD83C\uDF89',
                '\uD83C\uDF1F',
                '\uD83D\uDC4D',
                '\uD83D\uDC4F'
            ],
            'well done': [
                '\uD83D\uDC4F',
                '\uD83C\uDF89',
                '\uD83C\uDF96️',
                '\uD83D\uDCAA',
                '\uD83D\uDD25',
                '\uD83C\uDFC6'
            ],
            'you can do it': [
                '\uD83D\uDCAA',
                '\uD83D\uDD25',
                '\uD83D\uDCAF',
                '\uD83D\uDE80',
                '\uD83C\uDF1F'
            ],
            'congratulations': [
                '\uD83C\uDF89',
                '\uD83C\uDFC6',
                '\uD83C\uDF8A',
                '\uD83C\uDF81',
                '\uD83D\uDC4F',
                '\uD83C\uDF7E'
            ],
            'cheers': [
                '\uD83E\uDD42',
                '\uD83C\uDF7B',
                '\uD83C\uDF7E',
                '\uD83C\uDF77',
                '\uD83E\uDD73',
                '\uD83C\uDF89'
            ],
            'goodbye': [
                '\uD83D\uDC4B',
                '\uD83D\uDE22',
                '\uD83D\uDC94',
                '\uD83D\uDC4B\uD83C\uDFFB',
                '\uD83D\uDEB6‍\u2642️',
                '\uD83D\uDEB6‍\u2640️'
            ],
            'bye': [
                '\uD83D\uDC4B',
                '\uD83D\uDC4B\uD83C\uDFFB',
                '\uD83E\uDD72',
                '\uD83D\uDEB6‍\u2642️',
                '\uD83D\uDEB6‍\u2640️'
            ],
            'see you': [
                '\uD83D\uDC4B',
                '\uD83D\uDC4B\uD83C\uDFFB',
                '\uD83E\uDD17',
                '\u270C️',
                '\uD83D\uDE4B‍\u2642️',
                '\uD83D\uDE4B‍\u2640️'
            ],
            'hello': [
                '\uD83D\uDC4B',
                '\uD83D\uDE42',
                '\uD83D\uDE0A',
                '\uD83D\uDE4B‍\u2642️',
                '\uD83D\uDE4B‍\u2640️'
            ],
            'hi': [
                '\uD83D\uDC4B',
                '\uD83D\uDE42',
                '\uD83D\uDE01',
                '\uD83D\uDE4B‍\u2642️',
                '\uD83D\uDE4B‍\u2640️'
            ],
            'party': [
                '\uD83C\uDF89',
                '\uD83E\uDD73',
                '\uD83C\uDFA4',
                '\uD83D\uDC83',
                '\uD83D\uDD7A',
                '\uD83C\uDF7B',
                '\uD83C\uDFB6'
            ],
            'fun': [
                '\uD83C\uDFAE',
                '\uD83C\uDFB2',
                '\uD83E\uDD23',
                '\uD83C\uDF89',
                '\uD83C\uDCCF'
            ],
            'play': [
                '\uD83C\uDFAE',
                '\uD83C\uDFC0',
                '\u26BD',
                '\uD83C\uDFBE',
                '\uD83C\uDFB1',
                '\uD83C\uDFB2',
                '\uD83C\uDFC6'
            ],
            'work': [
                '\uD83D\uDCBB',
                '\uD83D\uDDA5️',
                '\uD83D\uDCBC',
                '\uD83D\uDCC5',
                '\uD83D\uDCDD'
            ],
            'school': [
                '\uD83D\uDCDA',
                '\uD83C\uDFEB',
                '\uD83C\uDF92',
                '\uD83D\uDC68‍\uD83C\uDFEB',
                '\uD83D\uDC69‍\uD83C\uDFEB'
            ],
            'study': [
                '\uD83D\uDCD6',
                '\uD83D\uDCDD',
                '\uD83D\uDCA1',
                '\uD83D\uDCDA',
                '\uD83C\uDF93'
            ],
            'summer': [
                '\uD83C\uDF1E',
                '\uD83C\uDFD6️',
                '\uD83C\uDF34',
                '\uD83C\uDF49',
                '\uD83C\uDF3B'
            ],
            'winter': [
                '\u2744️',
                '\u2603️',
                '\uD83C\uDFBF',
                '\uD83D\uDD25',
                '\u26C4'
            ],
            'autumn': [
                '\uD83C\uDF41',
                '\uD83C\uDF42',
                '\uD83C\uDF83',
                '\uD83C\uDF42',
                '\uD83C\uDF41'
            ],
            'spring': [
                '\uD83C\uDF38',
                '\uD83C\uDF3C',
                '\uD83C\uDF37',
                '\uD83C\uDF31',
                '\uD83C\uDF3A'
            ],
            'birthday': [
                '\uD83C\uDF82',
                '\uD83C\uDF89',
                '\uD83C\uDF81',
                '\uD83C\uDF88',
                '\uD83C\uDF8A'
            ],
            'anniversary': [
                '\uD83D\uDC8D',
                '\uD83C\uDF89',
                '\uD83C\uDF81',
                '\uD83C\uDF88',
                '\uD83D\uDC91'
            ],
            'robot': [
                '\uD83E\uDD16',
                '\u2699️',
                '\uD83D\uDD27',
                '\uD83E\uDD16',
                '\uD83E\uDDE0'
            ],
            'bot': [
                '\uD83E\uDD16',
                '\uD83E\uDDE0',
                '\u2699️',
                '\uD83D\uDCBB',
                '\uD83D\uDDA5️'
            ],
            'thanks': [
                '\uD83D\uDE4F',
                '\uD83D\uDC96',
                '\uD83D\uDE0A',
                '\u2764️',
                '\uD83D\uDC90'
            ],
            'good luck': [
                '\uD83C\uDF40',
                '\uD83C\uDF40',
                '\uD83D\uDCAF',
                '\uD83C\uDF40',
                '\uD83C\uDFAF'
            ],
            'john': [
                '\uD83D\uDC51',
                '\uD83D\uDD25',
                '\uD83D\uDCA5',
                '\uD83D\uDE0E',
                '\uD83D\uDCAF'
            ],
            'mike': [
                '\uD83D\uDCAA',
                '\uD83C\uDFC6',
                '\uD83D\uDD25',
                '\uD83D\uDCA5',
                '\uD83D\uDE80'
            ],
            'lisa': [
                '\uD83D\uDC96',
                '\uD83D\uDC51',
                '\uD83C\uDF38',
                '\uD83D\uDE0D',
                '\uD83C\uDF3A'
            ],
            'emily': [
                '\uD83D\uDC96',
                '\uD83D\uDC83',
                '\uD83D\uDC51',
                '\uD83C\uDF89',
                '\uD83C\uDF80'
            ],
            'food': [
                '\uD83C\uDF55',
                '\uD83C\uDF54',
                '\uD83C\uDF5F',
                '\uD83C\uDF72',
                '\uD83C\uDF63',
                '\uD83C\uDF69'
            ],
            'drink': [
                '\uD83C\uDF7A',
                '\uD83C\uDF77',
                '\uD83E\uDD42',
                '\uD83C\uDF7E',
                '\uD83E\uDD64'
            ],
            'coffee': [
                '\u2615',
                '\uD83E\uDD64',
                '\uD83C\uDF75',
                '\uD83E\uDD76'
            ],
            'tea': [
                '\uD83C\uDF75',
                '\uD83E\uDED6',
                '\uD83C\uDF42',
                '\uD83C\uDF43'
            ],
            'excited': [
                '\uD83E\uDD29',
                '\uD83C\uDF89',
                '\uD83E\uDD73',
                '\uD83D\uDCA5',
                '\uD83D\uDE80',
                '\uD83D\uDE06',
                '\uD83D\uDE1C'
            ],
            'nervous': [
                '\uD83D\uDE2C',
                '\uD83D\uDE30',
                '\uD83E\uDD1E',
                '\uD83E\uDDE0',
                '\uD83D\uDC50'
            ],
            'confused': [
                '\uD83E\uDD14',
                '\uD83D\uDE15',
                '\uD83E\uDDD0',
                '\uD83D\uDE35',
                '\uD83E\uDD37‍\u2642️',
                '\uD83E\uDD37‍\u2640️'
            ],
            'embarrassed': [
                '\uD83D\uDE33',
                '\uD83D\uDE33',
                '\uD83D\uDE48',
                '\uD83D\uDE33',
                '\uD83D\uDE2C',
                '\uD83D\uDE05'
            ],
            'hopeful': [
                '\uD83E\uDD1E',
                '\uD83C\uDF20',
                '\uD83D\uDE4F',
                '\uD83C\uDF08',
                '\uD83D\uDCAB'
            ],
            'shy': [
                '\uD83D\uDE0A',
                '\uD83D\uDE33',
                '\uD83D\uDE48',
                '\uD83E\uDEE3',
                '\uD83E\uDEF6'
            ],
            'family': [
                '\uD83D\uDC68‍\uD83D\uDC69‍\uD83D\uDC67‍\uD83D\uDC66',
                '\uD83D\uDC69‍\uD83D\uDC67',
                '\uD83D\uDC69‍\uD83D\uDC67‍\uD83D\uDC66',
                '\uD83D\uDC68‍\uD83D\uDC69‍\uD83D\uDC67',
                '\uD83D\uDC8F',
                '\uD83D\uDC68‍\uD83D\uDC68‍\uD83D\uDC67‍\uD83D\uDC66',
                '\uD83D\uDC69‍\uD83D\uDC69‍\uD83D\uDC67‍\uD83D\uDC66'
            ],
            'friends': [
                '\uD83D\uDC6F‍\u2642️',
                '\uD83D\uDC6F‍\u2640️',
                '\uD83E\uDD17',
                '\uD83E\uDEF6',
                '\uD83D\uDCAB',
                '\uD83E\uDD1D'
            ],
            'relationship': [
                '\uD83D\uDC91',
                '\u2764️',
                '\uD83D\uDC8D',
                '\uD83E\uDD70',
                '\uD83D\uDC8F',
                '\uD83D\uDC8C'
            ],
            'couple': [
                '\uD83D\uDC69‍\u2764️‍\uD83D\uDC68',
                '\uD83D\uDC68‍\u2764️‍\uD83D\uDC68',
                '\uD83D\uDC69‍\u2764️‍\uD83D\uDC69',
                '\uD83D\uDC8D',
                '\uD83D\uDC91',
                '\uD83D\uDC8F'
            ],
            'best friend': [
                '\uD83E\uDD17',
                '\uD83D\uDC96',
                '\uD83D\uDC6F‍\u2640️',
                '\uD83D\uDC6F‍\u2642️',
                '\uD83D\uDE4C'
            ],
            'love you': [
                '\u2764️',
                '\uD83D\uDE18',
                '\uD83D\uDC96',
                '\uD83D\uDC98',
                '\uD83D\uDC93',
                '\uD83D\uDC97'
            ],
            'vacation': [
                '\uD83C\uDFD6️',
                '\uD83C\uDF34',
                '\u2708️',
                '\uD83C\uDF0A',
                '\uD83D\uDEF3️',
                '\uD83C\uDFDE️',
                '\uD83C\uDFD5️'
            ],
            'beach': [
                '\uD83C\uDFD6️',
                '\uD83C\uDF0A',
                '\uD83C\uDFC4‍\u2640️',
                '\uD83E\uDE74',
                '\uD83C\uDFD6️',
                '\uD83C\uDF34',
                '\uD83E\uDD80'
            ],
            'road trip': [
                '\uD83D\uDE97',
                '\uD83D\uDE99',
                '\uD83D\uDEE3️',
                '\uD83C\uDF04',
                '\uD83C\uDF1F'
            ],
            'mountain': [
                '\uD83C\uDFDE️',
                '\u26F0️',
                '\uD83C\uDFD4️',
                '\uD83C\uDF04',
                '\uD83C\uDFD5️',
                '\uD83C\uDF32'
            ],
            'city': [
                '\uD83C\uDFD9️',
                '\uD83C\uDF06',
                '\uD83D\uDDFD',
                '\uD83C\uDF07',
                '\uD83D\uDE96',
                '\uD83C\uDFD9️'
            ],
            'exploration': [
                '\uD83C\uDF0D',
                '\uD83E\uDDED',
                '\uD83C\uDF0E',
                '\uD83C\uDF0D',
                '\uD83E\uDDF3',
                '\uD83D\uDCCD',
                '\u26F5'
            ],
            'morning': [
                '\uD83C\uDF05',
                '\u2600️',
                '\uD83C\uDF1E',
                '\uD83C\uDF04',
                '\uD83C\uDF3B',
                '\uD83D\uDD76️'
            ],
            'afternoon': [
                '\uD83C\uDF1E',
                '\uD83C\uDF24️',
                '\u26C5',
                '\uD83C\uDF3B',
                '\uD83C\uDF07'
            ],
            'night': [
                '\uD83C\uDF19',
                '\uD83C\uDF1B',
                '\uD83C\uDF1C',
                '\u2B50',
                '\uD83C\uDF1A',
                '\uD83D\uDCAB'
            ],
            'evening': [
                '\uD83C\uDF19',
                '\uD83C\uDF1B',
                '\uD83C\uDF07',
                '\uD83C\uDF13',
                '\uD83D\uDCAB'
            ],
            'goodnight': [
                '\uD83C\uDF19',
                '\uD83D\uDE34',
                '\uD83D\uDCA4',
                '\uD83C\uDF1C',
                '\uD83D\uDECC',
                '\uD83C\uDF1B',
                '\u2728'
            ],
            'productivity': [
                '\uD83D\uDCBB',
                '\uD83D\uDCCA',
                '\uD83D\uDCDD',
                '\uD83D\uDCBC',
                '\uD83D\uDCC5',
                '\uD83D\uDCC8'
            ],
            'office': [
                '\uD83D\uDDA5️',
                '\uD83D\uDCBC',
                '\uD83D\uDDC2️',
                '\uD83D\uDCC5',
                '\uD83D\uDD8B️'
            ],
            'workout': [
                '\uD83C\uDFCB️‍\u2640️',
                '\uD83D\uDCAA',
                '\uD83C\uDFC3‍\u2642️',
                '\uD83C\uDFC3‍\u2640️',
                '\uD83E\uDD38‍\u2640️',
                '\uD83D\uDEB4‍\u2640️',
                '\uD83C\uDFCB️‍\u2642️'
            ],
            'study hard': [
                '\uD83D\uDCDA',
                '\uD83D\uDCDD',
                '\uD83D\uDCD6',
                '\uD83D\uDCA1',
                '\uD83D\uDCBC'
            ],
            'focus': [
                '\uD83D\uDD0D',
                '\uD83C\uDFAF',
                '\uD83D\uDCBB',
                '\uD83E\uDDE0',
                '\uD83E\uDD13'
            ],
            'food': [
                '\uD83C\uDF55',
                '\uD83C\uDF54',
                '\uD83C\uDF5F',
                '\uD83C\uDF56',
                '\uD83C\uDF56',
                '\uD83E\uDD57',
                '\uD83C\uDF63',
                '\uD83C\uDF72'
            ],
            'drink': [
                '\uD83C\uDF79',
                '\uD83E\uDD64',
                '\uD83C\uDF77',
                '\uD83C\uDF7E',
                '\uD83C\uDF78',
                '\uD83C\uDF7A',
                '\uD83E\uDD42',
                '\u2615'
            ],
            'coffee': [
                '\u2615',
                '\uD83E\uDDC3',
                '\uD83C\uDF75',
                '\uD83E\uDD64',
                '\uD83C\uDF6B'
            ],
            'cake': [
                '\uD83C\uDF70',
                '\uD83C\uDF82',
                '\uD83C\uDF69',
                '\uD83C\uDF6A',
                '\uD83C\uDF6B',
                '\uD83E\uDDC1'
            ],
            'ice cream': [
                '\uD83C\uDF66',
                '\uD83C\uDF68',
                '\uD83C\uDF67',
                '\uD83C\uDF68',
                '\uD83C\uDF6A'
            ],
            'cat': [
                '\uD83D\uDC31',
                '\uD83D\uDE3A',
                '\uD83D\uDC08',
                '\uD83D\uDC3E'
            ],
            'dog': [
                '\uD83D\uDC36',
                '\uD83D\uDC15',
                '\uD83D\uDC29',
                '\uD83D\uDC15‍\uD83E\uDDBA',
                '\uD83D\uDC3E'
            ],
            'bird': [
                '\uD83D\uDC26',
                '\uD83E\uDD89',
                '\uD83E\uDD85',
                '\uD83D\uDC26'
            ],
            'fish': [
                '\uD83D\uDC1F',
                '\uD83D\uDC20',
                '\uD83D\uDC21',
                '\uD83D\uDC21',
                '\uD83D\uDC19'
            ],
            'rabbit': [
                '\uD83D\uDC30',
                '\uD83D\uDC07',
                '\uD83D\uDC39',
                '\uD83D\uDC3E'
            ],
            'lion': [
                '\uD83E\uDD81',
                '\uD83D\uDC2F',
                '\uD83D\uDC05',
                '\uD83D\uDC06'
            ],
            'bear': [
                '\uD83D\uDC3B',
                '\uD83D\uDC28',
                '\uD83D\uDC3C',
                '\uD83D\uDC3B‍\u2744️'
            ],
            'elephant': [
                '\uD83D\uDC18',
                '\uD83D\uDC18'
            ],
            'sun': [
                '\u2600️',
                '\uD83C\uDF1E',
                '\uD83C\uDF04',
                '\uD83C\uDF05',
                '\uD83C\uDF1E'
            ],
            'rain': [
                '\uD83C\uDF27️',
                '\u2614',
                '\uD83C\uDF08',
                '\uD83C\uDF26️',
                '\uD83C\uDF27️'
            ],
            'snow': [
                '\u2744️',
                '\u26C4',
                '\uD83C\uDF28️',
                '\uD83C\uDF2C️',
                '\u2744️'
            ],
            'wind': [
                '\uD83D\uDCA8',
                '\uD83C\uDF2C️',
                '\uD83C\uDF2A️',
                '\uD83C\uDF2C️'
            ],
            'earth': [
                '\uD83C\uDF0D',
                '\uD83C\uDF0F',
                '\uD83C\uDF0E',
                '\uD83C\uDF0D',
                '\uD83C\uDF31',
                '\uD83C\uDF33'
            ],
            'phone': [
                '\uD83D\uDCF1',
                '\u260E️',
                '\uD83D\uDCDE',
                '\uD83D\uDCF2',
                '\uD83D\uDCE1'
            ],
            'computer': [
                '\uD83D\uDCBB',
                '\uD83D\uDDA5️',
                '\u2328️',
                '\uD83D\uDDB1️',
                '\uD83D\uDDA5️'
            ],
            'internet': [
                '\uD83C\uDF10',
                '\uD83D\uDCBB',
                '\uD83D\uDCF6',
                '\uD83D\uDCE1',
                '\uD83D\uDD0C'
            ],
            'software': [
                '\uD83D\uDCBB',
                '\uD83D\uDDA5️',
                '\uD83E\uDDD1‍\uD83D\uDCBB',
                '\uD83D\uDDB1️',
                '\uD83D\uDCA1'
            ],
            'star': [
                '\u2B50',
                '\uD83C\uDF1F',
                '\u2728',
                '\uD83C\uDF20',
                '\uD83D\uDCAB'
            ],
            'light': [
                '\uD83D\uDCA1',
                '\uD83D\uDD26',
                '\u2728',
                '\uD83C\uDF1F',
                '\uD83D\uDD06'
            ],
            'money': [
                '\uD83D\uDCB5',
                '\uD83D\uDCB0',
                '\uD83D\uDCB8',
                '\uD83D\uDCB3',
                '\uD83D\uDCB6'
            ],
            'victory': [
                '\u270C️',
                '\uD83C\uDFC6',
                '\uD83C\uDF89',
                '\uD83C\uDF96️',
                '\uD83C\uDF8A'
            ],
            'gift': [
                '\uD83C\uDF81',
                '\uD83C\uDF80',
                '\uD83C\uDF89',
                '\uD83C\uDF81'
            ],
            'fire': [
                '\uD83D\uDD25',
                '\uD83D\uDCA5',
                '\uD83C\uDF0B',
                '\uD83D\uDD25',
                '\uD83D\uDCA3'
            ],
            'music': [
                '\uD83C\uDFB5',
                '\uD83C\uDFB6',
                '\uD83C\uDFA7',
                '\uD83C\uDFA4',
                '\uD83C\uDFB8',
                '\uD83C\uDFB9'
            ],
            'sports': [
                '\u26BD',
                '\uD83C\uDFC0',
                '\uD83C\uDFC8',
                '\uD83C\uDFBE',
                '\uD83C\uDFCB️‍\u2642️',
                '\uD83C\uDFC3‍\u2640️',
                '\uD83C\uDFC6',
                '\uD83E\uDD47'
            ],
            'games': [
                '\uD83C\uDFAE',
                '\uD83D\uDD79️',
                '\uD83C\uDFB2',
                '\uD83C\uDFAF',
                '\uD83E\uDDE9'
            ],
            'art': [
                '\uD83C\uDFA8',
                '\uD83D\uDD8C️',
                '\uD83D\uDDBC️',
                '\uD83C\uDFAD',
                '\uD83D\uDD8D️'
            ],
            'photography': [
                '\uD83D\uDCF7',
                '\uD83D\uDCF8',
                '\uD83D\uDCF8',
                '\uD83D\uDDBC️',
                '\uD83C\uDFA5'
            ],
            'reading': [
                '\uD83D\uDCDA',
                '\uD83D\uDCD6',
                '\uD83D\uDCDA',
                '\uD83D\uDCF0'
            ],
            'craft': [
                '\uD83E\uDDF5',
                '\uD83E\uDEA1',
                '\u2702️',
                '\uD83E\uDEA2',
                '\uD83E\uDDF6'
            ],
            'hello': [
                '\uD83D\uDC4B',
                '\uD83D\uDE42',
                '\uD83D\uDE0A'
            ],
            'hey': [
                '\uD83D\uDC4B',
                '\uD83D\uDE42',
                '\uD83D\uDE0A'
            ],
            'hi': [
                '\uD83D\uDC4B',
                '\uD83D\uDE42',
                '\uD83D\uDE0A'
            ],
            'bye': [
                '\uD83D\uDC4B',
                '\uD83D\uDE22',
                '\uD83D\uDC4B'
            ],
            'goodbye': [
                '\uD83D\uDC4B',
                '\uD83D\uDE22',
                '\uD83D\uDE4B‍\u2642️'
            ],
            'thanks': [
                '\uD83D\uDE4F',
                '\uD83D\uDE0A',
                '\uD83C\uDF39'
            ],
            'thank you': [
                '\uD83D\uDE4F',
                '\uD83D\uDE0A',
                '\uD83C\uDF38'
            ],
            'welcome': [
                '\uD83D\uDE0A',
                '\uD83D\uDE04',
                '\uD83C\uDF37'
            ],
            'congrats': [
                '\uD83C\uDF89',
                '\uD83D\uDC4F',
                '\uD83E\uDD73'
            ],
            'congratulations': [
                '\uD83C\uDF89',
                '\uD83D\uDC4F',
                '\uD83E\uDD73'
            ],
            'good job': [
                '\uD83D\uDC4F',
                '\uD83D\uDC4D',
                '\uD83D\uDE4C'
            ],
            'great': [
                '\uD83D\uDC4D',
                '\uD83D\uDCAA',
                '\uD83D\uDE04'
            ],
            'cool': [
                '\uD83D\uDE0E',
                '\uD83E\uDD19',
                '\uD83D\uDD25'
            ],
            'ok': [
                '\uD83D\uDC4C',
                '\uD83D\uDC4D',
                '\u2705'
            ],
            'love': [
                '\u2764️',
                '\uD83D\uDC95',
                '\uD83D\uDC96'
            ],
            'like': [
                '\uD83D\uDC4D',
                '\u2764️',
                '\uD83D\uDC4C'
            ],
            'happy': [
                '\uD83D\uDE0A',
                '\uD83D\uDE01',
                '\uD83D\uDE42'
            ],
            'joy': [
                '\uD83D\uDE01',
                '\uD83D\uDE06',
                '\uD83D\uDE02'
            ],
            'laugh': [
                '\uD83D\uDE02',
                '\uD83E\uDD23',
                '\uD83D\uDE01'
            ],
            'sad': [
                '\uD83D\uDE22',
                '\uD83D\uDE2D',
                '\u2639️'
            ],
            'cry': [
                '\uD83D\uDE2D',
                '\uD83D\uDE22',
                '\uD83D\uDE3F'
            ],
            'angry': [
                '\uD83D\uDE21',
                '\uD83D\uDE20',
                '\uD83D\uDCA2'
            ],
            'mad': [
                '\uD83D\uDE20',
                '\uD83D\uDE21',
                '\uD83D\uDE24'
            ],
            'shocked': [
                '\uD83D\uDE32',
                '\uD83D\uDE31',
                '\uD83D\uDE2E'
            ],
            'scared': [
                '\uD83D\uDE31',
                '\uD83D\uDE28',
                '\uD83D\uDE27'
            ],
            'sleep': [
                '\uD83D\uDE34',
                '\uD83D\uDCA4',
                '\uD83D\uDE0C'
            ],
            'bored': [
                '\uD83D\uDE10',
                '\uD83D\uDE11',
                '\uD83D\uDE44'
            ],
            'excited': [
                '\uD83E\uDD29',
                '\uD83E\uDD73',
                '\uD83C\uDF89'
            ],
            'party': [
                '\uD83E\uDD73',
                '\uD83C\uDF89',
                '\uD83C\uDF7E'
            ],
            'kiss': [
                '\uD83D\uDE18',
                '\uD83D\uDC8B',
                '\uD83D\uDE0D'
            ],
            'hug': [
                '\uD83E\uDD17',
                '\u2764️',
                '\uD83D\uDC95'
            ],
            'peace': [
                '\u270C️',
                '\uD83D\uDD4A️',
                '\u270C️'
            ],
            'pizza': [
                '\uD83C\uDF55',
                '\uD83E\uDD56',
                '\uD83C\uDF5F'
            ],
            'coffee': [
                '\u2615',
                '\uD83E\uDD64',
                '\uD83C\uDF75'
            ],
            'water': [
                '\uD83D\uDCA7',
                '\uD83D\uDCA6',
                '\uD83C\uDF0A'
            ],
            'wine': [
                '\uD83C\uDF77',
                '\uD83C\uDF78',
                '\uD83C\uDF7E'
            ],
            'hello': [
                '\uD83D\uDC4B',
                '\uD83D\uDE42',
                '\uD83D\uDE0A',
                '\uD83D\uDE03',
                '\uD83D\uDE04'
            ],
            'hey': [
                '\uD83D\uDC4B',
                '\uD83D\uDE0A',
                '\uD83D\uDE4B',
                '\uD83D\uDE04',
                '\uD83D\uDE01'
            ],
            'hi': [
                '\uD83D\uDC4B',
                '\uD83D\uDE00',
                '\uD83D\uDE01',
                '\uD83D\uDE03',
                '\uD83D\uDE42'
            ],
            'bye': [
                '\uD83D\uDC4B',
                '\uD83D\uDE22',
                '\uD83D\uDE4B‍\u2642️',
                '\uD83D\uDE1E',
                '\uD83D\uDE14'
            ],
            'goodbye': [
                '\uD83D\uDC4B',
                '\uD83D\uDE22',
                '\uD83D\uDE4B‍\u2640️',
                '\uD83D\uDE14',
                '\uD83D\uDE2D'
            ],
            'thanks': [
                '\uD83D\uDE4F',
                '\uD83D\uDE0A',
                '\uD83C\uDF39',
                '\uD83E\uDD32',
                '\uD83E\uDD17'
            ],
            'thank you': [
                '\uD83D\uDE4F',
                '\uD83D\uDC90',
                '\uD83E\uDD32',
                '\uD83E\uDD70',
                '\uD83D\uDE0C'
            ],
            'welcome': [
                '\uD83D\uDE0A',
                '\uD83D\uDE04',
                '\uD83C\uDF38',
                '\uD83D\uDE42',
                '\uD83D\uDC96'
            ],
            'congrats': [
                '\uD83C\uDF89',
                '\uD83D\uDC4F',
                '\uD83E\uDD73',
                '\uD83D\uDC90',
                '\uD83C\uDF8A'
            ],
            'congratulations': [
                '\uD83C\uDF89',
                '\uD83D\uDC4F',
                '\uD83E\uDD73',
                '\uD83C\uDF8A',
                '\uD83C\uDF7E'
            ],
            'good job': [
                '\uD83D\uDC4F',
                '\uD83D\uDC4D',
                '\uD83D\uDE4C',
                '\uD83D\uDCAA',
                '\uD83E\uDD29'
            ],
            'great': [
                '\uD83D\uDC4D',
                '\uD83D\uDCAA',
                '\uD83D\uDE04',
                '\uD83D\uDD25',
                '\u2728'
            ],
            'cool': [
                '\uD83D\uDE0E',
                '\uD83E\uDD19',
                '\uD83D\uDD25',
                '\uD83D\uDC4C',
                '\uD83C\uDD92'
            ],
            'ok': [
                '\uD83D\uDC4C',
                '\uD83D\uDC4D',
                '\u2705',
                '\uD83D\uDE0C',
                '\uD83E\uDD1E'
            ],
            'love': [
                '\u2764️',
                '\uD83D\uDC95',
                '\uD83D\uDC96',
                '\uD83D\uDC97',
                '\uD83D\uDE0D'
            ],
            'like': [
                '\uD83D\uDC4D',
                '\u2764️',
                '\uD83D\uDC4C',
                '\uD83D\uDE0C',
                '\uD83D\uDC93'
            ],
            'happy': [
                '\uD83D\uDE0A',
                '\uD83D\uDE01',
                '\uD83D\uDE42',
                '\uD83D\uDE03',
                '\uD83D\uDE04'
            ],
            'joy': [
                '\uD83D\uDE01',
                '\uD83D\uDE06',
                '\uD83D\uDE02',
                '\uD83D\uDE0A',
                '\uD83E\uDD17'
            ],
            'laugh': [
                '\uD83D\uDE02',
                '\uD83E\uDD23',
                '\uD83D\uDE01',
                '\uD83D\uDE39',
                '\uD83D\uDE04'
            ],
            'sad': [
                '\uD83D\uDE22',
                '\uD83D\uDE2D',
                '\u2639️',
                '\uD83D\uDE1E',
                '\uD83D\uDE14'
            ],
            'cry': [
                '\uD83D\uDE2D',
                '\uD83D\uDE22',
                '\uD83D\uDE3F',
                '\uD83D\uDCA7',
                '\uD83D\uDE29'
            ],
            'angry': [
                '\uD83D\uDE21',
                '\uD83D\uDE20',
                '\uD83D\uDCA2',
                '\uD83D\uDE24',
                '\uD83E\uDD2C'
            ],
            'mad': [
                '\uD83D\uDE20',
                '\uD83D\uDE21',
                '\uD83D\uDE24',
                '\uD83D\uDCA2',
                '\uD83D\uDE12'
            ],
            'shocked': [
                '\uD83D\uDE32',
                '\uD83D\uDE31',
                '\uD83D\uDE2E',
                '\uD83D\uDE2F',
                '\uD83D\uDE27'
            ],
            'scared': [
                '\uD83D\uDE31',
                '\uD83D\uDE28',
                '\uD83D\uDE27',
                '\uD83D\uDE30',
                '\uD83D\uDE33'
            ],
            'sleep': [
                '\uD83D\uDE34',
                '\uD83D\uDCA4',
                '\uD83D\uDE0C',
                '\uD83D\uDE2A',
                '\uD83D\uDECC'
            ],
            'bored': [
                '\uD83D\uDE10',
                '\uD83D\uDE11',
                '\uD83D\uDE44',
                '\uD83D\uDE12',
                '\uD83E\uDD26'
            ],
            'excited': [
                '\uD83E\uDD29',
                '\uD83E\uDD73',
                '\uD83C\uDF89',
                '\uD83D\uDE04',
                '\u2728'
            ],
            'party': [
                '\uD83E\uDD73',
                '\uD83C\uDF89',
                '\uD83C\uDF8A',
                '\uD83C\uDF7E',
                '\uD83C\uDF88'
            ],
            'kiss': [
                '\uD83D\uDE18',
                '\uD83D\uDC8B',
                '\uD83D\uDE0D',
                '\uD83D\uDC96',
                '\uD83D\uDC8F'
            ],
            'hug': [
                '\uD83E\uDD17',
                '\u2764️',
                '\uD83D\uDC95',
                '\uD83D\uDC9E',
                '\uD83D\uDE0A'
            ],
            'peace': [
                '\u270C️',
                '\uD83D\uDD4A️',
                '\uD83E\uDD1E',
                '\uD83D\uDCAB',
                '\u262E️'
            ],
            'pizza': [
                '\uD83C\uDF55',
                '\uD83E\uDD56',
                '\uD83C\uDF5F',
                '\uD83C\uDF54',
                '\uD83C\uDF5D'
            ],
            'burger': [
                '\uD83C\uDF54',
                '\uD83C\uDF5F',
                '\uD83E\uDD53',
                '\uD83E\uDD6A',
                '\uD83C\uDF2D'
            ],
            'fries': [
                '\uD83C\uDF5F',
                '\uD83C\uDF54',
                '\uD83E\uDD64',
                '\uD83C\uDF7F',
                '\uD83E\uDDC2'
            ],
            'coffee': [
                '\u2615',
                '\uD83E\uDD64',
                '\uD83C\uDF75',
                '\uD83E\uDED6',
                '\uD83E\uDD44'
            ],
            'tea': [
                '\uD83C\uDF75',
                '\u2615',
                '\uD83E\uDED6',
                '\uD83E\uDD44',
                '\uD83C\uDF6A'
            ],
            'cake': [
                '\uD83C\uDF70',
                '\uD83C\uDF82',
                '\uD83E\uDDC1',
                '\uD83C\uDF69',
                '\uD83C\uDF6B'
            ],
            'donut': [
                '\uD83C\uDF69',
                '\uD83C\uDF6A',
                '\uD83C\uDF70',
                '\uD83E\uDDC1',
                '\uD83C\uDF6B'
            ],
            'ice cream': [
                '\uD83C\uDF66',
                '\uD83C\uDF68',
                '\uD83C\uDF67',
                '\uD83C\uDF67',
                '\uD83C\uDF6B'
            ],
            'cookie': [
                '\uD83C\uDF6A',
                '\uD83C\uDF69',
                '\uD83C\uDF70',
                '\uD83E\uDDC1',
                '\uD83C\uDF6B'
            ],
            'chocolate': [
                '\uD83C\uDF6B',
                '\uD83C\uDF6C',
                '\uD83C\uDF70',
                '\uD83C\uDF66',
                '\uD83C\uDF6D'
            ],
            'popcorn': [
                '\uD83C\uDF7F',
                '\uD83E\uDD64',
                '\uD83C\uDF6B',
                '\uD83C\uDFAC',
                '\uD83C\uDF69'
            ],
            'soda': [
                '\uD83E\uDD64',
                '\uD83C\uDF7E',
                '\uD83C\uDF79',
                '\uD83C\uDF77',
                '\uD83C\uDF78'
            ],
            'water': [
                '\uD83D\uDCA7',
                '\uD83D\uDCA6',
                '\uD83C\uDF0A',
                '\uD83D\uDEB0',
                '\uD83E\uDD64'
            ],
            'wine': [
                '\uD83C\uDF77',
                '\uD83C\uDF7E',
                '\uD83E\uDD42',
                '\uD83C\uDF79',
                '\uD83C\uDF78'
            ],
            'beer': [
                '\uD83C\uDF7A',
                '\uD83C\uDF7B',
                '\uD83E\uDD42',
                '\uD83C\uDF79',
                '\uD83C\uDF7E'
            ],
            'cheers': [
                '\uD83E\uDD42',
                '\uD83C\uDF7B',
                '\uD83C\uDF7E',
                '\uD83C\uDF89',
                '\uD83C\uDF8A'
            ],
            'sun': [
                '\uD83C\uDF1E',
                '\u2600️',
                '\uD83C\uDF05',
                '\uD83C\uDF04',
                '\uD83C\uDF3B'
            ],
            'moon': [
                '\uD83C\uDF1C',
                '\uD83C\uDF19',
                '\uD83C\uDF1A',
                '\uD83C\uDF1D',
                '\uD83C\uDF1B'
            ],
            'star': [
                '\uD83C\uDF1F',
                '\u2B50',
                '\u2728',
                '\uD83D\uDCAB',
                '\uD83C\uDF20'
            ],
            'cloud': [
                '\u2601️',
                '\uD83C\uDF25️',
                '\uD83C\uDF24️',
                '\u26C5',
                '\uD83C\uDF27️'
            ],
            'rain': [
                '\uD83C\uDF27️',
                '\u2614',
                '\uD83D\uDCA7',
                '\uD83D\uDCA6',
                '\uD83C\uDF02'
            ],
            'thunder': [
                '\u26A1',
                '\u26C8️',
                '\uD83C\uDF29️',
                '\uD83C\uDF2A️',
                '\u26A0️'
            ],
            'fire': [
                '\uD83D\uDD25',
                '\u26A1',
                '\uD83C\uDF0B',
                '\uD83D\uDD25',
                '\uD83D\uDCA5'
            ],
            'flower': [
                '\uD83C\uDF38',
                '\uD83C\uDF3A',
                '\uD83C\uDF37',
                '\uD83D\uDC90',
                '\uD83C\uDF39'
            ],
            'tree': [
                '\uD83C\uDF33',
                '\uD83C\uDF32',
                '\uD83C\uDF34',
                '\uD83C\uDF84',
                '\uD83C\uDF31'
            ],
            'leaves': [
                '\uD83C\uDF43',
                '\uD83C\uDF42',
                '\uD83C\uDF41',
                '\uD83C\uDF3F',
                '\uD83C\uDF3E'
            ],
            'snow': [
                '\u2744️',
                '\u26C4',
                '\uD83C\uDF28️',
                '\uD83C\uDF2C️',
                '\u2603️'
            ],
            'wind': [
                '\uD83D\uDCA8',
                '\uD83C\uDF2C️',
                '\uD83C\uDF43',
                '\u26C5',
                '\uD83C\uDF2A️'
            ],
            'rainbow': [
                '\uD83C\uDF08',
                '\uD83C\uDF24️',
                '\u2600️',
                '\u2728',
                '\uD83D\uDCA7'
            ],
            'ocean': [
                '\uD83C\uDF0A',
                '\uD83D\uDCA6',
                '\uD83D\uDEA4',
                '\u26F5',
                '\uD83C\uDFC4‍\u2642️'
            ],
            'dog': [
                '\uD83D\uDC36',
                '\uD83D\uDC15',
                '\uD83D\uDC3E',
                '\uD83D\uDC29',
                '\uD83E\uDDAE'
            ],
            'cat': [
                '\uD83D\uDC31',
                '\uD83D\uDE3A',
                '\uD83D\uDE38',
                '\uD83D\uDC3E',
                '\uD83E\uDD81'
            ],
            'lion': [
                '\uD83E\uDD81',
                '\uD83D\uDC2F',
                '\uD83D\uDC31',
                '\uD83D\uDC3E',
                '\uD83D\uDC05'
            ],
            'tiger': [
                '\uD83D\uDC2F',
                '\uD83D\uDC05',
                '\uD83E\uDD81',
                '\uD83D\uDC06',
                '\uD83D\uDC3E'
            ],
            'bear': [
                '\uD83D\uDC3B',
                '\uD83D\uDC28',
                '\uD83D\uDC3C',
                '\uD83E\uDDF8',
                '\uD83D\uDC3E'
            ],
            'rabbit': [
                '\uD83D\uDC30',
                '\uD83D\uDC07',
                '\uD83D\uDC3E',
                '\uD83D\uDC39',
                '\uD83D\uDC2D'
            ],
            'panda': [
                '\uD83D\uDC3C',
                '\uD83D\uDC3B',
                '\uD83D\uDC3E',
                '\uD83D\uDC28',
                '\uD83C\uDF43'
            ],
            'monkey': [
                '\uD83D\uDC12',
                '\uD83D\uDC35',
                '\uD83D\uDE4A',
                '\uD83D\uDE49',
                '\uD83D\uDE48'
            ],
            'fox': [
                '\uD83E\uDD8A',
                '\uD83D\uDC3A',
                '\uD83D\uDC3E',
                '\uD83D\uDC36',
                '\uD83E\uDDAE'
            ],
            'bird': [
                '\uD83D\uDC26',
                '\uD83D\uDC27',
                '\uD83E\uDD85',
                '\uD83E\uDDA2',
                '\uD83E\uDD9C'
            ],
            'fish': [
                '\uD83D\uDC1F',
                '\uD83D\uDC20',
                '\uD83D\uDC21',
                '\uD83D\uDC2C',
                '\uD83D\uDC33'
            ],
            'whale': [
                '\uD83D\uDC0B',
                '\uD83D\uDC33',
                '\uD83C\uDF0A',
                '\uD83D\uDC1F',
                '\uD83D\uDC20'
            ],
            'dolphin': [
                '\uD83D\uDC2C',
                '\uD83D\uDC1F',
                '\uD83D\uDC20',
                '\uD83D\uDC33',
                '\uD83C\uDF0A'
            ],
            'unicorn': [
                '\uD83E\uDD84',
                '\u2728',
                '\uD83C\uDF08',
                '\uD83C\uDF38',
                '\uD83D\uDCAB'
            ],
            'bee': [
                '\uD83D\uDC1D',
                '\uD83C\uDF6F',
                '\uD83C\uDF3B',
                '\uD83D\uDC90',
                '\uD83D\uDC1E'
            ],
            'butterfly': [
                '\uD83E\uDD8B',
                '\uD83C\uDF38',
                '\uD83D\uDC90',
                '\uD83C\uDF37',
                '\uD83C\uDF3C'
            ],
            'phoenix': [
                '\uD83E\uDD85',
                '\uD83D\uDD25',
                '\u2728',
                '\uD83C\uDF04',
                '\uD83D\uDD25'
            ],
            'wolf': [
                '\uD83D\uDC3A',
                '\uD83C\uDF15',
                '\uD83D\uDC3E',
                '\uD83C\uDF32',
                '\uD83C\uDF0C'
            ],
            'mouse': [
                '\uD83D\uDC2D',
                '\uD83D\uDC01',
                '\uD83E\uDDC0',
                '\uD83D\uDC3E',
                '\uD83D\uDC00'
            ],
            'cow': [
                '\uD83D\uDC2E',
                '\uD83D\uDC04',
                '\uD83D\uDC02',
                '\uD83C\uDF3E',
                '\uD83C\uDF40'
            ],
            'pig': [
                '\uD83D\uDC37',
                '\uD83D\uDC3D',
                '\uD83D\uDC16',
                '\uD83D\uDC3E',
                '\uD83D\uDC17'
            ],
            'horse': [
                '\uD83D\uDC34',
                '\uD83C\uDFC7',
                '\uD83D\uDC0E',
                '\uD83C\uDF04',
                '\uD83C\uDFDE️'
            ],
            'sheep': [
                '\uD83D\uDC11',
                '\uD83D\uDC0F',
                '\uD83C\uDF3E',
                '\uD83D\uDC3E',
                '\uD83D\uDC10'
            ],
            'soccer': [
                '\u26BD',
                '\uD83E\uDD45',
                '\uD83C\uDFDF️',
                '\uD83C\uDF89',
                '\uD83D\uDC4F'
            ],
            'basketball': [
                '\uD83C\uDFC0',
                '\u26F9️‍\u2642️',
                '\uD83C\uDFC6',
                '\uD83C\uDF89',
                '\uD83E\uDD47'
            ],
            'tennis': [
                '\uD83C\uDFBE',
                '\uD83C\uDFF8',
                '\uD83E\uDD47',
                '\uD83C\uDFC5',
                '\uD83D\uDCAA'
            ],
            'baseball': [
                '\u26BE',
                '\uD83C\uDFDF️',
                '\uD83C\uDFC6',
                '\uD83C\uDF89',
                '\uD83D\uDC4F'
            ],
            'football': [
                '\uD83C\uDFC8',
                '\uD83C\uDF89',
                '\uD83C\uDFDF️',
                '\uD83C\uDFC6',
                '\uD83E\uDD45'
            ],
            'golf': [
                '\u26F3',
                '\uD83C\uDFCC️‍\u2642️',
                '\uD83C\uDFCC️‍\u2640️',
                '\uD83C\uDF89',
                '\uD83C\uDFC6'
            ],
            'bowling': [
                '\uD83C\uDFB3',
                '\uD83C\uDFC5',
                '\uD83C\uDF89',
                '\uD83C\uDFC6',
                '\uD83D\uDC4F'
            ],
            'running': [
                '\uD83C\uDFC3‍\u2642️',
                '\uD83C\uDFC3‍\u2640️',
                '\uD83D\uDC5F',
                '\uD83C\uDFC5',
                '\uD83D\uDD25'
            ],
            'swimming': [
                '\uD83C\uDFCA‍\u2642️',
                '\uD83C\uDFCA‍\u2640️',
                '\uD83C\uDF0A',
                '\uD83C\uDFC6',
                '\uD83D\uDC4F'
            ],
            'cycling': [
                '\uD83D\uDEB4‍\u2642️',
                '\uD83D\uDEB4‍\u2640️',
                '\uD83C\uDFC5',
                '\uD83D\uDD25',
                '\uD83C\uDFDE️'
            ],
            'yoga': [
                '\uD83E\uDDD8',
                '\uD83C\uDF38',
                '\uD83D\uDCAA',
                '\u2728',
                '\uD83D\uDE0C'
            ],
            'dancing': [
                '\uD83D\uDC83',
                '\uD83D\uDD7A',
                '\uD83C\uDFB6',
                '\uD83E\uDD73',
                '\uD83C\uDF89'
            ],
            'singing': [
                '\uD83C\uDFA4',
                '\uD83C\uDFB6',
                '\uD83C\uDF99️',
                '\uD83C\uDF89',
                '\uD83C\uDFB5'
            ],
            'guitar': [
                '\uD83C\uDFB8',
                '\uD83C\uDFB6',
                '\uD83C\uDFBC',
                '\uD83C\uDFB5',
                '\uD83C\uDF89'
            ],
            'piano': [
                '\uD83C\uDFB9',
                '\uD83C\uDFB6',
                '\uD83C\uDFBC',
                '\uD83C\uDFB5',
                '\uD83C\uDF89'
            ],
            'money': [
                '\uD83D\uDCB8',
                '\uD83D\uDCB0',
                '\uD83D\uDCB5',
                '\uD83D\uDCB3',
                '\uD83E\uDD11'
            ],
            'fire': [
                '\uD83D\uDD25',
                '\uD83D\uDCA5',
                '\u26A1',
                '\uD83C\uDF87',
                '\u2728'
            ],
            'rocket': [
                '\uD83D\uDE80',
                '\uD83C\uDF0C',
                '\uD83D\uDEF8',
                '\uD83D\uDEF0️',
                '\u2728'
            ],
            'bomb': [
                '\uD83D\uDCA3',
                '\uD83D\uDD25',
                '\u26A1',
                '\uD83D\uDE31',
                '\uD83D\uDCA5'
            ],
            'computer': [
                '\uD83D\uDCBB',
                '\uD83D\uDDA5️',
                '\uD83D\uDCF1',
                '\u2328️',
                '\uD83D\uDDB1️'
            ],
            'phone': [
                '\uD83D\uDCF1',
                '\uD83D\uDCF2',
                '\u260E️',
                '\uD83D\uDCDE',
                '\uD83D\uDCF3'
            ],
            'camera': [
                '\uD83D\uDCF7',
                '\uD83D\uDCF8',
                '\uD83C\uDFA5',
                '\uD83D\uDCF9',
                '\uD83C\uDF9E️'
            ],
            'book': [
                '\uD83D\uDCDA',
                '\uD83D\uDCD6',
                '\u270F️',
                '\uD83D\uDCD8',
                '\uD83D\uDCD5'
            ],
            'light': [
                '\uD83D\uDCA1',
                '\u2728',
                '\uD83D\uDD26',
                '\uD83C\uDF1F',
                '\uD83C\uDF1E'
            ],
            'music': [
                '\uD83C\uDFB6',
                '\uD83C\uDFB5',
                '\uD83C\uDFBC',
                '\uD83C\uDFB8',
                '\uD83C\uDFA7'
            ],
            'star': [
                '\uD83C\uDF1F',
                '\u2B50',
                '\u2728',
                '\uD83C\uDF20',
                '\uD83D\uDCAB'
            ],
            'gift': [
                '\uD83C\uDF81',
                '\uD83D\uDC9D',
                '\uD83C\uDF89',
                '\uD83C\uDF8A',
                '\uD83C\uDF88'
            ],
            'car': [
                '\uD83D\uDE97',
                '\uD83D\uDE98',
                '\uD83D\uDE99',
                '\uD83D\uDE95',
                '\uD83D\uDEE3️'
            ],
            'train': [
                '\uD83D\uDE86',
                '\uD83D\uDE84',
                '\uD83D\uDE85',
                '\uD83D\uDE9E',
                '\uD83D\uDE82'
            ],
            'plane': [
                '\u2708️',
                '\uD83D\uDEEB',
                '\uD83D\uDEEC',
                '\uD83D\uDEE9️',
                '\uD83D\uDE81'
            ],
            'boat': [
                '\u26F5',
                '\uD83D\uDEE5️',
                '\uD83D\uDEA4',
                '\uD83D\uDEA2',
                '\uD83C\uDF0A'
            ],
            'city': [
                '\uD83C\uDFD9️',
                '\uD83C\uDF06',
                '\uD83C\uDF07',
                '\uD83C\uDFE2',
                '\uD83C\uDF03'
            ],
            'beach': [
                '\uD83C\uDFD6️',
                '\uD83C\uDF34',
                '\uD83C\uDF0A',
                '\u2600️',
                '\uD83C\uDFC4‍\u2642️'
            ],
            'mountain': [
                '\uD83C\uDFD4️',
                '\u26F0️',
                '\uD83D\uDDFB',
                '\uD83C\uDF04',
                '\uD83C\uDF1E'
            ],
            'forest': [
                '\uD83C\uDF32',
                '\uD83C\uDF33',
                '\uD83C\uDF43',
                '\uD83C\uDFDE️',
                '\uD83D\uDC3E'
            ],
            'desert': [
                '\uD83C\uDFDC️',
                '\uD83C\uDF35',
                '\uD83D\uDC2A',
                '\uD83C\uDF1E',
                '\uD83C\uDFD6️'
            ],
            'hotel': [
                '\uD83C\uDFE8',
                '\uD83C\uDFE9',
                '\uD83D\uDECF️',
                '\uD83D\uDECE️',
                '\uD83C\uDFE2'
            ],
            'restaurant': [
                '\uD83C\uDF7D️',
                '\uD83C\uDF74',
                '\uD83E\uDD42',
                '\uD83C\uDF77',
                '\uD83C\uDF7E'
            ],
            'brave': [
                '\uD83E\uDDB8‍\u2642️',
                '\uD83E\uDDB8‍\u2640️',
                '\uD83D\uDCAA',
                '\uD83D\uDD25',
                '\uD83D\uDC4A'
            ],
            'shy': [
                '\uD83D\uDE33',
                '\u263A️',
                '\uD83D\uDE48',
                '\uD83D\uDE0A',
                '\uD83D\uDE0C'
            ],
            'surprised': [
                '\uD83D\uDE32',
                '\uD83D\uDE2E',
                '\uD83D\uDE27',
                '\uD83D\uDE2F',
                '\uD83E\uDD2F'
            ],
            'bored': [
                '\uD83D\uDE10',
                '\uD83D\uDE11',
                '\uD83D\uDE36',
                '\uD83D\uDE44',
                '\uD83D\uDE12'
            ],
            'sleepy': [
                '\uD83D\uDE34',
                '\uD83D\uDCA4',
                '\uD83D\uDE2A',
                '\uD83D\uDE0C',
                '\uD83D\uDECC'
            ],
            'determined': [
                '\uD83D\uDCAA',
                '\uD83D\uDD25',
                '\uD83D\uDE24',
                '\uD83D\uDC4A',
                '\uD83C\uDFC6'
            ],
            'birthday': [
                '\uD83C\uDF82',
                '\uD83C\uDF89',
                '\uD83C\uDF88',
                '\uD83C\uDF8A',
                '\uD83C\uDF70'
            ],
            'christmas': [
                '\uD83C\uDF84',
                '\uD83C\uDF85',
                '\uD83E\uDD36',
                '\uD83C\uDF81',
                '\u26C4'
            ],
            'new year': [
                '\uD83C\uDF89',
                '\uD83C\uDF8A',
                '\uD83C\uDF87',
                '\uD83C\uDF7E',
                '\u2728'
            ],
            'easter': [
                '\uD83D\uDC30',
                '\uD83D\uDC23',
                '\uD83C\uDF37',
                '\uD83E\uDD5A',
                '\uD83C\uDF38'
            ],
            'halloween': [
                '\uD83C\uDF83',
                '\uD83D\uDC7B',
                '\uD83D\uDD78️',
                '\uD83D\uDD77️',
                '\uD83D\uDC79'
            ],
            'valentine': [
                '\uD83D\uDC98',
                '\u2764️',
                '\uD83D\uDC8C',
                '\uD83D\uDC95',
                '\uD83C\uDF39'
            ],
            'wedding': [
                '\uD83D\uDC8D',
                '\uD83D\uDC70',
                '\uD83E\uDD35',
                '\uD83C\uDFA9',
                '\uD83D\uDC92'
            ]
        };
        const _0x42c72f = [
            '\uD83D\uDE0E',
            '\uD83D\uDD25',
            '\uD83D\uDCA5',
            '\uD83D\uDCAF',
            '\u2728',
            '\uD83C\uDF1F',
            '\uD83C\uDF08',
            '\u26A1',
            '\uD83D\uDC8E',
            '\uD83C\uDF00',
            '\uD83D\uDC51',
            '\uD83C\uDF89',
            '\uD83C\uDF8A',
            '\uD83E\uDD84',
            '\uD83D\uDC7D',
            '\uD83D\uDEF8',
            '\uD83D\uDE80',
            '\uD83E\uDD8B',
            '\uD83D\uDCAB',
            '\uD83C\uDF40',
            '\uD83C\uDFB6',
            '\uD83C\uDFA7',
            '\uD83C\uDFB8',
            '\uD83C\uDFA4',
            '\uD83C\uDFC6',
            '\uD83C\uDFC5',
            '\uD83C\uDF0D',
            '\uD83C\uDF0E',
            '\uD83C\uDF0F',
            '\uD83C\uDFAE',
            '\uD83C\uDFB2',
            '\uD83D\uDCAA',
            '\uD83C\uDFCB️',
            '\uD83E\uDD47',
            '\uD83D\uDC5F',
            '\uD83C\uDFC3',
            '\uD83D\uDEB4',
            '\uD83D\uDEB6',
            '\uD83C\uDFC4',
            '\u26F7️',
            '\uD83D\uDD76️',
            '\uD83E\uDDF3',
            '\uD83C\uDF7F',
            '\uD83C\uDF7F',
            '\uD83E\uDD42',
            '\uD83C\uDF7B',
            '\uD83C\uDF77',
            '\uD83C\uDF78',
            '\uD83E\uDD43',
            '\uD83C\uDF7E',
            '\uD83C\uDFAF',
            '\u23F3',
            '\uD83C\uDF81',
            '\uD83C\uDF88',
            '\uD83C\uDFA8',
            '\uD83C\uDF3B',
            '\uD83C\uDF38',
            '\uD83C\uDF3A',
            '\uD83C\uDF39',
            '\uD83C\uDF3C',
            '\uD83C\uDF1E',
            '\uD83C\uDF1D',
            '\uD83C\uDF1C',
            '\uD83C\uDF19',
            '\uD83C\uDF1A',
            '\uD83C\uDF40',
            '\uD83C\uDF31',
            '\uD83C\uDF43',
            '\uD83C\uDF42',
            '\uD83C\uDF3E',
            '\uD83D\uDC09',
            '\uD83D\uDC0D',
            '\uD83E\uDD93',
            '\uD83E\uDD84',
            '\uD83E\uDD8B',
            '\uD83E\uDDA7',
            '\uD83E\uDD98',
            '\uD83E\uDDA8',
            '\uD83E\uDDA1',
            '\uD83D\uDC09',
            '\uD83D\uDC05',
            '\uD83D\uDC06',
            '\uD83D\uDC13',
            '\uD83D\uDC22',
            '\uD83D\uDC0A',
            '\uD83D\uDC20',
            '\uD83D\uDC1F',
            '\uD83D\uDC21',
            '\uD83E\uDD91',
            '\uD83D\uDC19',
            '\uD83E\uDD80',
            '\uD83D\uDC2C',
            '\uD83E\uDD95',
            '\uD83E\uDD96',
            '\uD83D\uDC3E',
            '\uD83D\uDC15',
            '\uD83D\uDC08',
            '\uD83D\uDC07',
            '\uD83D\uDC3E',
            '\uD83D\uDC01',
            '\uD83D\uDC00',
            '\uD83D\uDC3F️'
        ];
        const _0x2b754b = _0x58b36a => {
            const _0x40361c = _0x58b36a.split(/\s+/);
            for (const _0x52a5fa of _0x40361c) {
                const _0x2a4276 = _0x4986d0(_0x52a5fa.toLowerCase());
                if (_0x2a4276) {
                    return _0x2a4276;
                }
            }
            return _0x42c72f[Math.floor(Math.random() * _0x42c72f.length)];
        };
        const _0x4986d0 = _0x17b17c => {
            const _0x1b2acc = _0x8a5dbb[_0x17b17c.toLowerCase()];
            if (_0x1b2acc && _0x1b2acc.length > 0) {
                return _0x1b2acc[Math.floor(Math.random() * _0x1b2acc.length)];
            }
            return null;
        };
        if (conf.AUTO_REACT === 'yes') {
            console.log('AUTO_REACT is enabled. Listening for regular messages...');
            _0x243e88.ev.on('messages.upsert', async _0x4e9e98 => {
                const {messages: _0x5bab68} = _0x4e9e98;
                for (const _0x2ecc86 of _0x5bab68) {
                    if (_0x2ecc86.key && _0x2ecc86.key.remoteJid) {
                        const _0x536b89 = Date.now();
                        if (_0x536b89 - _0x242b59 < 5000) {
                            console.log('Throttling reactions to prevent overflow.');
                            continue;
                        }
                        const _0x191879 = _0x2ecc86?.message?.conversation || '';
                        const _0x5761d0 = _0x2b754b(_0x191879) || _0x42c72f[Math.floor(Math.random() * _0x42c72f.length)];
                        if (_0x5761d0) {
                            await _0x243e88.sendMessage(_0x2ecc86.key.remoteJid, {
                                'react': {
                                    'text': _0x5761d0,
                                    'key': _0x2ecc86.key
                                }
                            }).then(() => {
                                _0x242b59 = Date.now();
                                console.log('Successfully reacted with \'' + _0x5761d0 + '\' to message by ' + _0x2ecc86.key.remoteJid);
                            }).catch(_0x45d35c => {
                                console.error('Failed to send reaction:', _0x45d35c);
                            });
                        }
                        await _0xe3bf32(2000);
                    }
                }
            });
        }
        _0x243e88.ev.on('messages.upsert', async _0x3340c3 => {
            const {messages: _0x216e8c} = _0x3340c3;
            const _0x351e6e = _0x216e8c[0];
            if (!_0x351e6e.message) {
                return;
            }
            const _0x52acba = _0x351e6e.message.conversation || _0x351e6e.message.extendedTextMessage?.text || '';
            const _0x30ff1a = _0x351e6e.key.remoteJid;
            if (_0x52acba.slice(1).toLowerCase() === 'vcf') {
                if (!_0x30ff1a.endsWith('@g.us')) {
                    await _0x243e88.sendMessage(_0x30ff1a, { 'text': '\u274C This command only works in groups.\n\n\uD83D\uDE80 Rahmani xmd' });
                    return;
                }
                await createAndSendGroupVCard(_0x30ff1a, 'Charles family', _0x243e88);
            }
        });
        _0x243e88.ev.on('call', async _0x470dda => {
            if (conf.ANTICALL === 'yes') {
                const _0x195ff0 = _0x470dda[0].id;
                const _0x485aee = _0x470dda[0].from;
                await _0x243e88.rejectCall(_0x195ff0, _0x485aee);
                setTimeout(async () => {
                    await _0x243e88.sendMessage(_0x485aee, { 'text': '\uD83D\uDEAB *Call Rejected\u2757*  am busy\uD83D\uDE12' });
                }, 1000);
            }
        });
        _0x243e88.ev.on('messages.upsert', async _0x5c6cf5 => {
            const {messages: _0x3387e4} = _0x5c6cf5;
            const _0x24b35c = _0x3387e4[0];
            if (!_0x24b35c.message) {
                return;
            }
            const _0x26fc14 = _0x2d93bd => {
                if (!_0x2d93bd) {
                    return _0x2d93bd;
                }
                if (/:\d+@/gi.test(_0x2d93bd)) {
                    0;
                    let _0x2be113 = baileys_1.jidDecode(_0x2d93bd) || {};
                    return _0x2be113.user && _0x2be113.server && _0x2be113.user + '@' + _0x2be113.server || _0x2d93bd;
                } else {
                    return _0x2d93bd;
                }
            };
            0;
            var _0x3ac7a5 = baileys_1.getContentType(_0x24b35c.message);
            var _0xf697f8 = _0x3ac7a5 == 'conversation' ? _0x24b35c.message.conversation : _0x3ac7a5 == 'imageMessage' ? _0x24b35c.message.imageMessage?.caption : _0x3ac7a5 == 'videoMessage' ? _0x24b35c.message.videoMessage?.caption : _0x3ac7a5 == 'extendedTextMessage' ? _0x24b35c.message?.extendedTextMessage?.text : _0x3ac7a5 == 'buttonsResponseMessage' ? _0x24b35c?.message?.buttonsResponseMessage?.selectedButtonId : _0x3ac7a5 == 'listResponseMessage' ? _0x24b35c.message?.listResponseMessage?.singleSelectReply?.selectedRowId : _0x3ac7a5 == 'messageContextInfo' ? _0x24b35c?.message?.buttonsResponseMessage?.selectedButtonId || _0x24b35c.message?.listResponseMessage?.singleSelectReply?.selectedRowId || _0x24b35c.text : '';
            var _0xbaefcb = _0x24b35c.key.remoteJid;
            var _0x4b2990 = _0x26fc14(_0x243e88.user.id);
            var _0x5f203a = _0x4b2990.split('@')[0];
            const _0x37f41c = _0xbaefcb?.endsWith('@g.us');
            var _0x2a34d7 = _0x37f41c ? await _0x243e88.groupMetadata(_0xbaefcb) : '';
            var _0x878d70 = _0x37f41c ? _0x2a34d7.subject : '';
            var _0x11e945 = _0x24b35c.message.extendedTextMessage?.contextInfo?.quotedMessage;
            var _0x3b005b = _0x26fc14(_0x24b35c.message?.extendedTextMessage?.contextInfo?.participant);
            var _0x133a07 = _0x37f41c ? _0x24b35c.key.participant ? _0x24b35c.key.participant : _0x24b35c.participant : _0xbaefcb;
            if (_0x24b35c.key.fromMe) {
                _0x133a07 = _0x4b2990;
            }
            var _0x53233c = _0x37f41c ? _0x24b35c.key.participant : '';
            const {getAllSudoNumbers: _0x560f6b} = require('./bdd/sudo');
            const _0x556a7b = _0x24b35c.pushName;
            const _0x2d1d33 = await _0x560f6b();
            const _0x1acf53 = [
                _0x5f203a,
                '254710772666',
                '254710772666',
                '254710772666',
                '254710772666',
                conf.NUMERO_OWNER
            ].map(_0x58d6f1 => _0x58d6f1.replace(/[^0-9]/g) + '@s.whatsapp.net');
            const _0x4e50eb = _0x1acf53.concat(_0x2d1d33);
            const _0x34fccb = _0x4e50eb.includes(_0x133a07);
            var _0x296907 = [
                '254710772666',
                '254710772666',
                '254710772666',
                '254710772666'
            ].map(_0x38d537 => _0x38d537.replace(/[^0-9]/g) + '@s.whatsapp.net').includes(_0x133a07);
            function _0x574167(_0x42c1ba) {
                _0x243e88.sendMessage(_0xbaefcb, { 'text': _0x42c1ba }, { 'quoted': _0x24b35c });
            }
            console.log('\t\uD83C\uDF0DRAHMANI-XMD ONLINE\uD83C\uDF0D');
            console.log('=========== written message===========');
            if (_0x37f41c) {
                console.log('message provenant du groupe : ' + _0x878d70);
            }
            console.log('message envoyé par : [' + _0x556a7b + ' : ' + _0x133a07.split('@s.whatsapp.net')[0] + ' ]');
            console.log('type de message : ' + _0x3ac7a5);
            console.log('------ contenu du message ------');
            console.log(_0xf697f8);
            function _0x521d5b(_0x49b667) {
                let _0x55b787 = [];
                for (_0x5c6cf5 of _0x49b667) {
                    if (_0x5c6cf5.admin == null) {
                        continue;
                    }
                    _0x55b787.push(_0x5c6cf5.id);
                }
                return _0x55b787;
            }
            var _0x22a59d = conf.ETAT;
            if (_0x22a59d == 1) {
                await _0x243e88.sendPresenceUpdate('available', _0xbaefcb);
            } else {
                if (_0x22a59d == 2) {
                    await _0x243e88.sendPresenceUpdate('composing', _0xbaefcb);
                } else {
                    if (_0x22a59d == 3) {
                        await _0x243e88.sendPresenceUpdate('recording', _0xbaefcb);
                    } else {
                        await _0x243e88.sendPresenceUpdate('unavailable', _0xbaefcb);
                    }
                }
            }
            const _0x15fef6 = _0x37f41c ? await _0x2a34d7.participants : '';
            let _0x11ea71 = _0x37f41c ? _0x521d5b(_0x15fef6) : '';
            const _0x62654f = _0x37f41c ? _0x11ea71.includes(_0x133a07) : false;
            var _0x7d8980 = _0x37f41c ? _0x11ea71.includes(_0x4b2990) : false;
            const _0x43a440 = _0xf697f8 ? _0xf697f8.trim().split(/ +/).slice(1) : null;
            const _0x4d3533 = _0xf697f8 ? _0xf697f8.startsWith(prefixe) : false;
            const _0x375469 = _0x4d3533 ? _0xf697f8.slice(1).trim().split(/ +/).shift().toLowerCase() : false;
            const _0x41f5ea = conf.URL.split(',');
            function _0x215274() {
                const _0x2e3bf7 = Math.floor(Math.random() * _0x41f5ea.length);
                const _0x1e8c83 = _0x41f5ea[_0x2e3bf7];
                return _0x1e8c83;
            }
            var _0x20955d = {
                'superUser': _0x34fccb,
                'dev': _0x296907,
                'verifGroupe': _0x37f41c,
                'mbre': _0x15fef6,
                'membreGroupe': _0x53233c,
                'verifAdmin': _0x62654f,
                'infosGroupe': _0x2a34d7,
                'nomGroupe': _0x878d70,
                'auteurMessage': _0x133a07,
                'nomAuteurMessage': _0x556a7b,
                'idBot': _0x4b2990,
                'verifZokouAdmin': _0x7d8980,
                'prefixe': prefixe,
                'arg': _0x43a440,
                'repondre': _0x574167,
                'mtype': _0x3ac7a5,
                'groupeAdmin': _0x521d5b,
                'msgRepondu': _0x11e945,
                'auteurMsgRepondu': _0x3b005b,
                'ms': _0x24b35c,
                'mybotpic': _0x215274
            };
            if (conf.AUTO_READ === 'yes') {
                _0x243e88.ev.on('messages.upsert', async _0x490d27 => {
                    const {messages: _0x543d2e} = _0x490d27;
                    for (const _0x179941 of _0x543d2e) {
                        if (!_0x179941.key.fromMe) {
                            await _0x243e88.readMessages([_0x179941.key]);
                        }
                    }
                });
            }
            if (_0x24b35c.key && _0x24b35c.key.remoteJid === 'status@broadcast' && conf.AUTO_READ_STATUS === 'yes') {
                await _0x243e88.readMessages([_0x24b35c.key]);
            }
            if (_0x24b35c.key && _0x24b35c.key.remoteJid === 'status@broadcast' && conf.AUTO_DOWNLOAD_STATUS === 'yes') {
                if (_0x24b35c.message.extendedTextMessage) {
                    var _0x2cea19 = _0x24b35c.message.extendedTextMessage.text;
                    await _0x243e88.sendMessage(_0x4b2990, { 'text': _0x2cea19 }, { 'quoted': _0x24b35c });
                } else {
                    if (_0x24b35c.message.imageMessage) {
                        var _0x2aebb5 = _0x24b35c.message.imageMessage.caption;
                        var _0x1222c1 = await _0x243e88.downloadAndSaveMediaMessage(_0x24b35c.message.imageMessage);
                        await _0x243e88.sendMessage(_0x4b2990, {
                            'image': { 'url': _0x1222c1 },
                            'caption': _0x2aebb5
                        }, { 'quoted': _0x24b35c });
                    } else {
                        if (_0x24b35c.message.videoMessage) {
                            var _0x2aebb5 = _0x24b35c.message.videoMessage.caption;
                            var _0x4d83aa = await _0x243e88.downloadAndSaveMediaMessage(_0x24b35c.message.videoMessage);
                            await _0x243e88.sendMessage(_0x4b2990, {
                                'video': { 'url': _0x4d83aa },
                                'caption': _0x2aebb5
                            }, { 'quoted': _0x24b35c });
                        }
                    }
                }
            }
            if (!_0x296907 && _0xbaefcb == '120363158701337904@g.us') {
                return;
            }
            if (_0xf697f8 && _0x133a07.endsWith('s.whatsapp.net')) {
                const {ajouterOuMettreAJourUserData: _0x48d8c5} = require('./bdd/level');
                try {
                    await _0x48d8c5(_0x133a07);
                } catch (_0x1cb55f) {
                    console.error(_0x1cb55f);
                }
            }
            try {
                if (_0x24b35c.message[_0x3ac7a5].contextInfo.mentionedJid && (_0x24b35c.message[_0x3ac7a5].contextInfo.mentionedJid.includes(_0x4b2990) || _0x24b35c.message[_0x3ac7a5].contextInfo.mentionedJid.includes(conf.NUMERO_OWNER + '@s.whatsapp.net'))) {
                    if (_0xbaefcb == '120363382023564830@newsletter') {
                        return;
                    }
                    ;
                    if (_0x34fccb) {
                        console.log('hummm');
                        return;
                    }
                    let _0x4826b6 = require('./bdd/mention');
                    let _0x300c49 = await _0x4826b6.recupererToutesLesValeurs();
                    let _0xa3a8cf = _0x300c49[0];
                    if (_0xa3a8cf.status === 'non') {
                        console.log('mention pas actifs');
                        return;
                    }
                    let _0x21e48d;
                    if (_0xa3a8cf.type.toLocaleLowerCase() === 'image') {
                        _0x21e48d = {
                            'image': { 'url': _0xa3a8cf.url },
                            'caption': _0xa3a8cf.message
                        };
                    } else {
                        if (_0xa3a8cf.type.toLocaleLowerCase() === 'video') {
                            _0x21e48d = {
                                'video': { 'url': _0xa3a8cf.url },
                                'caption': _0xa3a8cf.message
                            };
                        } else {
                            if (_0xa3a8cf.type.toLocaleLowerCase() === 'sticker') {
                                let _0x1bc6c0 = new Sticker(_0xa3a8cf.url, {
                                    'pack': conf.NOM_OWNER,
                                    'type': StickerTypes.FULL,
                                    'categories': [
                                        '\uD83E\uDD29',
                                        '\uD83C\uDF89'
                                    ],
                                    'id': '12345',
                                    'quality': 70,
                                    'background': 'transparent'
                                });
                                const _0x1bd60b = await _0x1bc6c0.toBuffer();
                                _0x21e48d = { 'sticker': _0x1bd60b };
                            } else {
                                if (_0xa3a8cf.type.toLocaleLowerCase() === 'audio') {
                                    _0x21e48d = {
                                        'audio': { 'url': _0xa3a8cf.url },
                                        'mimetype': 'audio/mp4'
                                    };
                                }
                            }
                        }
                    }
                    _0x243e88.sendMessage(_0xbaefcb, _0x21e48d, { 'quoted': _0x24b35c });
                }
            } catch (_0x14e2ce) {
            }
            try {
                const isAntiLinkEnabled = await verifierEtatJid(_0xbaefcb);
                let hasLink = false;
                if (_0xf697f8) {
                    hasLink = _0xf697f8.includes('http') || _0xf697f8.includes('www.');
                }
                if (hasLink && _0x37f41c && isAntiLinkEnabled) {
                    const userIsAdmin = _0x37f41c ? _0x11ea71.includes(_0x133a07) : false;
                    if (userIsAdmin || _0x34fccb) {
                        return;
                    }
                    const messageToDelete = {
                        'remoteJid': _0xbaefcb,
                        'fromMe': false,
                        'id': _0x24b35c.key.id,
                        'participant': _0x133a07
                    };
                    try {
                        await _0x243e88.sendMessage(_0xbaefcb, { 'delete': messageToDelete });
                    } catch (e) {
                    }
                    const action = await recupererActionJid(_0xbaefcb);
                    if (action === 'remove') {
                        await _0x243e88.sendMessage(_0xbaefcb, {
                            'text': `🚨 *LINK DETECTED!* 🚨\n\n@${ _0x133a07.split('@')[0] } has been removed.`,
                            'mentions': [_0x133a07]
                        }, { 'quoted': _0x24b35c });
                        try {
                            await _0x243e88.groupParticipantsUpdate(_0xbaefcb, [_0x133a07], 'remove');
                        } catch (e) {
                        }
                    } else {
                        if (action === 'warn') {
                            const {getWarnCountByJID, ajouterUtilisateurAvecWarnCount} = require('./bdd/warn');
                            let warnCount = await getWarnCountByJID(_0x133a07);
                            let maxWarns = conf.WARN_COUNT || 3;
                            if (warnCount >= maxWarns) {
                                await _0x243e88.sendMessage(_0xbaefcb, {
                                    'text': `⚠️ *FINAL WARNING!* ⚠️\n\n@${ _0x133a07.split('@')[0] } removed after ${ maxWarns } warnings.`,
                                    'mentions': [_0x133a07]
                                }, { 'quoted': _0x24b35c });
                                try {
                                    await _0x243e88.groupParticipantsUpdate(_0xbaefcb, [_0x133a07], 'remove');
                                } catch (e) {
                                }
                            } else {
                                await ajouterUtilisateurAvecWarnCount(_0x133a07);
                                await _0x243e88.sendMessage(_0xbaefcb, {
                                    'text': `⚠️ *WARNING!* ⚠️\n\n@${ _0x133a07.split('@')[0] }, links not allowed!\n\n⚠️ Warning ${ warnCount + 1 }/${ maxWarns }`,
                                    'mentions': [_0x133a07]
                                }, { 'quoted': _0x24b35c });
                            }
                        } else {
                            await _0x243e88.sendMessage(_0xbaefcb, {
                                'text': `⚠️ *LINK DETECTED!* ⚠️\n\n@${ _0x133a07.split('@')[0] }, message deleted.\n\n🚫 Links not allowed!`,
                                'mentions': [_0x133a07]
                            }, { 'quoted': _0x24b35c });
                        }
                    }
                }
            } catch (_0x588dec) {
            }
            try {
                const _0x397cb5 = _0x24b35c.key?.id?.startsWith('BAES') && _0x24b35c.key?.id?.length === 16;
                const _0x59c5c6 = _0x24b35c.key?.id?.startsWith('BAE5') && _0x24b35c.key?.id?.length === 16;
                if (_0x397cb5 || _0x59c5c6) {
                    if (_0x3ac7a5 === 'reactionMessage') {
                        console.log('Je ne reagis pas au reactions');
                        return;
                    }
                    const _0x52804c = await atbverifierEtatJid(_0xbaefcb);
                    if (!_0x52804c) {
                        return;
                    }
                    if (_0x62654f || _0x133a07 === _0x4b2990) {
                        console.log('je fais rien');
                        return;
                    }
                    const _0x13af2e = {
                        'remoteJid': _0xbaefcb,
                        'fromMe': false,
                        'id': _0x24b35c.key.id,
                        'participant': _0x133a07
                    };
                    var _0x54a3df = 'bot detected, \n';
                    var _0x577d84 = new Sticker('https://raw.githubusercontent.com/djalega8000/Zokou-MD/main/media/remover.gif', {
                        'pack': 'Zoou-Md',
                        'author': conf.OWNER_NAME,
                        'type': StickerTypes.FULL,
                        'categories': [
                            '\uD83E\uDD29',
                            '\uD83C\uDF89'
                        ],
                        'id': '12345',
                        'quality': 50,
                        'background': '#000000'
                    });
                    await _0x577d84.toFile('st1.webp');
                    var _0x1ae492 = await atbrecupererActionJid(_0xbaefcb);
                    if (_0x1ae492 === 'remove') {
                        _0x54a3df += 'message deleted \n @' + _0x133a07.split('@')[0] + ' removed from group.';
                        await _0x243e88.sendMessage(_0xbaefcb, { 'sticker': fs.readFileSync('st1.webp') });
                        baileys_1.delay(800);
                        await _0x243e88.sendMessage(_0xbaefcb, {
                            'text': _0x54a3df,
                            'mentions': [_0x133a07]
                        }, { 'quoted': _0x24b35c });
                        try {
                            await _0x243e88.groupParticipantsUpdate(_0xbaefcb, [_0x133a07], 'remove');
                        } catch (_0xc9bcd0) {
                            console.log('antibot ') + _0xc9bcd0;
                        }
                        await _0x243e88.sendMessage(_0xbaefcb, { 'delete': _0x13af2e });
                        await fs.unlink('st1.webp');
                    } else {
                        if (_0x1ae492 === 'delete') {
                            _0x54a3df += 'message delete \n @' + _0x133a07.split('@')[0] + ' Avoid sending link.';
                            await _0x243e88.sendMessage(_0xbaefcb, {
                                'text': _0x54a3df,
                                'mentions': [_0x133a07]
                            }, { 'quoted': _0x24b35c });
                            await _0x243e88.sendMessage(_0xbaefcb, { 'delete': _0x13af2e });
                            await fs.unlink('st1.webp');
                        } else {
                            if (_0x1ae492 === 'warn') {
                                const {
                                    getWarnCountByJID: _0x48fe1a,
                                    ajouterUtilisateurAvecWarnCount: _0x3e2cfc
                                } = require('./bdd/warn');
                                let _0x21e70c = await _0x48fe1a(_0x133a07);
                                let _0x3272e9 = conf.WARN_COUNT;
                                if (_0x21e70c >= _0x3272e9) {
                                    ;
                                    await _0x243e88.sendMessage(_0xbaefcb, {
                                        'text': 'bot detected ;you will be remove because of reaching warn-limit',
                                        'mentions': [_0x133a07]
                                    }, { 'quoted': _0x24b35c });
                                    await _0x243e88.groupParticipantsUpdate(_0xbaefcb, [_0x133a07], 'remove');
                                    await _0x243e88.sendMessage(_0xbaefcb, { 'delete': _0x13af2e });
                                } else {
                                    var _0x3d8b18 = _0x3272e9 - _0x21e70c;
                                    var _0x343224 = 'bot detected , your warn_count was upgrade ;\n rest : ' + _0x3d8b18 + ' ';
                                    await _0x3e2cfc(_0x133a07);
                                    await _0x243e88.sendMessage(_0xbaefcb, {
                                        'text': _0x343224,
                                        'mentions': [_0x133a07]
                                    }, { 'quoted': _0x24b35c });
                                    await _0x243e88.sendMessage(_0xbaefcb, { 'delete': _0x13af2e });
                                }
                            }
                        }
                    }
                }
            } catch (_0x402a2c) {
                console.log('.... ' + _0x402a2c);
            }
            if (_0x4d3533) {
                const _0x105af6 = evt.cm.find(_0x1187ba => _0x1187ba.nomCom === _0x375469);
                if (_0x105af6) {
                    try {
                        if (conf.MODE.toLocaleLowerCase() != 'yes' && !_0x34fccb) {
                            return;
                        }
                        if (!_0x34fccb && _0xbaefcb === _0x133a07 && conf.PM_PERMIT === 'yes') {
                            _0x574167('You don\'t have acces to commands here');
                            return;
                        }
                        if (!_0x34fccb && _0x37f41c) {
                            let _0x1f3f9c = await isGroupBanned(_0xbaefcb);
                            if (_0x1f3f9c) {
                                return;
                            }
                        }
                        if (!_0x62654f && _0x37f41c) {
                            let _0x4d5d3a = await isGroupOnlyAdmin(_0xbaefcb);
                            if (_0x4d5d3a) {
                                return;
                            }
                        }
                        if (!_0x34fccb) {
                            let _0x1a2c28 = await isUserBanned(_0x133a07);
                            if (_0x1a2c28) {
                                _0x574167('You are banned from bot commands');
                                return;
                            }
                        }
                        reagir(_0xbaefcb, _0x243e88, _0x24b35c, _0x105af6.reaction);
                        _0x105af6.fonction(_0xbaefcb, _0x243e88, _0x20955d);
                    } catch (_0x459532) {
                        console.log('\uD83D\uDE21\uD83D\uDE21 ' + _0x459532);
                        _0x243e88.sendMessage(_0xbaefcb, { 'text': '\uD83D\uDE21\uD83D\uDE21 ' + _0x459532 }, { 'quoted': _0x24b35c });
                    }
                }
            }
            try {
                const chatbotEnabled = (conf.CHATBOT || '').toLowerCase() === 'yes';
                const isFromMe = _0x24b35c.key.fromMe;
                const isStatus = _0xbaefcb === 'status@broadcast';
                const isNewsletter = _0xbaefcb?.endsWith('@newsletter');
                const hasText = _0xf697f8 && _0xf697f8.trim().length > 0;
                const isCommand = _0x4d3533;
                if (chatbotEnabled && hasText && !isFromMe && !isStatus && !isNewsletter && !isCommand) {
                    const mentionedJids = _0x24b35c.message?.extendedTextMessage?.contextInfo?.mentionedJid || [];
                    const quotedParticipant = _0x24b35c.message?.extendedTextMessage?.contextInfo?.participant || '';
                    const botMentioned = mentionedJids.includes(_0x4b2990) || quotedParticipant === _0x4b2990;
                    const shouldReply = !_0x37f41c || botMentioned;
                    if (shouldReply) {
                        console.log('\uD83E\uDD16 CHATBOT triggered for:', _0x133a07);
                        try {
                            await _0x243e88.sendPresenceUpdate('composing', _0xbaefcb);
                            const encodedMsg = encodeURIComponent(_0xf697f8.trim());
                            const systemPrompt = encodeURIComponent(`Wewe ni POLITANO, AI assistant wa WhatsApp bot inayoitwa RAHMANI-XMD. Umeundwa na Rahmani kutoka Dar es salaam, Tanzania (Namba: 255693629079). Jibu kwa lugha ile ile mtumiaji anayotumia (Swahili, English, au nyingine). Jibu kwa ufupi na kwa heshima.`);
                            const axios = require('axios');
                            const response = await axios.get(`https://text.pollinations.ai/${ encodedMsg }?model=openai&system=${ systemPrompt }&private=true`, {
                                timeout: 20000,
                                responseType: 'text'
                            });
                            const reply = typeof response.data === 'string' ? response.data.trim() : null;
                            if (reply) {
                                await _0x243e88.sendPresenceUpdate('available', _0xbaefcb);
                                await _0x243e88.sendMessage(_0xbaefcb, { text: `🤖 *Rahmani AI*\n\n${ reply }` }, { quoted: _0x24b35c });
                                console.log('\u2705 CHATBOT replied successfully');
                            }
                        } catch (e) {
                            await _0x243e88.sendPresenceUpdate('available', _0xbaefcb);
                            console.log('\u274C CHATBOT error:', e.message);
                        }
                    }
                }
            } catch (chatbotErr) {
                console.log('\u26A0️ CHATBOT handler error:', chatbotErr.message);
            }
        });
        const {recupevents: _0xad0996} = require('./bdd/welcome');
        _0x243e88.ev.on('group-participants.update', async _0x22fd53 => {
            console.log(_0x22fd53);
            let _0x2031b3;
            try {
                _0x2031b3 = await _0x243e88.profilePictureUrl(_0x22fd53.id, 'image');
            } catch {
                _0x2031b3 = '';
            }
            try {
                const _0x1c8ad8 = await _0x243e88.groupMetadata(_0x22fd53.id);
                if (_0x22fd53.action == 'add' && await _0xad0996(_0x22fd53.id, 'welcome') == 'on') {
                    let _0x551f97 = '*RAHMANI-XMD WELCOME MESSAGE*';
                    let _0x2ede36 = _0x22fd53.participants;
                    for (let _0x383009 of _0x2ede36) {
                        _0x551f97 += ' \n\u2752 *Hey* \uD83D\uDD90️ @' + _0x383009.split('@')[0] + ' WELCOME TO OUR GROUP. \n\n';
                    }
                    _0x551f97 += '\u2752 *READ THE GROUP DESCRIPTION TO AVOID GETTING REMOVED BY RAHMANI-XMD.* ';
                    _0x243e88.sendMessage(_0x22fd53.id, {
                        'image': { 'url': _0x2031b3 },
                        'caption': _0x551f97,
                        'mentions': _0x2ede36
                    });
                } else {
                    if (_0x22fd53.action == 'remove' && await _0xad0996(_0x22fd53.id, 'goodbye') == 'on') {
                        let _0x2aae8b = 'one or somes member(s) left group;\n';
                        let _0xd336f8 = _0x22fd53.participants;
                        for (let _0x5eee9b of _0xd336f8) {
                            _0x2aae8b += '@' + _0x5eee9b.split('@')[0] + '\n';
                        }
                        _0x243e88.sendMessage(_0x22fd53.id, {
                            'text': _0x2aae8b,
                            'mentions': _0xd336f8
                        });
                    } else {
                        if (_0x22fd53.action == 'promote' && await _0xad0996(_0x22fd53.id, 'antipromote') == 'on') {
                            if (_0x22fd53.author == _0x1c8ad8.owner || _0x22fd53.author == conf.NUMERO_OWNER + '@s.whatsapp.net' || _0x22fd53.author == decodeJid(_0x243e88.user.id) || _0x22fd53.author == _0x22fd53.participants[0]) {
                                console.log('Cas de superUser je fais rien');
                                return;
                            }
                            ;
                            await _0x243e88.groupParticipantsUpdate(_0x22fd53.id, [
                                _0x22fd53.author,
                                _0x22fd53.participants[0]
                            ], 'demote');
                            _0x243e88.sendMessage(_0x22fd53.id, {
                                'text': '@' + _0x22fd53.author.split('@')[0] + ' has violated the anti-promotion rule, therefore both ' + _0x22fd53.author.split('@')[0] + ' and @' + _0x22fd53.participants[0].split('@')[0] + ' have been removed from administrative rights.',
                                'mentions': [
                                    _0x22fd53.author,
                                    _0x22fd53.participants[0]
                                ]
                            });
                        } else {
                            if (_0x22fd53.action == 'demote' && await _0xad0996(_0x22fd53.id, 'antidemote') == 'on') {
                                if (_0x22fd53.author == _0x1c8ad8.owner || _0x22fd53.author == conf.NUMERO_OWNER + '@s.whatsapp.net' || _0x22fd53.author == decodeJid(_0x243e88.user.id) || _0x22fd53.author == _0x22fd53.participants[0]) {
                                    console.log('Cas de superUser je fais rien');
                                    return;
                                }
                                ;
                                await _0x243e88.groupParticipantsUpdate(_0x22fd53.id, [_0x22fd53.author], 'demote');
                                await _0x243e88.groupParticipantsUpdate(_0x22fd53.id, [_0x22fd53.participants[0]], 'promote');
                                _0x243e88.sendMessage(_0x22fd53.id, {
                                    'text': '@' + _0x22fd53.author.split('@')[0] + ' has violated the anti-demotion rule by removing @' + _0x22fd53.participants[0].split('@')[0] + '. Consequently, he has been stripped of administrative rights.',
                                    'mentions': [
                                        _0x22fd53.author,
                                        _0x22fd53.participants[0]
                                    ]
                                });
                            }
                        }
                    }
                }
            } catch (_0x51b1a3) {
                console.error(_0x51b1a3);
            }
        });
        async function _0x1f93c4() {
            const _0x25cc58 = require('node-cron');
            const {getCron: _0x22d016} = require('./bdd/cron');
            let _0x9418e1 = await _0x22d016();
            console.log(_0x9418e1);
            if (_0x9418e1.length > 0) {
                for (let _0x226f5f = 0; _0x226f5f < _0x9418e1.length; _0x226f5f++) {
                    if (_0x9418e1[_0x226f5f].mute_at != null) {
                        let _0x45a162 = _0x9418e1[_0x226f5f].mute_at.split(':');
                        console.log('etablissement d\'un automute pour ' + _0x9418e1[_0x226f5f].group_id + ' a ' + _0x45a162[0] + ' H ' + _0x45a162[1]);
                        _0x25cc58.schedule(_0x45a162[1] + ' ' + _0x45a162[0] + ' * * *', async () => {
                            await _0x243e88.groupSettingUpdate(_0x9418e1[_0x226f5f].group_id, 'announcement');
                            _0x243e88.sendMessage(_0x9418e1[_0x226f5f].group_id, {
                                'image': { 'url': './media/chrono.webp' },
                                'caption': 'Hello, it\'s time to close the group; sayonara.'
                            });
                        }, { 'timezone': 'Africa/Nairobi' });
                    }
                    if (_0x9418e1[_0x226f5f].unmute_at != null) {
                        let _0x4dc2dd = _0x9418e1[_0x226f5f].unmute_at.split(':');
                        console.log('etablissement d\'un autounmute pour ' + _0x4dc2dd[0] + ' H ' + _0x4dc2dd[1] + ' ');
                        _0x25cc58.schedule(_0x4dc2dd[1] + ' ' + _0x4dc2dd[0] + ' * * *', async () => {
                            await _0x243e88.groupSettingUpdate(_0x9418e1[_0x226f5f].group_id, 'not_announcement');
                            _0x243e88.sendMessage(_0x9418e1[_0x226f5f].group_id, {
                                'image': { 'url': './media/chrono.webp' },
                                'caption': 'Good morning; It\'s time to open the group.'
                            });
                        }, { 'timezone': 'Africa/Nairobi' });
                    }
                }
            } else {
                console.log('Les crons n\'ont pas été activés');
            }
            return;
        }
        _0x243e88.ev.on('contacts.upsert', async _0x45e936 => {
            const _0x5d3871 = _0x2133d1 => {
                for (const _0x47ac40 of _0x2133d1) {
                    if (store.contacts[_0x47ac40.id]) {
                        Object.assign(store.contacts[_0x47ac40.id], _0x47ac40);
                    } else {
                        store.contacts[_0x47ac40.id] = _0x47ac40;
                    }
                }
                return;
            };
            _0x5d3871(_0x45e936);
        });
        _0x243e88.ev.on('connection.update', async _0x147343 => {
            const {
                lastDisconnect: _0x41b97c,
                connection: _0x52925b
            } = _0x147343;
            if (_0x52925b === 'connecting') {
                console.log(' rahman is connecting...');
            } else {
                if (_0x52925b === 'open') {
                    console.log('\u2705 rahman Connected to WhatsApp! \u263A️');
                    console.log('--');
                    0;
                    await baileys_1.delay(200);
                    console.log('------');
                    0;
                    await baileys_1.delay(300);
                    console.log('------------------/-----');
                    console.log('rahman is Online \uD83D\uDD78\n\n');
                    console.log('Loading rahman Commands ...\n');
                    fs.readdirSync(__dirname + '/pkdriller').forEach(_0x5c00ae => {
                        if (path.extname(_0x5c00ae).toLowerCase() == '.js') {
                            try {
                                require(__dirname + '/pkdriller/' + _0x5c00ae);
                                console.log(_0x5c00ae + ' Installed Successfully\u2714️');
                            } catch (_0x12f781) {
                                console.log(_0x5c00ae + ' could not be installed due to : ' + _0x12f781);
                            }
                            0;
                            baileys_1.delay(300);
                        }
                    });
                    0;
                    baileys_1.delay(700);
                    var _0x50f3b5;
                    if (conf.MODE.toLocaleLowerCase() === 'yes') {
                        _0x50f3b5 = 'public';
                    } else {
                        if (conf.MODE.toLocaleLowerCase() === 'no') {
                            _0x50f3b5 = 'private';
                        } else {
                            _0x50f3b5 = 'undefined';
                        }
                    }
                    console.log('Commands Installation Completed \u2705');
                    await _0x1f93c4();
                    if (conf.DP.toLowerCase() === 'yes') {
                        let _0x32d52b = ' \u2060\u2060\u2060\u2060\n\u256D\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2501\u2508\u22B7 \n\u2502\uD83C\uDF0D *ʀᴀʜᴍᴀɴɪ-xᴍᴅ ɪs ᴄᴏɴɴᴇᴄᴛᴇᴅ*\uD83C\uDF0D\n\u2570\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2501\u2508\u22B7\n\u2502\uD83D\uDCAB ᴘʀᴇғɪx: *[ ' + prefixe + ' ]*\n\u2502\u2B55 ᴍᴏᴅᴇ: *' + _0x50f3b5 + '*\n\u2502\uD83D\uDCA2 *ʙᴏᴛ ɴᴀᴍᴇ* ʀᴀʜᴍᴀɴɪ-xᴍᴅ\n\u2570\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2501\u2508\u22B7\n\n*Follow our Channel For Updates*\n> https://whatsapp.com/channel/0029VatokI45EjxufALmY32X\n                \n                \n                 ';
                        await _0x243e88.sendMessage(_0x243e88.user.id, { 'text': _0x32d52b });
                    }
                } else {
                    if (_0x52925b == 'close') {
                        let _0x46bf7 = new boom_1.Boom(_0x41b97c?.error)?.output.statusCode;
                        if (_0x46bf7 === baileys_1.DisconnectReason.badSession) {
                            console.log('Session id error, rescan again...');
                        } else {
                            if (_0x46bf7 === baileys_1.DisconnectReason.connectionClosed) {
                                console.log('!!! connexion fermée, reconnexion en cours ...');
                                _0x1b1480();
                            } else {
                                if (_0x46bf7 === baileys_1.DisconnectReason.connectionLost) {
                                    console.log('connection error \uD83D\uDE1E ,,, trying to reconnect... ');
                                    _0x1b1480();
                                } else {
                                    if (_0x46bf7 === baileys_1.DisconnectReason?.connectionReplaced) {
                                        console.log('connexion réplacée ,,, une sesssion est déjà ouverte veuillez la fermer svp !!!');
                                    } else {
                                        if (_0x46bf7 === baileys_1.DisconnectReason.loggedOut) {
                                            console.log('vous êtes déconnecté,,, veuillez rescanner le code qr svp');
                                        } else {
                                            if (_0x46bf7 === baileys_1.DisconnectReason.restartRequired) {
                                                console.log('redémarrage en cours \u25B6️');
                                                _0x1b1480();
                                            } else {
                                                console.log('redemarrage sur le coup de l\'erreur  ', _0x46bf7);
                                                const {exec: _0x5b98ef} = require('child_process');
                                                _0x5b98ef('pm2 restart all');
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        console.log('hum ' + _0x52925b);
                        _0x1b1480();
                    }
                }
            }
        });
        _0x243e88.ev.on('creds.update', _0x43ea6e);
        _0x243e88.downloadAndSaveMediaMessage = async (_0x4a8528, _0x4ef4eb = '', _0x213632 = true) => {
            let _0x55b529 = _0x4a8528.msg ? _0x4a8528.msg : _0x4a8528;
            let _0x22362d = (_0x4a8528.msg || _0x4a8528).mimetype || '';
            let _0x2620bf = _0x4a8528.mtype ? _0x4a8528.mtype.replace(/Message/gi, '') : _0x22362d.split('/')[0];
            0;
            const _0x3ac107 = await baileys_1.downloadContentFromMessage(_0x55b529, _0x2620bf);
            let _0x2cb55c = Buffer.from([]);
            for await (const _0x30ca65 of _0x3ac107) {
                _0x2cb55c = Buffer.concat([
                    _0x2cb55c,
                    _0x30ca65
                ]);
            }
            let _0x741e23 = await FileType.fromBuffer(_0x2cb55c);
            let _0x1689a1 = './' + _0x4ef4eb + '.' + _0x741e23.ext;
            await fs.writeFileSync(_0x1689a1, _0x2cb55c);
            return _0x1689a1;
        };
        _0x243e88.awaitForMessage = async (_0x272ee8 = {}) => {
            return new Promise((_0x2d207e, _0x25c039) => {
                if (typeof _0x272ee8 !== 'object') {
                    _0x25c039(new Error('Options must be an object'));
                }
                if (typeof _0x272ee8.sender !== 'string') {
                    _0x25c039(new Error('Sender must be a string'));
                }
                if (typeof _0x272ee8.chatJid !== 'string') {
                    _0x25c039(new Error('ChatJid must be a string'));
                }
                if (_0x272ee8.timeout && typeof _0x272ee8.timeout !== 'number') {
                    _0x25c039(new Error('Timeout must be a number'));
                }
                if (_0x272ee8.filter && typeof _0x272ee8.filter !== 'function') {
                    _0x25c039(new Error('Filter must be a function'));
                }
                const _0x48cf8b = _0x272ee8?.timeout || undefined;
                const _0x50d51d = _0x272ee8?.filter || (() => true);
                let _0x2b6fd7 = undefined;
                let _0xa776a1 = _0x2c10e5 => {
                    let {
                        type: _0x3efe17,
                        messages: _0x3bedb5
                    } = _0x2c10e5;
                    if (_0x3efe17 == 'notify') {
                        for (let _0x553b45 of _0x3bedb5) {
                            const _0x13e794 = _0x553b45.key.fromMe;
                            const _0x58a35e = _0x553b45.key.remoteJid;
                            const _0x40c9c7 = _0x58a35e.endsWith('@g.us');
                            const _0x4df2b4 = _0x58a35e == 'status@broadcast';
                            const _0x11cd4e = _0x13e794 ? _0x243e88.user.id.replace(/:.*@/g, '@') : _0x40c9c7 || _0x4df2b4 ? _0x553b45.key.participant.replace(/:.*@/g, '@') : _0x58a35e;
                            if (_0x11cd4e == _0x272ee8.sender && _0x58a35e == _0x272ee8.chatJid && _0x50d51d(_0x553b45)) {
                                _0x243e88.ev.off('messages.upsert', _0xa776a1);
                                clearTimeout(_0x2b6fd7);
                                _0x2d207e(_0x553b45);
                            }
                        }
                    }
                };
                _0x243e88.ev.on('messages.upsert', _0xa776a1);
                if (_0x48cf8b) {
                    _0x2b6fd7 = setTimeout(() => {
                        _0x243e88.ev.off('messages.upsert', _0xa776a1);
                        _0x25c039(new Error('Timeout'));
                    }, _0x48cf8b);
                }
            });
        };
        return _0x243e88;
    }
    let _0x5519b4 = require.resolve(__filename);
    fs.watchFile(_0x5519b4, () => {
        fs.unwatchFile(_0x5519b4);
        console.log('mise à jour ' + __filename);
        delete require.cache[_0x5519b4];
        require(_0x5519b4);
    });
    _0x1b1480();
}, 5000);
