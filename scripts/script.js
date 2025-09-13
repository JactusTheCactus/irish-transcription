import { readJSON } from "./utility.js";
(async () => {
	const C = await readJSON("data/c.json");
	const V = await readJSON("data/v.json");
	function transcribe(inputString) {
		let outputString = inputString;
		const broad = [
			"a",
			"\u00e1",
			"o",
			"\u00f3",
			"u",
			"\u00fa"
		].join("");
		const slender = [
			"e",
			"\u00e9",
			"i",
			"\u00ed"
		].join("");
		const [pre, post] = [
			"<",
			">"
		]
		const broadPat = `[${broad}]|[^${slender + pre + post}]`;
		const slenderPat = `[${slender}]|[^${broad + pre + post}]`;
		Object.entries(C)
			.sort(([a], [b]) => b.length - a.length)
			.forEach(([k, v]) => {
				outputString = outputString
					.replace(new RegExp(
						`(?<=${broadPat})${k}|${k}(?=${broadPat})`,
						"gi"), `${v.broad}`)
					.replace(new RegExp(
						`(?<=${slenderPat})${k}|${k}(?=${slenderPat})`,
						"gi"), `${v.slender}`)
			});
		Object.entries(V)
			.sort(([a], [b]) => b.length - a.length)
			.forEach(([k, v]) => {
				outputString = outputString
					.replace(new RegExp(
						`(?<=[^${pre + post}])${k}|${k}(?=[^${pre + post}])`,
						"gi"), `${v.stressed}`)
			});
		outputString = outputString.replace(new RegExp(`[${pre + post}]`, "g"), "")
		const fmtString = inputString
			.replace(/I/g, "\u0049")
			.replace(/i/g, "\u0131")
			.replace(/(\w)h/g, "$1\u0307")
		return `[${fmtString}]\n/${outputString}/\n`
	};
	//(await readJSON("data/input.json")).at(-1);
	(await readJSON("data/input.json"))
		.forEach(i => {
			console.log(transcribe(i))
		});
	console.log(transcribe((await readJSON("data/input.json")).at(-1)));
})();