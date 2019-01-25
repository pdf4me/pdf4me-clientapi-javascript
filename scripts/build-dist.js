const $sh = require("shelljs");
const fs = require("fs");
const path = require("path");

$sh.rm("-rf", "./dist");

const buildRes = $sh.exec("tsc");
if (buildRes.code !== 0) {
  console.log(buildRes.stderr);
  return;
}

// patch version
$sh.exec("npm version patch -f");

// copy files
$sh.cp("./LICENSE", "./dist/");
$sh.cp("./README.md", "./dist/");

// create package.json
const packageConfig = require("../package.json");
console.log(packageConfig);
delete packageConfig.devDependencies;

fs.writeFileSync(
  path.join(__dirname, "../dist/package.json"),
  JSON.stringify(packageConfig, null, 2)
);
