const i18n = require("i18n");
const path = require("path");
const {mode} = require("../config");
const fs = require("fs");
i18n.configure({
    locales: ["fr"],
    defaultLocale: "fr",
    directory: path.join(__dirname, "../../locales"),
    updateFiles: false,
});

i18n.setLocale("fr");

module.exports = i18n;
