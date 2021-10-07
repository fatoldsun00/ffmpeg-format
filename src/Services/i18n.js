const i18n = require("i18n");
const path = require("path");

i18n.configure({
    locales: ["fr", "en"],
    defaultLocale: "fr",
    directory: path.join(__dirname, "../../locales"),
    updateFiles: false,
    queryParameter: "lang",
});

i18n.setLocale("fr");

module.exports = i18n;
