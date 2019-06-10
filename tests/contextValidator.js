const AxeBuilder = require("axe-webdriverjs")
const Eyes = require("eyes.selenium").Eyes

function contextValidation(context, browser, testSuite, testCase) {
  switch(context) {
    case "accessibility":
      accessibilityValidation(browser)
      break
    case "functional":
      break
    case "visual":
      visualValidation(browser, testSuite, testCase)
      break
    default:
      break
  }
}

function accessibilityValidation(browser) {
  AxeBuilder(browser.driver)
  .analyze((error, results) => {
    if (error) console.log(`Error: ${error}`)
    if (results.violations.length > 0) {
      console.log(results.violations)
      expect(results.violations.length).toBe(0)
    }
  })
}

function visualValidation(browser, testSuite, testCase) {
  const eyes = new Eyes()

  eyes.setApiKey(process.env.APPLITOOLS_API_KEY)
  eyes.open(browser, testSuite, testCase)
  eyes.checkWindow(`visual validataion: ${testSuite} - ${testCase}`)
  eyes.close()
}

module.exports = contextValidation
