import { writeToFile } from "./utility.js";
let README = [
	"# Irish Transcription",
	"This is a _(very)_ rough transcriber of Ulster Irish pronunciation"
].join("\n");
(async () => {
	await writeToFile(
		"README.md",
		"overwrite",
		README
	);
})();