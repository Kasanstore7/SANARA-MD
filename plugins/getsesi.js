let handler = async (m, { conn, text }) => {
    m.reply('Tunggu Sebentar, Proses Getting File session.data.json')
   // let seso = await fs.readFileSync('./index.js.data.json') // klo lu run di panel
    let sesi = await fs.readFileSync('./session.data.json')
    return await conn.sendMessage(m.chat, { document: sesi, mimetype: 'application/json', fileName: 'session.data.json' }, { quoted: m })
}
handler.help = ['getsessi']
handler.tags = ['host']
handler.command = /^(g(et)?ses?si(on)?(data.json)?)$/i

handler.rowner = true

module.exports = handler