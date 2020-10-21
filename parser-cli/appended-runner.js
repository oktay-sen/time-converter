const util = require('util')

if (process.argv.length < 3) {
    console.error("Usage: npm run parser -- 'Time phrase'")
} else {
    console.log(util.inspect(generatedParser.parse(process.argv[2]), false, null, true))
}