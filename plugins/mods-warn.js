let handler = async (m, { conn, args, usedPrefix }) => {
    if (args.length > 0) {
        let mention = args[0].replace(/[@.+-]/g, '').replace(' ', '')
        let ban = m.mentionedJid[0] || m.quoted.sender || conn.parseMention(args[0]) || (args[0].replace(/[@.+-]/g, '').replace(' ', '') + '@s.whatsapp.net') || ''
        let warning = global.db.data.users[ban].warning
        if (warning < 3) {
            global.db.data.users[ban].warning += 1
            m.reply(`*berhasil Warn!*`)
            conn.sendButton(ban, '*Kamu di warn oleh moderator, dan sekarang kamu punya ' + (warning + 1) + '.Ingat Jika kamu mendapat warn 4 kali kamu akan otomatis ke banned*', wm, 'Owner', usedPrefix + 'owner', null)
        } else if (warning == 3) {
            global.db.data.users[ban].banned = true
            global.db.data.users[ban].warning = 0
            m.reply('*Dia sudah kebanned, karena mendapatkan 4 warn*')
            conn.sendButton(ban, '*Kamu ke banned karena telah mendapatkan 4 kali warn*', wm, 'Owner', usedPrefix + 'owner', null)
        }
    } else conn.reply(m.chat, '*Siapa yang mau di Warn?*', m)
}
handler.help = ['warn @tag']
handler.tags = ['owner', 'moderator']
handler.command = /^warn$/i
handler.mods = true

module.exports = handler
