module.exports = {
  publicPath: "/menu-demo/",
  outputDir: "docs",
  publicPath: process.env.NODE_ENV === 'production'
    ? '/menu-demo/'
    : '/'
}