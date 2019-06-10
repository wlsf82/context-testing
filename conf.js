module.exports.config = {
  baseUrl: "https://codecademy-introduction-to-javascript.s3-eu-west-1.amazonaws.com/index.html",
  capabilities: {
    browserName: "chrome",
    chromeOptions: {
      args: ["--headless", "--window-size=1024,768"]
    }
  },
  onPrepare() {
    browser.waitForAngularEnabled(false)
  },
  specs: ["tests/specs/*.spec.js"]
}
