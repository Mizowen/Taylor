import fetch from 'node-fetch'
let handler = async(m, { conn, text, usedPrefix, command }) => {
        let json = await fetch(global.API('xcdr', '/random/cersex', {}, 'apikey'))
        
        let jsons = await json.json()
        let x = jsons.result
        let caption = `*⎔┉━「 Cersex 」━┉⎔*
🤠 *Query* : ${x.title}
 ${x.date}
 
 ${x.cerita}
`
        await conn.sendFile(m.chat, x.thumbnail, '', caption, m)
}
handler.help = ['cersex']
handler.tags = ['fun']
handler.command = /^(cersex)$/i

export default handler