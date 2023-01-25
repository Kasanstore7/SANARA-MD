let handler = async (m, { isAdmin, isOwner, conn, command }) => {
  if (!(isAdmin || isOwner)) {
                global.dfail('admin', m, conn)
                throw false
                }
  conn.groupRevokeInvite(m.chat)
  conn.reply(m.chat, `Sukses ${command} link grup, link telah di kirim ke chat pribadi`, m)
  await delay(1000)
  let linknya = await conn.groupInviteCode(m.chat)
  conn.reply(m.sender, 'https://chat.whatsapp.com/' + linknya, m)
}
handler.help = ['revoke']
handler.tags = ['group']
handler.command = /^re(voke|new|set)(invite|link)?$/i

handler.group = true
handler.botAdmin = true

module.exports = handler

const delay = time => new Promise(res => setTimeout(res, time))
