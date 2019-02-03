const $sh = require("shelljs");

$sh.cd("dist");

$sh.exec("npm publish");
