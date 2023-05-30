const fs = require('fs')
const path = require('path')
const $sh = require('shelljs')

// delete existing dist folder
$sh.rm('-rf', './dist')

// create dist folder
$sh.mkdir('./dist')

// copy scr dir to dist
$sh.cp('-r', './src/*', './dist')

// copy license and readme
$sh.cp('./LICENSE', './dist/')
$sh.cp('./README.md', './dist/')

// patch version
const version = $sh
  .exec('npm version patch -f')
  .toString()
  .trim()

// create package config
const packageConfig = require('../package.json')
delete packageConfig.devDependencies
delete packageConfig.scripts

fs.writeFileSync(
  path.join(__dirname, '../dist/package.json'),
  JSON.stringify(packageConfig, null, 2)
)

// update useragent with current version in config.js
$sh.sed(
  '-i',
  'pdf4me/DEV',
  'pdf4me/' + version,
  './dist/config.js'
)
