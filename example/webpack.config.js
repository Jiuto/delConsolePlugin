const DelConsole = require("../index");
module.exports = {
  mode: 'development',
  entry: './index.js',
  output: {
    filename: './bundle.js'
  },
  plugins: [
    new DelConsole({deleteConsole:true})
  ]
};