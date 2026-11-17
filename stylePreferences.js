const fs = require("fs");
const os = require("os");
const path = require("path");
const defaults = require("./styleFile");

const colors = ["black", "red", "green", "yellow", "blue", "magenta", "cyan", "white", "gray",
	"redBright", "greenBright", "yellowBright", "blueBright", "magentaBright", "cyanBright", "whiteBright"];
const fields = [
	{ key: "showLogo", label: "Show logo", options: [true, false] },
	{ key: "defaultColor", label: "Text color", options: colors },
	{ key: "accentColor", label: "Accent color", options: colors },
	{ key: "gitTreeColor", label: "Git tree color", options: colors },
	{ key: "appResize", label: "Resize with terminal", options: [true, false] },
	{ key: "showFlag", label: "Show file status flags", options: [true, false] },
	{ key: "changeBold", label: "Bold git tree", options: [true, false] },
	{ key: "changeBorder", label: "Border style", options: ["single", "double", "round", "bold"] }
];

const directory = path.join(os.homedir(), ".gitgud");
const preferencesFile = path.join(directory, "style.json");

function readOverrides() {
	const stored = JSON.parse(fs.readFileSync(preferencesFile, "utf8"));
	const overrides = {};
	for (const { key, options } of fields) {
		if (stored && options.includes(stored[key])) overrides[key] = stored[key];
	}
	return overrides;
}

function loadStyle() {
	try {
		return { ...defaults, ...readOverrides() };
	} catch (error) {
		return { ...defaults };
	}
}

function saveStyle(key, value) {
	let overrides;
	try {
		overrides = readOverrides();
	} catch (error) {
		if (error.code !== "ENOENT" && !(error instanceof SyntaxError)) throw error;
		overrides = {};
	}
	overrides[key] = value;
	try {
		fs.mkdirSync(directory);
	} catch (error) {
		if (error.code !== "EEXIST") throw error;
	}
	const temporaryDirectory = fs.mkdtempSync(path.join(directory, ".style-"));
	const temporaryFile = path.join(temporaryDirectory, "style.json");
	try {
		fs.writeFileSync(temporaryFile, JSON.stringify(overrides, null, 2) + "\n");
		fs.renameSync(temporaryFile, preferencesFile);
	} finally {
		if (fs.existsSync(temporaryFile)) fs.unlinkSync(temporaryFile);
		fs.rmdirSync(temporaryDirectory);
	}
	return { ...defaults, ...overrides };
}

module.exports = { fields, loadStyle, saveStyle };
