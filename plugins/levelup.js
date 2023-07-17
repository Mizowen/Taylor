import {
    canLevelUp,
    xpRange
} from "../lib/levelling.js"
import {
    levelup
} from "../lib/canvas.js"
import knights from "knights-canvas"

let handler = async (m, {
    conn,
    args,
    usedPrefix,
    text,
    command
}) => {

    let user = global.db.data.users[m.sender]
    if (!canLevelUp(user.level, user.exp, global.multiplier)) {
        let {
            min,
            xp,
            max
        } = xpRange(user.level, global.multiplier)
        throw `
Level ${user.level} 📊
*${user.exp - min} / ${xp}*
Kurang *${max - user.exp}* lagi! ✨
`.trim()
    }
    let before = user.level * 1
    while (canLevelUp(user.level, user.exp, global.multiplier)) user.level++
    if (before !== user.level) {
        let teks = `Selamat ${conn.getName(m.sender)} naik 🧬level\n.             ${user.role}`
        let str = `Selamat ${conn.getName(m.sender)} naik 🧬level\n.             ${user.role}

*🎉 C O N G R A T S 🎉*
*${before}* ➔ *${user.level}* [ *${user.role}* ]

• 🧬Level Sebelumnya : ${before}
• 🧬Level Baru : ${user.level}
• Pada Jam : ${new Date().toLocaleString("id-ID")}

*Note:* _Semakin sering berinteraksi dengan bot Semakin Tinggi level kamu_
`.trim()

        let {
            min,
            xp,
            max
        } = xpRange(user.level, global.multiplier)
        let pp = await conn.profilePictureUrl(m.sender).catch(_ => "./src/avatar_contact.png")
        let image = await new knights.Up()
            .setAvatar(pp)
            .toAttachment()
        let dataa = image.toBuffer()

        let exp = user.exp
        let required = xp
        let role = user.role
        let level = user.level
        let disec = m.sender.substring(3, 7)
        let ppuser
        try {
            ppuser = await conn.profilePictureUrl(m.sender, "image")
        } catch {
            ppuser = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMxMUXFtd5GrFkxyrU-f5zA2IH8MZ-U-cFKg&usqp=CAU"
        }
        
        let datac = await levelup(teks, user.level)

        try {
            await conn.sendMessage(m.chat, {
                image: [dataa, datac].getRandom(),
                caption: str
            }, {
                quoted: m
            })
        } catch (e) {
            await m.reply(eror)
        }

    }
}
handler.help = ["levelup"]
handler.tags = ["xp"]
handler.command = /^level(|up)$/i
export default handler