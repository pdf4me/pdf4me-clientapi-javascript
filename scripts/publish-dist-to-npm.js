const $sh = require('shelljs')

if ($sh.test('-f', './dist/package.json')) {
  $sh.cd('dist')

  $sh.exec('npm publish --otp=<otp>') //give <otp> with otp from auth app
} else {
  console.log(
    'no dist directory found, execute "npm run create-dist" to ctrate a new dist version.'
  )
}
