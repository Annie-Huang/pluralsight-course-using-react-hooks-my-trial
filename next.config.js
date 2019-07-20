// we also need to create the file, next.config .js to our root, which essentially is our webpack configuration update
// that allows for the CSS import to work.

const withCSS = require("@zeit/next-css");
module.exports = withCSS();
