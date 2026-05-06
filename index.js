async function connectWA() {
    try {
        console.log("=== CONNECTING WHATSAPP ===")
        
        let state, saveCreds
        if (process.env.WA_SESSION) {
            console.log("✅ Loading session from WA_SESSION ENV")
            const sessionData = JSON.parse(Buffer.from(process.env.WA_SESSION, 'base64').toString())
            state = { creds: sessionData.creds, keys: sessionData.keys }
            saveCreds = async () => {
                const newSession = Buffer.from(JSON.stringify(state)).toString('base64')
                console.log("⚠️ Update WA_SESSION:", newSession)
            }
        } else {
            if (!fs.existsSync("./session")) fs.mkdirSync("./session")
            const auth = await useMultiFileAuthState("./session")
            state = auth.state
            saveCreds = auth.saveCreds
        }

        // FIX KUU YA "Connection Failure" - LAZIMA UIWEKE
        sock = makeWASocket({
            version: [2, 3000, 1027934701], // Lock version mpya
            auth: state,
            printQRInTerminal: false,
            logger: pino({ level: "silent" }),
            browser: ["Ubuntu", "Chrome", "110.0.0"], // Hii inasaidia
            syncFullHistory: false,
            markOnlineOnConnect: false,
            connectTimeoutMs: 60000, // Subiri dakika 1
            defaultQueryTimeoutMs: 0,
            keepAliveIntervalMs: 10000
        })
        console.log("✅ WhatsApp Socket created")

        sock.ev.on("creds.update", saveCreds)
        
        sock.ev.on("connection.update", async (update) => {
            const { connection, lastDisconnect } = update
            console.log("Connection Update:", connection)
            
            if (connection === "close") {
                const statusCode = lastDisconnect?.error?.output?.statusCode
                console.log("❌ Connection closed. Code:", statusCode)
                if (statusCode !== DisconnectReason.loggedOut) {
                    console.log("🔄 Reconnecting in 5s...")
                    setTimeout(connectWA, 5000)
                }
            } 
            else if (connection === "open") {
                console.log("✅✅✅ WHATSAPP CONNECTED ✅✅✅")
                if (!process.env.WA_SESSION) {
                    const sessionData = Buffer.from(JSON.stringify(state)).toString('base64')
                    console.log("🔥🔥🔥 COPY HII WEKA KWA WA_SESSION ENV 🔥🔥🔥")
                    console.log(sessionData)
                    console.log("🔥🔥🔥 END OF SESSION 🔥🔥🔥")
                }
            }
        })
