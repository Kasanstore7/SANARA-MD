let cp = require("child_process");
let { promisify } = require("util");
let exec = promisify(cp.exec).bind(cp);

module.exports = {
	name: "mamat",
	alias: ["mamat","@"],
	category: "default",
	noPrefix: true,
	isOwner: true,
	async run({ msg, conn }, { q }) {
		await msg.reply("Wait Mamat Saheng Sedang Mengirim Hasil Exec...");
		let o;
		try {
			o = await exec(q);
		} catch (e) {
			o = e;
		} finally {
			let { stdout, stderr } = o;
			if (stdout.trim()) msg.reply(stdout);
			if (stderr.trim()) msg.reply(stderr);
		}
	},
};
